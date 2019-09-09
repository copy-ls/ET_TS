import { TypeAny } from "../Helper/Type";

export interface ILoadSystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class LoadSystem<T> implements ILoadSystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Load(o as T);
    }

    public abstract Load(self: T);
}