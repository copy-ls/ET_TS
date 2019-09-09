import { TypeAny } from "../Helper/Type";
export interface IStartSystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class StartSystem<T> implements IStartSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Start(self: T): any;
}
