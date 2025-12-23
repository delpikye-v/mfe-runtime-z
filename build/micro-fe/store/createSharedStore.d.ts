export type Unsubscribe = () => void;
export declare function createSharedStore<T extends object>(initial: T): {
    getState(): T;
    /** Update state (shallow merge) */
    setState(partial: Partial<T>): void;
    /** Subscribe to state changes */
    subscribe(fn: (s: T) => void, callImmediately?: boolean): Unsubscribe;
};
