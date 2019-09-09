import { Component } from "../Object/Component";
import { ComponentWithId } from "../Object/ComponentWithId";
export declare class ComponentFactory {
    static instance: ComponentFactory;
    static readonly Instance: ComponentFactory;
    CreateWithParent<T extends Component, A, B, C>(type: new () => T, parent: Component, fromPool?: boolean, a?: A, b?: B, c?: C): T;
    Create<T extends Component, A, B, C>(type: new () => T, a?: A, b?: B, c?: C, fromPool?: boolean): T;
    CreateWithId<T extends ComponentWithId, A, B, C>(type: new () => T, id: number, a?: A, b?: B, c?: C, fromPool?: boolean): T;
}
