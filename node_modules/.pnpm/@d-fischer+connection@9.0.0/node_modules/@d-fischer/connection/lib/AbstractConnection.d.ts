import type { Logger } from '@d-fischer/logger';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import type { Connection, ConnectionOptions } from './Connection';
export type InferConnectionOptions<T extends Connection> = T extends AbstractConnection<infer O> ? O : never;
export declare abstract class AbstractConnection<Options = never> extends EventEmitter implements Connection {
    private readonly _lineBased;
    protected readonly _logger?: Logger;
    protected readonly _additionalOptions?: Options;
    private _currentLine;
    protected _connecting: boolean;
    protected _connected: boolean;
    readonly onReceive: import("@d-fischer/typed-event-emitter").EventBinder<[string]>;
    readonly onConnect: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    readonly onDisconnect: import("@d-fischer/typed-event-emitter").EventBinder<[onDemand: boolean, error?: Error | undefined]>;
    readonly onEnd: import("@d-fischer/typed-event-emitter").EventBinder<[onDemand: boolean, error?: Error | undefined]>;
    constructor({ lineBased, logger, additionalOptions }?: ConnectionOptions<Options>);
    get isConnecting(): boolean;
    get isConnected(): boolean;
    sendLine(line: string): void;
    abstract connect(): void;
    abstract disconnect(): void;
    assumeExternalDisconnect(): void;
    protected receiveRaw(data: string): void;
    protected abstract sendRaw(line: string): void;
    protected abstract clearSocket(): void;
    abstract get hasSocket(): boolean;
}
