import { TypeAny } from "../Helper/Type";

export interface IDeserializeSystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class DeserializeSystem<T> implements IDeserializeSystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Deserialize(o as T);
    }

    public abstract Deserialize(self: T);
}