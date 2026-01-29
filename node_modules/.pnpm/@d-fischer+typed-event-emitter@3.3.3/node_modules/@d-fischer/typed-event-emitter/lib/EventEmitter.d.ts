import { Listener } from './Listener';
export declare type EventHandler<Args extends any[]> = (...args: Args) => void;
export declare type EventBinder<Args extends any[]> = (event: EventHandler<Args>) => Listener;
export declare class EventEmitter {
    private readonly _eventListeners;
    private readonly _internalEventListeners;
    on<Args extends any[]>(event: EventBinder<Args>, listener: EventHandler<Args>): Listener;
    addListener<Args extends any[]>(event: EventBinder<Args>, listener: EventHandler<Args>): Listener;
    removeListener(id: Listener): void;
    removeListener<Args extends any[]>(event?: EventBinder<Args>, listener?: EventHandler<Args>): void;
    registerEvent<Args extends any[]>(): EventBinder<Args>;
    protected emit<Args extends any[]>(event: EventBinder<Args>, ...args: Args): void;
    protected registerInternalEvent<T extends any[]>(): EventBinder<T>;
    protected addInternalListener<Args extends any[]>(event: EventBinder<Args>, listener: EventHandler<Args>): Listener;
    protected removeInternalListener(id: Listener): void;
    protected removeInternalListener<Args extends any[]>(event?: EventBinder<Args>, listener?: EventHandler<Args>): void;
    private _addListener;
    private _removeListener;
}
