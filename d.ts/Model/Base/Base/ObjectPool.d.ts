import { Component } from "../Object/Component";
export declare class ComponentStack extends Component {
    constructor(typeName: string);
    private typeName;
    readonly TypeName: string;
    readonly Count: number;
    private readonly stack;
    Push(component: Component): void;
    Pop(): Component;
    Peek(): Component;
    Dispose(): void;
}
export declare class ObjectPool extends Component {
    constructor();
    private name;
    private readonly map;
    Name: string;
    Fetch<K extends Component>(type: new () => K): K;
    Recycle(component: Component): void;
    Clear(): void;
}
