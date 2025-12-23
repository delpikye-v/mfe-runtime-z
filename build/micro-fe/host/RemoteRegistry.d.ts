type RemoteConfig = {
    name: string;
    url: string;
    global: string;
    el: HTMLElement;
};
export declare class RemoteRegistry {
    private remotes;
    register(config: RemoteConfig): void;
    get(name: string): RemoteConfig;
    getAll(): any[];
}
export {};
