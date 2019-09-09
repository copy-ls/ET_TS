import { IEvent } from "../Interface/IEvent";
export declare abstract class AEvent<A, B, C> implements IEvent {
    IEvent: string;
    Handle(a?: A, b?: B, c?: C): void;
    abstract Run(a?: A, b?: B, c?: C): void;
}
