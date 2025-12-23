import type { EventBus } from "../event-bus/EventBus";
export type MFEContext = {
    /** identity của microFE hiện tại */
    name: string;
    eventBus: EventBus<any>;
    stores: Record<string, any>;
    host?: {
        navigate?: (path: string) => void;
    };
};
