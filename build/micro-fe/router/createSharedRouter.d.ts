export declare function createSharedRouter(ctx: {
    eventBus: any;
    name: string;
}): {
    /** Remote → Host: request host navigation */
    go(path: string): void;
    /** Host → Remote: register callback when host navigates */
    onChange(cb: (path: string) => void): any;
    /** Remote → all: notify route change */
    emitRouteChange(path: string): void;
    /** Remote → Remote: register listener for route changes (excluding self) */
    onRouteChange(cb: (path: string) => void): any;
};
