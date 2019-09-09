import { TypeAny } from "../Helper/Type";

export interface IAwakeSystem {
    Type(): TypeAny
}

export interface IAwake<A, B, C> {
    Run(o: any, a?: A, b?: B, c?: C): void
}

export abstract class AwakeSystem<T, A, B, C> implements IAwakeSystem, IAwake<A, B, C> {

    type: new () => T;
    constructor(t: new () => T) {
        this.type = t;
    }

    Type(): new () => T {
        return this.type
    }

    Run(o: any, a?: A, b?: B, c?: C): void {
        this.Awake(o as T, a, b, c);
    }

    public abstract Awake(self: T, a?: A, b?: B, c?: C);
}