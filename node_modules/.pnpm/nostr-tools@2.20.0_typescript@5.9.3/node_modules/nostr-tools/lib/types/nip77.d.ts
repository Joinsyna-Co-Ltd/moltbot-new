import { Filter } from './filter.ts';
import { AbstractRelay } from './relay.ts';
declare class WrappedBuffer {
    _raw: Uint8Array;
    length: number;
    constructor(buffer?: Uint8Array | number);
    unwrap(): Uint8Array;
    get capacity(): number;
    extend(buf: Uint8Array | WrappedBuffer): void;
    shift(): number;
    shiftN(n?: number): Uint8Array;
}
export declare class NegentropyStorageVector {
    items: {
        timestamp: number;
        id: Uint8Array;
    }[];
    sealed: boolean;
    constructor();
    insert(timestamp: number, id: string): void;
    seal(): void;
    unseal(): void;
    size(): number;
    getItem(i: number): {
        timestamp: number;
        id: Uint8Array;
    };
    iterate(begin: number, end: number, cb: (item: {
        timestamp: number;
        id: Uint8Array;
    }, i: number) => boolean): void;
    findLowerBound(begin: number, end: number, bound: {
        timestamp: number;
        id: Uint8Array;
    }): number;
    fingerprint(begin: number, end: number): Uint8Array;
    _checkSealed(): void;
    _checkBounds(begin: number, end: number): void;
    _binarySearch(arr: {
        timestamp: number;
        id: Uint8Array;
    }[], first: number, last: number, cmp: (a: {
        timestamp: number;
        id: Uint8Array;
    }) => boolean): number;
}
export declare class Negentropy {
    storage: NegentropyStorageVector;
    frameSizeLimit: number;
    lastTimestampIn: number;
    lastTimestampOut: number;
    constructor(storage: NegentropyStorageVector, frameSizeLimit?: number);
    _bound(timestamp: number, id?: Uint8Array): {
        timestamp: number;
        id: Uint8Array;
    };
    initiate(): string;
    reconcile(queryMsg: string, onhave?: (id: string) => void, onneed?: (id: string) => void): string | null;
    splitRange(lower: number, upper: number, upperBound: {
        timestamp: number;
        id: Uint8Array;
    }, o: WrappedBuffer): void;
    exceededFrameSizeLimit(n: number): boolean;
    decodeTimestampIn(encoded: WrappedBuffer): number;
    decodeBound(encoded: WrappedBuffer): {
        timestamp: number;
        id: Uint8Array;
    };
    encodeTimestampOut(timestamp: number): WrappedBuffer;
    encodeBound(key: {
        timestamp: number;
        id: Uint8Array;
    }): WrappedBuffer;
    getMinimalBound(prev: {
        timestamp: number;
        id: Uint8Array;
    }, curr: {
        timestamp: number;
        id: Uint8Array;
    }): {
        timestamp: number;
        id: Uint8Array;
    };
}
export declare class NegentropySync {
    relay: AbstractRelay;
    storage: NegentropyStorageVector;
    private neg;
    private filter;
    private subscription;
    private onhave?;
    private onneed?;
    constructor(relay: AbstractRelay, storage: NegentropyStorageVector, filter: Filter, params?: {
        label?: string;
        onhave?: (id: string) => void;
        onneed?: (id: string) => void;
        onclose?: (errReason?: string) => void;
    });
    start(): Promise<void>;
    close(): void;
}
export {};
