import { Component } from "./Component";
export declare abstract class ComponentWithId extends Component {
    protected constructor(id?: number);
    private id;
    Id: number;
    Dispose(): void;
}
