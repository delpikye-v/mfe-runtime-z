type LoadOptions = {
    timeout?: number;
    retries?: number;
};
export declare function loadScript(url: string, options?: LoadOptions): Promise<void>;
export {};
