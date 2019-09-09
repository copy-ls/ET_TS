import { ComponentWithId } from "./ComponentWithId";
import { Component } from "./Component";
import { InstanceOfISerializeToEntity } from "../Interface/ISerializeToEntity";
import { TypeComponent } from "../Helper/Type";
import { ComponentFactory } from "../Base/ComponentFactory";
import { Log } from "../Logger/Log";

export class Entity extends ComponentWithId {

    protected constructor(id?: number) {
        super(id);
    }

    private components: Set<Component> = new Set<Component>();
    private componentMap: Map<TypeComponent, Component> = new Map<TypeComponent, Component>();

    public Dispose(): void {
        if (this.IsDisposed) {
            return;
        }

        super.Dispose();

        this.components.forEach((component) => {
            try {
                component.Dispose();
            } catch (error) {
                Log.Error(error);
            }
        })

        this.componentMap.forEach((component) => {
            try {
                component.Dispose();
            } catch (error) {
                Log.Error(error);
            }
        })

        this.components.clear();
        this.componentMap.clear();
    }

    public AddComponent(component: Component): Component
    public AddComponent<K extends Component, P1, P2, P3>(k: new () => K, p1?: P1, p2?: P2, p3?: P3): K
    public AddComponent<K extends Component, P1, P2, P3>() {
        const arg1 = arguments[0];
        let type: new () => K;
        if (arg1 instanceof Component) {
            type = arg1.constructor as new () => K;
            if (this.componentMap.has(type)) {
                Log.Error(`AddComponent, component already exist, id: ${this.Id}, component: ${type.name}`);
                return;
            }
            const component = arg1;
            component.Parent = this;
            this.componentMap.set(type, component);
            if (InstanceOfISerializeToEntity(component)) {
                this.components.add(component);
            }
            return component;
        } else {
            type = arg1 as new () => K;
            if (this.componentMap.has(type)) {
                Log.Error(`AddComponent, component already exist, id: ${this.Id}, component: ${type.name}`);
                return;
            }
            const p1 = arguments[1] as P1;
            const p2 = arguments[2] as P2;
            const p3 = arguments[3] as P3;
            const component = ComponentFactory.Instance.CreateWithParent<K, P1, P2, P3>(type, this, this.IsFromPool, p1, p2, p3);
            this.componentMap.set(type, component);
            if (InstanceOfISerializeToEntity(component)) {
                this.components.add(component);
            }
            return component;
        }
    }

    public RemoveComponent(type: TypeComponent): void {
        if (this.IsDisposed) {
            return;
        }
        const component = this.componentMap.get(type);
        if (!component) {
            return;
        }
        this.componentMap.delete(type);
        this.components.delete(component);
        component.Dispose();
    }

    public GetComponent(type: TypeComponent): Component {
        return this.componentMap.get(type);
    }

    public GetComponents(): Component[] {
        return Array.from(this.componentMap.values());
    }

    public EndInit(): void {
        try {
            super.EndInit();
            this.componentMap.clear();
            if (this.components != null) {
                this.components.forEach((component) => {
                    component.Parent = this;
                    this.componentMap.set(component.constructor as TypeComponent, component);
                })
            }
        }
        catch (error) {
            Log.Error(error);
        }
    }
}