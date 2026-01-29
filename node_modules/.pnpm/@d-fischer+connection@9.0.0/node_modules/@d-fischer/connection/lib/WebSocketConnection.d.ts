/// <reference types="ws" />
import type { ClientOptions } from '@d-fischer/isomorphic-ws';
import { AbstractConnection } from './AbstractConnection';
import type { ConnectionOptions, ConnectionTarget } from './Connection';
export interface WebSocketConnectionOptions {
    wsOptions?: ClientOptions;
}
export declare class WebSocketConnection extends AbstractConnection<WebSocketConnectionOptions> {
    private _socket;
    private _closingOnDemand;
    private readonly _url;
    constructor(target: ConnectionTarget, options?: ConnectionOptions<WebSocketConnectionOptions>);
    get hasSocket(): boolean;
    sendRaw(line: string): void;
    connect(): void;
    disconnect(): void;
    protected clearSocket(): void;
}
