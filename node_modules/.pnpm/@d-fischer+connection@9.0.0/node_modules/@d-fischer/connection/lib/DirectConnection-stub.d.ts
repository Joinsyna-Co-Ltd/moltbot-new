import { type EventBinder } from '@d-fischer/typed-event-emitter';
import { type Connection } from './Connection';
export declare class DirectConnection implements Connection {
    readonly hasSocket: boolean;
    sendRaw: (line: string) => void;
    sendLine: (line: string) => void;
    readonly isConnected: boolean;
    readonly isConnecting: boolean;
    readonly connect: () => void;
    readonly disconnect: () => void;
    readonly assumeExternalDisconnect: () => void;
    readonly onConnect: EventBinder<[]>;
    readonly onDisconnect: EventBinder<[boolean, Error]>;
    readonly onEnd: EventBinder<[boolean, Error]>;
    readonly onReceive: EventBinder<[string]>;
    constructor();
}
