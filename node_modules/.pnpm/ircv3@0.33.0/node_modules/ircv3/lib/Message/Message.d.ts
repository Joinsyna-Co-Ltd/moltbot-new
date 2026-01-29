import { type ServerProperties } from '../ServerProperties';
export interface MessagePrefix {
    nick: string;
    user?: string;
    host?: string;
}
export interface MessageParam {
    value: string;
    trailing: boolean;
}
export interface BaseMessageParamSpecEntry {
    trailing?: boolean;
    rest?: boolean;
    noClient?: boolean;
    noServer?: boolean;
    type?: 'channel' | 'channelList';
    match?: RegExp;
}
export interface RequiredMessageParamSpecEntry extends BaseMessageParamSpecEntry {
    optional?: false;
}
export interface OptionalMessageParamSpecEntry extends BaseMessageParamSpecEntry {
    optional: true;
}
export type MessageParamSpecEntry<Optional extends boolean = boolean> = Optional extends true ? OptionalMessageParamSpecEntry : RequiredMessageParamSpecEntry;
export type MessageParamSpecEntryFor<T extends string | undefined> = undefined extends T ? T extends undefined ? never : MessageParamSpecEntry<true> : MessageParamSpecEntry<false>;
export type MessageFields<T extends {}> = {
    [K in keyof T]?: string;
};
export type MessageParamSpec<Fields extends MessageFields<Fields>> = {
    [K in Extract<keyof Fields, string>]-?: MessageParamSpecEntryFor<Fields[K]>;
};
export interface MessageInternalContents {
    params?: MessageParam[];
    tags?: Map<string, string>;
    prefix?: MessagePrefix;
    rawLine?: string;
}
export interface MessageInternalConfig {
    serverProperties?: ServerProperties;
    isServer?: boolean;
    shouldParseParams?: boolean;
}
export interface MessageConstructor<T extends Message = Message> extends Function {
    COMMAND: string;
    SUPPORTS_CAPTURE: boolean;
    checkParam: (param: string, spec: MessageParamSpecEntry, serverProperties?: ServerProperties) => boolean;
    new (command: string, contents?: MessageInternalContents, config?: MessageInternalConfig): T;
}
export type MessageParamNames<Fields extends MessageFields<Fields>> = Extract<keyof Fields, string>;
export type MessageParams<Fields extends MessageFields<Fields>> = {
    [K in MessageParamNames<Fields>]: MessageParam;
};
export type MessageFieldsFromType<T extends Message> = T extends Message<infer Fields> ? Fields extends MessageFields<Fields> ? Fields : never : never;
export declare function prefixToString(prefix: MessagePrefix): string;
export declare function createMessage<T extends Message>(type: MessageConstructor<T>, params: Partial<MessageFieldsFromType<T>>, prefix?: MessagePrefix, tags?: Map<string, string>, serverProperties?: ServerProperties, isServer?: boolean): T;
export declare class Message<Fields extends MessageFields<Fields> = {}> {
    static readonly COMMAND: string;
    static readonly SUPPORTS_CAPTURE: boolean;
    readonly _paramSpec?: MessageParamSpec<Fields>;
    protected _tags: Map<string, string>;
    protected _prefix?: MessagePrefix;
    protected _command: string;
    protected _params?: MessageParam[];
    /** @internal */ _parsedParams?: MessageParams<Fields>;
    protected _serverProperties: ServerProperties;
    private readonly _raw?;
    static checkParam(param: string, spec: MessageParamSpecEntry, serverProperties?: ServerProperties): boolean;
    constructor(command: string, { params, tags, prefix, rawLine }?: MessageInternalContents, { serverProperties, isServer, shouldParseParams }?: MessageInternalConfig, paramSpec?: MessageParamSpec<Fields>);
    getMinParamCount(isServer?: boolean): number;
    get paramCount(): number;
    prefixToString(): string;
    tagsToString(): string;
    toString(includePrefix?: boolean, fromRawParams?: boolean): string;
    /** @private */
    _initPrefixAndTags(prefix?: MessagePrefix, tags?: Map<string, string>): void;
    parseParams(isServer?: boolean): void;
    get rawParamValues(): string[];
    get prefix(): MessagePrefix | undefined;
    get command(): string;
    get tags(): Map<string, string>;
    get rawLine(): string | undefined;
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(originalMessage: Message): boolean;
    _acceptsInReplyCollection(message: Message): boolean;
    private _buildCommandFromNamedParams;
    private _buildCommandFromRawParams;
}
