import { IEvent } from "../Interface/IEvent";

export abstract class AEvent<A, B, C> implements IEvent {
    IEvent: string = "IEvent";

    public Handle(a?: A, b?: B, c?: C): void {
        this.Run(a, b, c);
    }

    abstract Run(a?: A, b?: B, c?: C): void
}