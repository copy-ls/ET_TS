import { TypeAny } from "../Helper/Type";
export interface IUpdateSystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class UpdateSystem<T> implements IUpdateSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Update(self: T): any;
}
