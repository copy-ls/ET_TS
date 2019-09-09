export interface IEvent {
    IEvent: string;
    Handle(a?: Object, b?: Object, c?: Object): void;
}
export declare function AsIEvent(obj: object): boolean;
