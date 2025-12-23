import { EventBus } from "../event-bus/EventBus";
import type { RemoteApp } from "../types/RemoteApp";
type HostOptions = {
    stores?: Record<string, any>;
    navigate?: (path: string) => void;
    onRemoteError?: (error: Error) => void;
};
export declare class MFEHost {
    private eventBus;
    private stores;
    private navigate?;
    private onRemoteError?;
    constructor(options?: HostOptions);
    /** load script only */
    load(url: string, global: string): Promise<RemoteApp>;
    /** mount with identity */
    mount(remote: RemoteApp, el: HTMLElement, name: string): void;
    unmount(remote: RemoteApp, el: HTMLElement, name?: string): void;
    getEventBus(): EventBus<any>;
    /** 🔥 reload = unmount + reload script + mount (KEEP name) */
    reloadRemote(options: {
        name: string;
        url: string;
        global: string;
        el: HTMLElement;
    }): Promise<void>;
}
export {};
