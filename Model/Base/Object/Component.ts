import { IDisposable } from "../Interface/IDisposable";
import { ETObject as ETObject } from "../Base/Object";
import { IdGenerator } from "../Helper/IdGenerator";
import { Entity } from "./Entity";
import { Game } from "../../Entity/Game";

export abstract class Component extends ETObject implements IDisposable {

    protected constructor() {
        super();
        this.instanceId = IdGenerator.GenerateInstanceId();
    }

    private instanceId: number = 0;
    private isFromPool: boolean = false;
    private parent: Component;

    public get InstanceId(): number {
        return this.instanceId;
    }

    public get IsFromPool(): boolean {
        return this.isFromPool;
    }

    public set IsFromPool(value: boolean) {
        this.isFromPool = value;
        if (!this.isFromPool) {
            return;
        }
        if (this.InstanceId === 0) {
            this.instanceId = IdGenerator.GenerateInstanceId();
        }
    }

    public get Parent(): Component {
        return this.parent;
    }

    public set Parent(value: Component) {
        this.parent = value;
    }

    public Entity(): Entity {
        return this.Parent as Entity;
    }

    public get IsDisposed(): boolean {
        return this.InstanceId == 0;
    }

    public GetParent<T extends Component>(): T {
        return this.parent as T;
    }

    public Dispose(): void {
        if (this.IsDisposed) {
            return;
        }

        Game.EventSystem.Destroy(this);
        Game.EventSystem.Remove(this.InstanceId);
        this.instanceId = 0;

        if (this.IsFromPool) {
            Game.ObjectPool.Recycle(this);
        }
    }

    //TODO EndInit
    public EndInit(): void {
    }

    //TODO Tostring
    public ToString(): string {
        return "";
    }
}