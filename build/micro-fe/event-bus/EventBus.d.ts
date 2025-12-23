export type Handler<T = any> = (payload: T) => void;
export declare class EventBus<Events extends Record<string, any> = any> {
    private map;
    on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void;
    off<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void;
    emit<K extends keyof Events>(event: K, payload: Events[K]): void;
}
