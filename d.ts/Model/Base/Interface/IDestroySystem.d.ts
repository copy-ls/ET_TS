import { TypeAny } from "../Helper/Type";
export interface IDestroySystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class DestroySystem<T> implements IDestroySystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Destroy(self: T): any;
}
