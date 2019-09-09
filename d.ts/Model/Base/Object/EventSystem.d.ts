import { Component } from "./Component";
import { TypeAny, TypeAttribute } from "../Helper/Type";
export declare class EventSystem {
    private readonly allComponents;
    private readonly types;
    private readonly allEvents;
    private readonly awakeSystems;
    private readonly startSystems;
    private readonly destroySystems;
    private readonly loadSystems;
    private readonly updateSystems;
    private readonly lateUpdateSystems;
    private readonly changeSystems;
    private readonly deserializeSystems;
    private updates;
    private updates2;
    private readonly starts;
    private loaders;
    private loaders2;
    private lateUpdates;
    private lateUpdates2;
    private addTypeCount;
    private readonly CanLoad;
    Add(component: Component): void;
    AddType(target: any, type: TypeAny, attributeType: TypeAttribute, eventId?: string): void;
    RegisterEvent(eventId: string, type: TypeAny): void;
    GetTypes(systemAttributeType: TypeAny): Set<TypeAny>;
    Remove(instanceId: number): void;
    /**
     * Get
     */
    Get(id: number): Component;
    /**
     * Deserialize
     */
    Deserialize(component: Component): void;
    /**
     * Awake
     */
    Awake<P1, P2, P3>(component: Component, p1?: P1, p2?: P2, p3?: P3): void;
    Change(component: Component): void;
    Load(): void;
    private Start;
    Destroy(component: Component): void;
    Update(): void;
    LateUpdate(): void;
    Run<A, B, C>(type: string, a?: A, b?: B, c?: C): void;
}
