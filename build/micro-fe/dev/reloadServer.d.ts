import { MFEHost } from "../host/MFEHost";
export type DevRemoteConfig = {
    url: string;
    global: string;
    el: () => HTMLElement;
};
export declare function createMFEReloadServer(host: MFEHost, remotes: Record<string, DevRemoteConfig>): () => void;
