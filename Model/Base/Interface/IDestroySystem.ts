import { TypeAny } from "../Helper/Type";

export interface IDestroySystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class DestroySystem<T> implements IDestroySystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Destroy(o as T);
    }

    public abstract Destroy(self: T);
}