/// <reference types="node" />
import { type Connection, type WebSocketConnectionOptions } from '@d-fischer/connection';
import { type LoggerOptions } from '@d-fischer/logger';
import { type ResolvableValue } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import type { Capability, ServerCapability } from './Capability/Capability';
import { type Message, type MessageConstructor, type MessageFieldsFromType } from './Message/Message';
import { MessageCollector } from './Message/MessageCollector';
import * as MessageTypes from './Message/MessageTypes';
import { type ServerProperties } from './ServerProperties';
export type EventHandler<T extends Message = Message> = (message: T) => void;
export type EventHandlerList<T extends Message = Message> = Map<string, EventHandler<T>>;
export interface IrcCredentials {
    nick: string;
    password?: ResolvableValue<string | undefined>;
    userName?: string;
    realName?: string;
}
export interface IrcClientConnectionOptions {
    hostName: string;
    port?: number;
    secure?: boolean;
    pingOnInactivity?: number;
    pingTimeout?: number;
    reconnect?: boolean;
}
export interface IrcClientOptions {
    connection: IrcClientConnectionOptions;
    credentials: IrcCredentials;
    channels?: ResolvableValue<string[]>;
    rejoinChannelsOnReconnect?: boolean;
    webSocket?: boolean;
    connectionOptions?: WebSocketConnectionOptions;
    channelTypes?: string;
    logger?: Partial<LoggerOptions>;
    nonConformingCommands?: string[];
    manuallyAcknowledgeJoins?: boolean;
}
export declare class IrcClient extends EventEmitter {
    protected _connection: Connection;
    protected _registered: boolean;
    protected _options: IrcClientOptions;
    protected _desiredNick: string;
    protected _userName?: string;
    protected _realName?: string;
    protected _supportsCapabilities: boolean;
    protected _events: Map<string, EventHandlerList<Message<{}>>>;
    protected _registeredMessageTypes: Map<string, MessageConstructor<Message<{}>>>;
    /**
     * @eventListener
     */
    onConnect: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    /**
     * @eventListener
     */
    onRegister: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    /**
     * @eventListener
     */
    onDisconnect: import("@d-fischer/typed-event-emitter").EventBinder<[manually: boolean, reason?: Error | undefined]>;
    /**
     * @eventListener
     */
    onPrivmsg: import("@d-fischer/typed-event-emitter").EventBinder<[target: string, user: string, message: string, msg: MessageTypes.Commands.PrivateMessage]>;
    /**
     * @eventListener
     */
    onAction: import("@d-fischer/typed-event-emitter").EventBinder<[target: string, user: string, message: string, msg: MessageTypes.Commands.PrivateMessage]>;
    /**
     * @eventListener
     */
    onNotice: import("@d-fischer/typed-event-emitter").EventBinder<[target: string, user: string, message: string, msg: MessageTypes.Commands.Notice]>;
    /**
     * @eventListener
     */
    onNickChange: import("@d-fischer/typed-event-emitter").EventBinder<[oldNick: string | undefined, newNick: string, msg: MessageTypes.Commands.NickChange]>;
    /**
     * @eventListener
     */
    onCtcp: import("@d-fischer/typed-event-emitter").EventBinder<[target: string, user: string, command: string, params: string, msg: MessageTypes.Commands.PrivateMessage]>;
    /**
     * @eventListener
     */
    onCtcpReply: import("@d-fischer/typed-event-emitter").EventBinder<[target: string, user: string, command: string, params: string, msg: MessageTypes.Commands.Notice]>;
    /**
     * @eventListener
     */
    onPasswordError: import("@d-fischer/typed-event-emitter").EventBinder<[error: Error]>;
    /**
     * @eventListener
     */
    onAnyMessage: import("@d-fischer/typed-event-emitter").EventBinder<[msg: Message<{}>]>;
    protected _serverProperties: ServerProperties;
    protected _supportedFeatures: Record<string, true | string>;
    protected _collectors: MessageCollector[];
    protected _clientCapabilities: Map<string, Capability>;
    protected _serverCapabilities: Map<string, ServerCapability>;
    protected _negotiatedCapabilities: Map<string, ServerCapability>;
    protected _pingOnInactivity: number;
    protected _pingTimeout: number;
    protected _pingCheckTimer?: NodeJS.Timeout;
    protected _pingTimeoutTimer?: NodeJS.Timeout;
    protected _currentNick: string;
    private _currentChannels;
    private _hasRegisteredBefore;
    private _channelsFromLastRegister;
    private readonly _logger;
    private _initialConnectionSetupDone;
    constructor(options: IrcClientOptions);
    receiveLine(line: string): void;
    get serverProperties(): ServerProperties;
    get port(): number;
    pingCheck(): void;
    reconnect(message?: string): void;
    registerMessageType(cls: MessageConstructor): void;
    knowsCommand(command: string): boolean;
    getCommandClass(command: string): MessageConstructor | undefined;
    acknowledgeJoin(channel: string): void;
    connect(): void;
    addCapability(cap: Capability): void;
    registerCapability(cap: Capability): Promise<ServerCapability[] | Error>;
    send(message: Message): void;
    sendRaw(line: string): void;
    onNamedMessage<T extends Message = Message>(commandName: string, handler: EventHandler<T>, handlerName?: string): string;
    onTypedMessage<T extends Message>(type: MessageConstructor<T>, handler: EventHandler<T>, handlerName?: string): string;
    removeMessageListener(handlerName: string): void;
    createMessage<T extends Message>(type: MessageConstructor<T>, params: Partial<MessageFieldsFromType<T>>, tags?: Record<string, string>): T;
    sendMessage<T extends Message>(type: MessageConstructor<T>, params: Partial<MessageFieldsFromType<T>>, tags?: Record<string, string>): void;
    sendMessageAndCaptureReply<T extends Message>(type: MessageConstructor<T>, params: Partial<MessageFieldsFromType<T>>): Promise<Message[]>;
    get isConnected(): boolean;
    get isConnecting(): boolean;
    get isRegistered(): boolean;
    get currentNick(): string;
    get currentChannels(): string[];
    /** @private */
    collect(originalMessage: Message, ...types: MessageConstructor[]): MessageCollector;
    /** @private */
    stopCollect(collector: MessageCollector): void;
    join(channel: string, key?: string): void;
    part(channel: string): void;
    quit(text?: string): void;
    quitAbruptly(): void;
    say(target: string, text: string, tags?: Record<string, string>): void;
    sendCtcp(target: string, type: string, message: string): void;
    action(target: string, message: string): void;
    changeNick(newNick: string): void;
    protected registerCoreMessageTypes(): void;
    protected _negotiateCapabilityBatch(capabilities: ServerCapability[][]): Promise<Array<ServerCapability[] | Error>>;
    protected _negotiateCapabilities(capList: ServerCapability[]): Promise<ServerCapability[] | Error>;
    private _setupConnection;
    private _handleReceivedClientNick;
    private _handleEvents;
    private _startPingCheckTimer;
}
