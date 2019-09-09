import { TypeAny } from "../Helper/Type";

export interface ILateUpdateSystem {
    Type(): TypeAny

    Run(o: any);
}

export abstract class LateUpdateSystem<T> implements ILateUpdateSystem {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any): void {
        this.LateUpdate(o as T);
    }

    public abstract LateUpdate(self: T);
}