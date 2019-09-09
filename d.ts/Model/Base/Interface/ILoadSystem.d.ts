import { TypeAny } from "../Helper/Type";
export interface ILoadSystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class LoadSystem<T> implements ILoadSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Load(self: T): any;
}
