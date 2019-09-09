import { TypeAny } from "../Helper/Type";

export interface IUpdateSystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class UpdateSystem<T> implements IUpdateSystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Update(o as T);
    }

    public abstract Update(self: T);
}