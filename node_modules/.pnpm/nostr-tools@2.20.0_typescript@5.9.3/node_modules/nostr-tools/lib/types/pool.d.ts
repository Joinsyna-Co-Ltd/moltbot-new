import { AbstractSimplePool, type AbstractPoolConstructorOptions } from './abstract-pool.ts';
export declare function useWebSocketImplementation(websocketImplementation: any): void;
export declare class SimplePool extends AbstractSimplePool {
    constructor(options?: Pick<AbstractPoolConstructorOptions, 'enablePing' | 'enableReconnect'>);
}
export * from './abstract-pool.ts';
