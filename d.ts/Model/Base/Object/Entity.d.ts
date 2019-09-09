import { ComponentWithId } from "./ComponentWithId";
import { Component } from "./Component";
import { TypeComponent } from "../Helper/Type";
export declare class Entity extends ComponentWithId {
    protected constructor(id?: number);
    private components;
    private componentMap;
    Dispose(): void;
    AddComponent(component: Component): Component;
    AddComponent<K extends Component, P1, P2, P3>(k: new () => K, p1?: P1, p2?: P2, p3?: P3): K;
    RemoveComponent(type: TypeComponent): void;
    GetComponent(type: TypeComponent): Component;
    GetComponents(): Component[];
    EndInit(): void;
}
