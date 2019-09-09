import { TypeAny } from "../Helper/Type";
export interface IAwakeSystem {
    Type(): TypeAny;
}
export interface IAwake<A, B, C> {
    Run(o: any, a?: A, b?: B, c?: C): void;
}
export declare abstract class AwakeSystem<T, A, B, C> implements IAwakeSystem, IAwake<A, B, C> {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any, a?: A, b?: B, c?: C): void;
    abstract Awake(self: T, a?: A, b?: B, c?: C): any;
}
