import { TypeAny } from "../Helper/Type";
export interface ILateUpdateSystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class LateUpdateSystem<T> implements ILateUpdateSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract LateUpdate(self: T): any;
}
