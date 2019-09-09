import { TypeAny } from "../Helper/Type";

export interface IChangeSystem {
    Type(): TypeAny
    Run(o: any): void
}

export abstract class ChangeSystem<T> implements IChangeSystem{

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Change(o as T);
    }

    public abstract Change(self: T);
}