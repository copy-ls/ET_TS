import { TypeAny } from "../Helper/Type";
export interface IDeserializeSystem {
    Type(): TypeAny;
    Run(o: any): any;
}
export declare abstract class DeserializeSystem<T> implements IDeserializeSystem {
    type: new () => T;
    constructor(t: new () => T);
    Type(): new () => T;
    Run(o: any): void;
    abstract Deserialize(self: T): any;
}
