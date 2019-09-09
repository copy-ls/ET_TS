export interface IEvent {
    IEvent: string;
    Handle(a?: Object, b?: Object, c?: Object): void;
}

export function AsIEvent(obj: object) {
    return "IEvent" in obj;
}