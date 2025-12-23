import type { EventBus } from "../event-bus/EventBus";
export interface MFEContext<S = any> {
    name: string;
    stores: S;
    eventBus: EventBus<any>;
    host: {
        navigate?: (path: string) => void;
    };
}
