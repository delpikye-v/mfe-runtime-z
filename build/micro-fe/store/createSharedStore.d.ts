export type Unsubscribe = () => void;
export declare function createSharedStore<T extends object>(initial: T): {
    getState(): T;
    setState(partial: Partial<T>): void;
    subscribe(fn: (s: T) => void): Unsubscribe;
};
