export type ReloadMessage = {
    type: "RELOAD";
    name: string;
};
export declare function startMFEDevServer(onReload: (name: string) => void): void;
