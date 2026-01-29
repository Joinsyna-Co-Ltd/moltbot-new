import { AbstractConnection } from './AbstractConnection';
import type { ConnectionOptions, ConnectionTarget } from './Connection';
export declare class DirectConnection extends AbstractConnection {
    private _socket;
    private _closingOnDemand;
    private _hadError;
    protected readonly _host: string;
    protected readonly _port: number;
    protected readonly _secure: boolean;
    constructor(target: ConnectionTarget, options?: ConnectionOptions<never>);
    get hasSocket(): boolean;
    sendRaw(line: string): void;
    connect(): void;
    disconnect(): void;
    protected clearSocket(): void;
}
