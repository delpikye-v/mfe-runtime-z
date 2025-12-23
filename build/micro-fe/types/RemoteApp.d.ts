import { MFEContext } from "./MFEContext";
export type RemoteApp = {
    name?: string;
    mount: (el: HTMLElement, ctx: MFEContext) => void;
    unmount?: (el: HTMLElement) => void;
};
