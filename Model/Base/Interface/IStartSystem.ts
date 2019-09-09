import { TypeAny } from "../Helper/Type";

export interface IStartSystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class StartSystem<T> implements IStartSystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.Start(o as T);
    }

    public abstract Start(self: T);
}