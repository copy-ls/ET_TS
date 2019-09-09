import { IDisposable } from "../Interface/IDisposable";
import { ETObject as ETObject } from "../Base/Object";
import { Entity } from "./Entity";
export declare abstract class Component extends ETObject implements IDisposable {
    protected constructor();
    private instanceId;
    private isFromPool;
    private parent;
    readonly InstanceId: number;
    IsFromPool: boolean;
    Parent: Component;
    Entity(): Entity;
    readonly IsDisposed: boolean;
    GetParent<T extends Component>(): T;
    Dispose(): void;
    EndInit(): void;
    ToString(): string;
}
