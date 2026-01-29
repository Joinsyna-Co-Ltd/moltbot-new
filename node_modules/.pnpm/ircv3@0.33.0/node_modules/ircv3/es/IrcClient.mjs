import { __decorate } from "tslib";
import { DirectConnection, PersistentConnection, WebSocketConnection } from '@d-fischer/connection';
import { createLogger } from '@d-fischer/logger';
import { arrayToObject, Enumerable, forEachObjectEntry, padLeft, resolveConfigValue, splitWithLimit } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import { klona } from 'klona/json';
import * as CoreCapabilities from "./Capability/CoreCapabilities/index.mjs";
import { createMessage } from "./Message/Message.mjs";
import { MessageCollector } from "./Message/MessageCollector.mjs";
import { parseMessage } from "./Message/MessageParser.mjs";
import * as MessageTypes from "./Message/MessageTypes/index.mjs";
import { CapabilityNegotiation, ChannelJoin, ChannelPart, ClientQuit, NickChange, Notice, Password, Ping, Pong, PrivateMessage, UserRegistration } from "./Message/MessageTypes/Commands/index.mjs";
import { Error422NoMotd, Error462AlreadyRegistered, Reply001Welcome, Reply004ServerInfo, Reply005Isupport, Reply376EndOfMotd } from "./Message/MessageTypes/Numerics/index.mjs";
import { defaultServerProperties } from "./ServerProperties.mjs";
import { decodeCtcp } from "./Toolkit/StringTools.mjs";
export class IrcClient extends EventEmitter {
    constructor(options) {
        super();
        this._registered = false;
        this._supportsCapabilities = true;
        this._events = new Map();
        this._registeredMessageTypes = new Map();
        /**
         * @eventListener
         */
        this.onConnect = this.registerEvent();
        /**
         * @eventListener
         */
        this.onRegister = this.registerEvent();
        /**
         * @eventListener
         */
        this.onDisconnect = this.registerEvent();
        /**
         * @eventListener
         */
        this.onPrivmsg = this.registerEvent();
        /**
         * @eventListener
         */
        this.onAction = this.registerEvent();
        /**
         * @eventListener
         */
        this.onNotice = this.registerEvent();
        /**
         * @eventListener
         */
        this.onNickChange = this.registerEvent();
        /**
         * @eventListener
         */
        this.onCtcp = this.registerEvent();
        /**
         * @eventListener
         */
        this.onCtcpReply = this.registerEvent();
        /**
         * @eventListener
         */
        this.onPasswordError = this.registerEvent();
        /**
         * @eventListener
         */
        this.onAnyMessage = this.registerEvent();
        this._serverProperties = klona(defaultServerProperties);
        this._supportedFeatures = {};
        this._collectors = [];
        this._clientCapabilities = new Map();
        this._serverCapabilities = new Map();
        this._negotiatedCapabilities = new Map();
        this._currentChannels = new Set();
        this._hasRegisteredBefore = false;
        this._channelsFromLastRegister = new Set();
        this._initialConnectionSetupDone = false;
        const { connection, credentials, channels, channelTypes, webSocket, logger = {} } = options;
        this._options = options;
        const { pingOnInactivity = 60, pingTimeout = 10 } = connection;
        this._pingOnInactivity = pingOnInactivity;
        this._pingTimeout = pingTimeout;
        this._currentNick = credentials.nick;
        this._logger = createLogger({ name: 'ircv3', emoji: true, ...logger });
        this.registerCoreMessageTypes();
        const { hostName, secure, reconnect = true } = connection;
        const connectionTarget = {
            hostName,
            port: this.port,
            secure
        };
        const connectionOptions = {
            lineBased: true,
            logger: this._logger,
            additionalOptions: options.connectionOptions
        };
        const ConnectionType = webSocket ? WebSocketConnection : DirectConnection;
        if (reconnect) {
            this._connection = new PersistentConnection(ConnectionType, connectionTarget, connectionOptions);
        }
        else {
            this._connection = new ConnectionType(connectionOptions, this._logger, options.connectionOptions);
        }
        for (const cap of Object.values(CoreCapabilities)) {
            this.addCapability(cap);
        }
        this.addInternalListener(this.onRegister, async () => {
            const hasRegisteredBefore = this._hasRegisteredBefore;
            const channelsFromLastRegister = this._channelsFromLastRegister;
            this._hasRegisteredBefore = true;
            this._channelsFromLastRegister = new Set();
            const resolvedChannels = hasRegisteredBefore && this._options.rejoinChannelsOnReconnect
                ? channelsFromLastRegister
                : await resolveConfigValue(channels);
            if (resolvedChannels) {
                for (const channel of resolvedChannels) {
                    this.join(channel);
                }
            }
        });
        this.onTypedMessage(CapabilityNegotiation, async ({ subCommand, capabilities }) => {
            const caps = capabilities.split(' ');
            // eslint-disable-next-line default-case
            switch (subCommand.toUpperCase()) {
                case 'NEW': {
                    this._logger.debug(`Server registered new capabilities: ${caps.join(', ')}`);
                    const capList = arrayToObject(caps, (part) => {
                        if (!part) {
                            return {};
                        }
                        const [cap, param] = splitWithLimit(part, '=', 2);
                        return {
                            [cap]: {
                                name: cap,
                                param: param || true
                            }
                        };
                    });
                    for (const [name, cap] of Object.entries(capList)) {
                        this._serverCapabilities.set(name, cap);
                    }
                    const capNames = Object.keys(capList);
                    await this._negotiateCapabilities(Array.from(this._clientCapabilities.entries())
                        .filter(([name]) => capNames.includes(name))
                        .map(([, cap]) => cap));
                    break;
                }
                case 'DEL': {
                    this._logger.debug(`Server removed capabilities: ${caps.join(', ')}`);
                    for (const cap of caps) {
                        this._serverCapabilities.delete(cap);
                        this._negotiatedCapabilities.delete(cap);
                    }
                }
            }
        });
        this.onTypedMessage(Ping, ({ text }) => {
            this.sendMessage(Pong, { text });
        });
        this.onTypedMessage(Reply001Welcome, ({ me }) => this._handleReceivedClientNick(me));
        this.onTypedMessage(Reply004ServerInfo, ({ userModes }) => {
            if (userModes) {
                this._serverProperties.supportedUserModes = userModes;
            }
        });
        this.onTypedMessage(Reply005Isupport, ({ supports }) => {
            const newFeatures = arrayToObject(supports.split(' '), part => {
                const [support, param] = splitWithLimit(part, '=', 2);
                return { [support]: param || true };
            });
            this._supportedFeatures = {
                ...this._supportedFeatures,
                ...newFeatures
            };
        });
        this.onTypedMessage(Reply376EndOfMotd, ({ me }) => {
            if (!this._registered) {
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(Error422NoMotd, ({ me }) => {
            if (!this._registered) {
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(Error462AlreadyRegistered, ({ me }) => {
            // what, I thought we are not registered yet?
            if (!this._registered) {
                // screw this, we are now.
                this._logger.warn("We thought we're not registered yet, but we actually are");
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(PrivateMessage, msg => {
            var _a;
            const { target, text } = msg;
            const ctcpMessage = decodeCtcp(text);
            const nick = (_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick;
            if (ctcpMessage) {
                if (ctcpMessage.command === 'ACTION') {
                    this.emit(this.onAction, target, nick, ctcpMessage.params, msg);
                }
                else {
                    this.emit(this.onCtcp, target, nick, ctcpMessage.command, ctcpMessage.params, msg);
                }
            }
            else {
                this.emit(this.onPrivmsg, target, nick, text, msg);
            }
        });
        this.onTypedMessage(NickChange, msg => {
            var _a;
            const { nick: newNick } = msg;
            const oldNick = (_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick;
            if (oldNick === this._currentNick) {
                this._currentNick = newNick;
            }
            this.emit(this.onNickChange, oldNick, newNick, msg);
        });
        this.onTypedMessage(Notice, msg => {
            var _a;
            const { target, text } = msg;
            const ctcpMessage = decodeCtcp(text);
            const nick = (_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick;
            if (ctcpMessage) {
                this.emit(this.onCtcpReply, target, nick, ctcpMessage.command, ctcpMessage.params, msg);
            }
            this.emit(this.onNotice, target, nick, text, msg);
        });
        if (!this._options.manuallyAcknowledgeJoins) {
            this.onTypedMessage(ChannelJoin, ({ channel, prefix }) => {
                if ((prefix === null || prefix === void 0 ? void 0 : prefix.nick) === this._currentNick) {
                    this.acknowledgeJoin(channel);
                }
            });
        }
        this.onTypedMessage(ChannelPart, msg => {
            var _a;
            if (((_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick) === this._currentNick) {
                this._currentChannels.delete(msg.channel);
                this._channelsFromLastRegister.delete(msg.channel);
            }
        });
        this.addInternalListener(this.onRegister, () => this._startPingCheckTimer());
        this._desiredNick = credentials.nick;
        this._userName = credentials.userName;
        this._realName = credentials.realName;
        if (channelTypes) {
            this._serverProperties.channelTypes = channelTypes;
        }
    }
    receiveLine(line) {
        var _a;
        this._logger.debug(`Received message: ${line}`);
        // eslint-disable-next-line @typescript-eslint/init-declarations
        let parsedMessage;
        try {
            parsedMessage = parseMessage(line, this._serverProperties, this._registeredMessageTypes, true, this._options.nonConformingCommands);
        }
        catch (e) {
            this._logger.error(`Error parsing message: ${e.message}`);
            this._logger.trace((_a = e.stack) !== null && _a !== void 0 ? _a : 'No stack available');
            return;
        }
        this._logger.trace(`Parsed message: ${JSON.stringify(parsedMessage)}`);
        this._startPingCheckTimer();
        this.emit(this.onAnyMessage, parsedMessage);
        this._handleEvents(parsedMessage);
    }
    get serverProperties() {
        return klona(this._serverProperties);
    }
    get port() {
        const { webSocket, connection: { port, secure } } = this._options;
        if (port) {
            return port;
        }
        if (webSocket) {
            return secure ? 443 : 80;
        }
        return secure ? 6697 : 6667;
    }
    pingCheck() {
        const now = Date.now();
        const nowStr = now.toString();
        const handler = this.onTypedMessage(Pong, (msg) => {
            const { text } = msg;
            if (text === nowStr) {
                this._logger.debug(`Current ping: ${Date.now() - now}ms`);
                if (this._pingTimeoutTimer) {
                    clearTimeout(this._pingTimeoutTimer);
                }
                this.removeMessageListener(handler);
            }
        });
        this._pingTimeoutTimer = setTimeout(() => {
            this.removeMessageListener(handler);
            // eslint-disable-next-line no-restricted-syntax
            if (this._options.connection.reconnect === false) {
                this._logger.error(`Disconnecting because the last ping took over ${this._pingTimeout} seconds`);
            }
            else {
                this._logger.warn(`Reconnecting because the last ping took over ${this._pingTimeout} seconds`);
            }
            this._connection.assumeExternalDisconnect();
        }, this._pingTimeout * 1000);
        this.sendMessage(Ping, { text: nowStr });
    }
    reconnect(message) {
        this.quit(message);
        this.connect();
    }
    registerMessageType(cls) {
        if (cls.COMMAND !== '') {
            this._logger.trace(`Registering message type ${cls.COMMAND}`);
            this._registeredMessageTypes.set(cls.COMMAND.toUpperCase(), cls);
        }
    }
    knowsCommand(command) {
        return this._registeredMessageTypes.has(command.toUpperCase());
    }
    getCommandClass(command) {
        return this._registeredMessageTypes.get(command.toUpperCase());
    }
    acknowledgeJoin(channel) {
        this._currentChannels.add(channel);
        this._channelsFromLastRegister.add(channel);
    }
    connect() {
        this._supportsCapabilities = false;
        this._negotiatedCapabilities = new Map();
        this._currentChannels = new Set();
        this._currentNick = this._desiredNick;
        this._setupConnection();
        this._logger.info(`Connecting to ${this._options.connection.hostName}:${this.port}`);
        this._connection.connect();
    }
    addCapability(cap) {
        this._clientCapabilities.set(cap.name, cap);
        if (cap.messageTypes) {
            for (const messageType of Object.values(cap.messageTypes)) {
                this.registerMessageType(messageType);
            }
        }
    }
    async registerCapability(cap) {
        this.addCapability(cap);
        if (this._serverCapabilities.has(cap.name)) {
            return await this._negotiateCapabilities([cap]);
        }
        return [];
    }
    send(message) {
        this.sendRaw(message.toString());
    }
    sendRaw(line) {
        if (this._connection.isConnected) {
            this._logger.debug(`Sending message: ${line}`);
            this._connection.sendLine(line);
        }
    }
    onNamedMessage(commandName, handler, handlerName) {
        if (!this._events.has(commandName)) {
            this._events.set(commandName, new Map());
        }
        const handlerList = this._events.get(commandName);
        if (!handlerName) {
            do {
                handlerName = `${commandName}:${padLeft(Math.random() * 10000, 4, '0')}`;
            } while (handlerList.has(handlerName));
        }
        handlerList.set(handlerName, handler);
        return handlerName;
    }
    onTypedMessage(type, handler, handlerName) {
        return this.onNamedMessage(type.COMMAND, handler, handlerName);
    }
    removeMessageListener(handlerName) {
        const [commandName] = handlerName.split(':');
        if (!this._events.has(commandName)) {
            return;
        }
        this._events.get(commandName).delete(handlerName);
    }
    createMessage(type, params, tags) {
        const tagsMap = tags ? new Map(Object.entries(tags)) : undefined;
        return createMessage(type, params, undefined, tagsMap, this.serverProperties);
    }
    sendMessage(type, params, tags) {
        this.send(this.createMessage(type, params, tags));
    }
    async sendMessageAndCaptureReply(type, params) {
        if (!type.SUPPORTS_CAPTURE) {
            throw new Error(`The command "${type.COMMAND}" does not support reply capture`);
        }
        const message = this.createMessage(type, params);
        const promise = this.collect(message).promise();
        this.send(message);
        return await promise;
    }
    get isConnected() {
        return this._connection.isConnected;
    }
    get isConnecting() {
        return this._connection.isConnecting;
    }
    get isRegistered() {
        return this._registered;
    }
    get currentNick() {
        return this._currentNick;
    }
    get currentChannels() {
        return Array.from(this._currentChannels);
    }
    /** @private */
    collect(originalMessage, ...types) {
        const collector = new MessageCollector(this, originalMessage, ...types);
        this._collectors.push(collector);
        return collector;
    }
    /** @private */
    stopCollect(collector) {
        this._collectors.splice(this._collectors.findIndex(value => value === collector), 1);
    }
    // convenience methods
    join(channel, key) {
        this.sendMessage(ChannelJoin, { channel, key });
    }
    part(channel) {
        this.sendMessage(ChannelPart, { channel });
    }
    quit(text) {
        this.sendMessage(ClientQuit, { text });
        this.quitAbruptly();
    }
    quitAbruptly() {
        this._registered = false;
        this._connection.disconnect();
    }
    say(target, text, tags = {}) {
        this.sendMessage(PrivateMessage, { target, text }, tags);
    }
    sendCtcp(target, type, message) {
        this.say(target, `\x01${type.toUpperCase()} ${message}\x01`);
    }
    action(target, message) {
        this.sendCtcp(target, 'ACTION', message);
    }
    changeNick(newNick) {
        if (this._currentNick === newNick) {
            return;
        }
        this._desiredNick = newNick;
        if (this.isRegistered) {
            this.sendMessage(NickChange, { nick: newNick });
        }
    }
    registerCoreMessageTypes() {
        forEachObjectEntry(MessageTypes.Commands, (type) => {
            this.registerMessageType(type);
        });
        forEachObjectEntry(MessageTypes.Numerics, (type) => {
            this.registerMessageType(type);
        });
    }
    async _negotiateCapabilityBatch(capabilities) {
        return await Promise.all(capabilities
            .filter(list => list.length)
            .map(async (capList) => await this._negotiateCapabilities(capList)));
    }
    async _negotiateCapabilities(capList) {
        const mappedCapList = arrayToObject(capList, cap => ({
            [cap.name]: cap
        }));
        const messages = await this.sendMessageAndCaptureReply(CapabilityNegotiation, {
            subCommand: 'REQ',
            capabilities: capList.map(cap => cap.name).join(' ')
        });
        const capReply = messages.shift();
        if (!capReply) {
            throw new Error('capability negotiation failed unexpectedly without any reply');
        }
        if (!(capReply instanceof CapabilityNegotiation)) {
            throw new Error(`capability negotiation failed unexpectedly with "${capReply.command}" command`);
        }
        const negotiatedCapNames = capReply.capabilities.split(' ').filter(c => c);
        if (capReply.subCommand === 'ACK') {
            // filter is necessary because some networks seem to add trailing spaces...
            this._logger.debug(`Successfully negotiated capabilities: ${negotiatedCapNames.join(', ')}`);
            const newNegotiatedCaps = negotiatedCapNames.map(capName => mappedCapList[capName]);
            for (const newCap of newNegotiatedCaps) {
                const mergedCap = this._clientCapabilities.get(newCap.name);
                mergedCap.param = newCap.param;
                this._negotiatedCapabilities.set(mergedCap.name, mergedCap);
            }
            return newNegotiatedCaps;
        }
        this._logger.warn(`Failed to negotiate capabilities: ${negotiatedCapNames.join(', ')}`);
        return new Error('capabilities failed to negotiate');
    }
    _setupConnection() {
        if (this._initialConnectionSetupDone) {
            return;
        }
        this._connection.onConnect(async () => {
            var _a, _b;
            this._logger.info(`Connection to server ${this._options.connection.hostName}:${this.port} established`);
            this.emit(this.onConnect);
            this._logger.debug('Determining connection password');
            try {
                const [password] = await Promise.all([
                    resolveConfigValue(this._options.credentials.password),
                    this.sendMessageAndCaptureReply(CapabilityNegotiation, {
                        subCommand: 'LS',
                        version: '302'
                    })
                        .then(async (capReply) => {
                        if (!capReply.length || !(capReply[0] instanceof CapabilityNegotiation)) {
                            this._logger.debug('Server does not support capabilities');
                            return [];
                        }
                        this._supportsCapabilities = true;
                        const capLists = capReply.map(line => arrayToObject(line.capabilities.split(' '), (part) => {
                            if (!part) {
                                return {};
                            }
                            const [cap, param] = splitWithLimit(part, '=', 2);
                            return {
                                [cap]: {
                                    name: cap,
                                    param: param || true
                                }
                            };
                        }));
                        this._serverCapabilities = new Map(Object.entries(Object.assign({}, ...capLists)));
                        this._logger.debug(`Capabilities supported by server: ${Array.from(this._serverCapabilities.keys()).join(', ')}`);
                        const capabilitiesToNegotiate = capLists.map(list => {
                            const capNames = Object.keys(list);
                            return Array.from(this._clientCapabilities.entries())
                                .filter(([name]) => capNames.includes(name))
                                .map(([, cap]) => cap);
                        });
                        return await this._negotiateCapabilityBatch(capabilitiesToNegotiate);
                    })
                        .then(() => {
                        this.sendMessage(CapabilityNegotiation, { subCommand: 'END' });
                    })
                ]);
                if (password) {
                    this.sendMessage(Password, { password });
                }
                this.sendMessage(NickChange, { nick: this._desiredNick });
                this.sendMessage(UserRegistration, {
                    user: (_a = this._userName) !== null && _a !== void 0 ? _a : this._desiredNick,
                    mode: '8',
                    unused: '*',
                    realName: (_b = this._realName) !== null && _b !== void 0 ? _b : this._desiredNick
                });
            }
            catch (e) {
                this.emit(this.onPasswordError, e);
                this.quit();
            }
        });
        this._initialConnectionSetupDone = true;
        this._connection.onReceive((line) => {
            this.receiveLine(line);
        });
        this._connection.onDisconnect((manually, reason) => {
            var _a;
            this._registered = false;
            if (this._pingCheckTimer) {
                clearTimeout(this._pingCheckTimer);
            }
            if (this._pingTimeoutTimer) {
                clearTimeout(this._pingTimeoutTimer);
            }
            if (manually) {
                this._logger.info('Disconnected');
            }
            else {
                const willReconnect = (_a = this._options.connection.reconnect) !== null && _a !== void 0 ? _a : true;
                const message = reason ? `Disconnected unexpectedly: ${reason.message}` : 'Disconnected unexpectedly';
                if (willReconnect) {
                    this._logger.warn(`${message}; trying to reconnect`);
                }
                else {
                    this._logger.error(message);
                }
            }
            this.emit(this.onDisconnect, manually, reason);
        });
        this._connection.onEnd(manually => {
            if (!manually) {
                this._logger.warn('No further retries will be made');
            }
        });
    }
    _handleReceivedClientNick(me) {
        if (this._currentNick !== me) {
            if (this._currentNick !== '') {
                this._logger.warn(`Mismatching nicks: passed ${this._currentNick}, but you're actually ${me}`);
            }
            this._currentNick = me;
        }
    }
    // event helper
    _handleEvents(message) {
        this._collectors.some(collector => collector.collect(message));
        const handlers = this._events.get(message.constructor.COMMAND);
        if (!handlers) {
            return;
        }
        for (const handler of handlers.values()) {
            handler(message);
        }
    }
    _startPingCheckTimer() {
        if (this._pingCheckTimer) {
            clearTimeout(this._pingCheckTimer);
        }
        if (this._connection.isConnected) {
            this._pingCheckTimer = setTimeout(() => this.pingCheck(), this._pingOnInactivity * 1000);
        }
        else {
            this._pingCheckTimer = undefined;
        }
    }
}
__decorate([
    Enumerable(false)
], IrcClient.prototype, "_options", void 0);
