import { TypeAny } from "../Helper/Type";
export interface IChangeSystem {
    Type(): TypeAny;
    Run(o: any): void;
}
export declare abstract class ChangeSystem<T> implements IChangeSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Change(self: T): any;
}
