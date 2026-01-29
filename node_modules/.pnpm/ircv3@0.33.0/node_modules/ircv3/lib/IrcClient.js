"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrcClient = void 0;
const tslib_1 = require("tslib");
const connection_1 = require("@d-fischer/connection");
const logger_1 = require("@d-fischer/logger");
const shared_utils_1 = require("@d-fischer/shared-utils");
const typed_event_emitter_1 = require("@d-fischer/typed-event-emitter");
const json_1 = require("klona/json");
const CoreCapabilities = require("./Capability/CoreCapabilities");
const Message_1 = require("./Message/Message");
const MessageCollector_1 = require("./Message/MessageCollector");
const MessageParser_1 = require("./Message/MessageParser");
const MessageTypes = require("./Message/MessageTypes");
const Commands_1 = require("./Message/MessageTypes/Commands");
const Numerics_1 = require("./Message/MessageTypes/Numerics");
const ServerProperties_1 = require("./ServerProperties");
const StringTools_1 = require("./Toolkit/StringTools");
class IrcClient extends typed_event_emitter_1.EventEmitter {
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
        this._serverProperties = (0, json_1.klona)(ServerProperties_1.defaultServerProperties);
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
        this._logger = (0, logger_1.createLogger)({ name: 'ircv3', emoji: true, ...logger });
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
        const ConnectionType = webSocket ? connection_1.WebSocketConnection : connection_1.DirectConnection;
        if (reconnect) {
            this._connection = new connection_1.PersistentConnection(ConnectionType, connectionTarget, connectionOptions);
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
                : await (0, shared_utils_1.resolveConfigValue)(channels);
            if (resolvedChannels) {
                for (const channel of resolvedChannels) {
                    this.join(channel);
                }
            }
        });
        this.onTypedMessage(Commands_1.CapabilityNegotiation, async ({ subCommand, capabilities }) => {
            const caps = capabilities.split(' ');
            // eslint-disable-next-line default-case
            switch (subCommand.toUpperCase()) {
                case 'NEW': {
                    this._logger.debug(`Server registered new capabilities: ${caps.join(', ')}`);
                    const capList = (0, shared_utils_1.arrayToObject)(caps, (part) => {
                        if (!part) {
                            return {};
                        }
                        const [cap, param] = (0, shared_utils_1.splitWithLimit)(part, '=', 2);
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
        this.onTypedMessage(Commands_1.Ping, ({ text }) => {
            this.sendMessage(Commands_1.Pong, { text });
        });
        this.onTypedMessage(Numerics_1.Reply001Welcome, ({ me }) => this._handleReceivedClientNick(me));
        this.onTypedMessage(Numerics_1.Reply004ServerInfo, ({ userModes }) => {
            if (userModes) {
                this._serverProperties.supportedUserModes = userModes;
            }
        });
        this.onTypedMessage(Numerics_1.Reply005Isupport, ({ supports }) => {
            const newFeatures = (0, shared_utils_1.arrayToObject)(supports.split(' '), part => {
                const [support, param] = (0, shared_utils_1.splitWithLimit)(part, '=', 2);
                return { [support]: param || true };
            });
            this._supportedFeatures = {
                ...this._supportedFeatures,
                ...newFeatures
            };
        });
        this.onTypedMessage(Numerics_1.Reply376EndOfMotd, ({ me }) => {
            if (!this._registered) {
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(Numerics_1.Error422NoMotd, ({ me }) => {
            if (!this._registered) {
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(Numerics_1.Error462AlreadyRegistered, ({ me }) => {
            // what, I thought we are not registered yet?
            if (!this._registered) {
                // screw this, we are now.
                this._logger.warn("We thought we're not registered yet, but we actually are");
                this._handleReceivedClientNick(me);
                this._registered = true;
                this.emit(this.onRegister);
            }
        });
        this.onTypedMessage(Commands_1.PrivateMessage, msg => {
            var _a;
            const { target, text } = msg;
            const ctcpMessage = (0, StringTools_1.decodeCtcp)(text);
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
        this.onTypedMessage(Commands_1.NickChange, msg => {
            var _a;
            const { nick: newNick } = msg;
            const oldNick = (_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick;
            if (oldNick === this._currentNick) {
                this._currentNick = newNick;
            }
            this.emit(this.onNickChange, oldNick, newNick, msg);
        });
        this.onTypedMessage(Commands_1.Notice, msg => {
            var _a;
            const { target, text } = msg;
            const ctcpMessage = (0, StringTools_1.decodeCtcp)(text);
            const nick = (_a = msg.prefix) === null || _a === void 0 ? void 0 : _a.nick;
            if (ctcpMessage) {
                this.emit(this.onCtcpReply, target, nick, ctcpMessage.command, ctcpMessage.params, msg);
            }
            this.emit(this.onNotice, target, nick, text, msg);
        });
        if (!this._options.manuallyAcknowledgeJoins) {
            this.onTypedMessage(Commands_1.ChannelJoin, ({ channel, prefix }) => {
                if ((prefix === null || prefix === void 0 ? void 0 : prefix.nick) === this._currentNick) {
                    this.acknowledgeJoin(channel);
                }
            });
        }
        this.onTypedMessage(Commands_1.ChannelPart, msg => {
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
            parsedMessage = (0, MessageParser_1.parseMessage)(line, this._serverProperties, this._registeredMessageTypes, true, this._options.nonConformingCommands);
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
        return (0, json_1.klona)(this._serverProperties);
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
        const handler = this.onTypedMessage(Commands_1.Pong, (msg) => {
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
        this.sendMessage(Commands_1.Ping, { text: nowStr });
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
                handlerName = `${commandName}:${(0, shared_utils_1.padLeft)(Math.random() * 10000, 4, '0')}`;
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
        return (0, Message_1.createMessage)(type, params, undefined, tagsMap, this.serverProperties);
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
        const collector = new MessageCollector_1.MessageCollector(this, originalMessage, ...types);
        this._collectors.push(collector);
        return collector;
    }
    /** @private */
    stopCollect(collector) {
        this._collectors.splice(this._collectors.findIndex(value => value === collector), 1);
    }
    // convenience methods
    join(channel, key) {
        this.sendMessage(Commands_1.ChannelJoin, { channel, key });
    }
    part(channel) {
        this.sendMessage(Commands_1.ChannelPart, { channel });
    }
    quit(text) {
        this.sendMessage(Commands_1.ClientQuit, { text });
        this.quitAbruptly();
    }
    quitAbruptly() {
        this._registered = false;
        this._connection.disconnect();
    }
    say(target, text, tags = {}) {
        this.sendMessage(Commands_1.PrivateMessage, { target, text }, tags);
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
            this.sendMessage(Commands_1.NickChange, { nick: newNick });
        }
    }
    registerCoreMessageTypes() {
        (0, shared_utils_1.forEachObjectEntry)(MessageTypes.Commands, (type) => {
            this.registerMessageType(type);
        });
        (0, shared_utils_1.forEachObjectEntry)(MessageTypes.Numerics, (type) => {
            this.registerMessageType(type);
        });
    }
    async _negotiateCapabilityBatch(capabilities) {
        return await Promise.all(capabilities
            .filter(list => list.length)
            .map(async (capList) => await this._negotiateCapabilities(capList)));
    }
    async _negotiateCapabilities(capList) {
        const mappedCapList = (0, shared_utils_1.arrayToObject)(capList, cap => ({
            [cap.name]: cap
        }));
        const messages = await this.sendMessageAndCaptureReply(Commands_1.CapabilityNegotiation, {
            subCommand: 'REQ',
            capabilities: capList.map(cap => cap.name).join(' ')
        });
        const capReply = messages.shift();
        if (!capReply) {
            throw new Error('capability negotiation failed unexpectedly without any reply');
        }
        if (!(capReply instanceof Commands_1.CapabilityNegotiation)) {
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
                    (0, shared_utils_1.resolveConfigValue)(this._options.credentials.password),
                    this.sendMessageAndCaptureReply(Commands_1.CapabilityNegotiation, {
                        subCommand: 'LS',
                        version: '302'
                    })
                        .then(async (capReply) => {
                        if (!capReply.length || !(capReply[0] instanceof Commands_1.CapabilityNegotiation)) {
                            this._logger.debug('Server does not support capabilities');
                            return [];
                        }
                        this._supportsCapabilities = true;
                        const capLists = capReply.map(line => (0, shared_utils_1.arrayToObject)(line.capabilities.split(' '), (part) => {
                            if (!part) {
                                return {};
                            }
                            const [cap, param] = (0, shared_utils_1.splitWithLimit)(part, '=', 2);
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
                        this.sendMessage(Commands_1.CapabilityNegotiation, { subCommand: 'END' });
                    })
                ]);
                if (password) {
                    this.sendMessage(Commands_1.Password, { password });
                }
                this.sendMessage(Commands_1.NickChange, { nick: this._desiredNick });
                this.sendMessage(Commands_1.UserRegistration, {
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
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], IrcClient.prototype, "_options", void 0);
exports.IrcClient = IrcClient;
