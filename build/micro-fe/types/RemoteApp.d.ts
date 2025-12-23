export interface RemoteApp<C = any> {
    name?: string;
    mount: (el: HTMLElement | ShadowRoot, ctx: C) => void;
    unmount?: (el: HTMLElement | ShadowRoot) => void;
}
