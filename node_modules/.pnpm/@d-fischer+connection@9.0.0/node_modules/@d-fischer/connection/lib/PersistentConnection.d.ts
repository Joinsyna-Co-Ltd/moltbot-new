import type { Constructor, ResolvableValueSync } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import type { InferConnectionOptions } from './AbstractConnection';
import type { Connection, ConnectionOptions, ConnectionTarget } from './Connection';
export interface PersistentConnectionConfig<T> extends ConnectionOptions<T> {
    retryLimit?: number;
    initialRetryLimit?: number;
    overlapManualReconnect?: boolean;
}
export declare class PersistentConnection<T extends Connection> extends EventEmitter implements Connection {
    private readonly _type;
    private readonly _target;
    private readonly _config;
    private readonly _retryLimit;
    private readonly _initialRetryLimit;
    private readonly _logger?;
    private _connecting;
    private _retryTimerGenerator?;
    private _connectionRetryCount;
    private _currentConnection?;
    private _previousConnection?;
    readonly onReceive: import("@d-fischer/typed-event-emitter").EventBinder<[string]>;
    readonly onConnect: import("@d-fischer/typed-event-emitter").EventBinder<[]>;
    readonly onDisconnect: import("@d-fischer/typed-event-emitter").EventBinder<[boolean, (Error | undefined)?]>;
    readonly onEnd: import("@d-fischer/typed-event-emitter").EventBinder<[boolean, (Error | undefined)?]>;
    constructor(_type: Constructor<T>, _target: ResolvableValueSync<ConnectionTarget>, _config?: PersistentConnectionConfig<InferConnectionOptions<T>>);
    get isConnected(): boolean;
    get isConnecting(): boolean;
    get hasSocket(): boolean;
    sendLine(line: string): void;
    connect(): void;
    disconnect(): void;
    assumeExternalDisconnect(): void;
    reconnect(): void;
    acknowledgeSuccessfulReconnect(): void;
    private _startTryingToConnect;
    private _tryConnect;
    private _reconnect;
}
