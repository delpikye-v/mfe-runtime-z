import { EventBus } from "../event-bus/EventBus";
import type { RemoteApp } from "../types/RemoteApp";
import type { MFEContext } from "../types/MFEContext";
type HostOptions<S extends Record<string, any> = any> = {
    stores?: S;
    navigate?: (path: string) => void;
    onRemoteError?: (error: Error) => void;
    isolate?: boolean;
    fallback?: (el: HTMLElement, name: string, error: Error, ctx: MFEContext<S>) => void;
    onMountStart?: (name: string) => void;
    onMountEnd?: (name: string) => void;
    onUnmountStart?: (name: string) => void;
    onUnmountEnd?: (name: string) => void;
};
interface MountOptions {
    isolate?: boolean;
    shadowMode?: ShadowRootMode;
}
export declare class MFEHost<S extends Record<string, any> = any> {
    private eventBus;
    private stores;
    private navigate?;
    private onRemoteError?;
    private fallback?;
    private isolate;
    private onMountStart?;
    private onMountEnd?;
    private onUnmountStart?;
    private onUnmountEnd?;
    private cache;
    constructor(options?: HostOptions<S>);
    /** Load remote JS only */
    load(url: string, global: string): Promise<RemoteApp>;
    /** Preload remote script */
    preload(url: string, global: string): Promise<void>;
    /** Mount remote with optional Shadow DOM isolation */
    mount(remote: RemoteApp, el: HTMLElement, name: string, options?: MountOptions): void;
    /** Unmount remote */
    unmount(remote: RemoteApp, el: HTMLElement, name?: string): void;
    /** Get central event bus */
    getEventBus(): EventBus<any>;
    /** Reload remote: unmount + reload script + mount again */
    reloadRemote(options: {
        name: string;
        url: string;
        global: string;
        el: HTMLElement;
        isolate?: boolean;
    }): Promise<void>;
}
export {};
