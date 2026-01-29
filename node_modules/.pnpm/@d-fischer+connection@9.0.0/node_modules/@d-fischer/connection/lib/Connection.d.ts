import type { Logger } from '@d-fischer/logger';
import type { EventBinder } from '@d-fischer/typed-event-emitter';
export interface Connection {
    readonly isConnecting: boolean;
    readonly isConnected: boolean;
    readonly hasSocket: boolean;
    readonly onReceive: EventBinder<[string]>;
    readonly onConnect: EventBinder<[]>;
    readonly onDisconnect: EventBinder<[onDemand: boolean, error?: Error]>;
    readonly onEnd: EventBinder<[onDemand: boolean, error?: Error]>;
    connect: () => void;
    disconnect: () => void;
    assumeExternalDisconnect: () => void;
    sendLine: (line: string) => void;
}
export interface ConnectionTarget {
    hostName?: string;
    port?: number;
    url?: string;
    secure?: boolean;
}
export interface ConnectionOptions<T> {
    lineBased?: boolean;
    logger?: Logger;
    additionalOptions?: T;
}
