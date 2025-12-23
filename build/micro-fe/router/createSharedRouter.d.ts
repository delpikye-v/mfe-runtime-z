export declare function createSharedRouter(ctx: {
    eventBus: any;
    name: string;
}): {
    /** Remote → Host */
    go(path: string): void;
    /** Host → Remote */
    onChange(cb: (path: string) => void): any;
};
