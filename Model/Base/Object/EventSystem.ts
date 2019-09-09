import { Component } from "./Component";
import { UnOrderMultiMap } from "../UnOrderMultiMap";
import { IEvent, AsIEvent } from "../Interface/IEvent";
import { IAwakeSystem, AwakeSystem } from "../Interface/IAwakeSystem";
import { IStartSystem, StartSystem } from "../Interface/IStartSystem";
import { IDestroySystem, DestroySystem } from "../Interface/IDestroySystem";
import { ILoadSystem, LoadSystem } from "../Interface/ILoadSystem";
import { IUpdateSystem, UpdateSystem } from "../Interface/IUpdateSystem";
import { ILateUpdateSystem, LateUpdateSystem } from "../Interface/ILateUpdateSystem";
import { IChangeSystem, ChangeSystem } from "../Interface/IChangeSystem";
import { IDeserializeSystem, DeserializeSystem } from "../Interface/IDeserializeSystem";
import { TypeComponent, TypeAny, TypeAttribute } from "../Helper/Type";
import { ObjectSystemAttribute } from "../Base/ObjectSystemAttribute";
import { Log } from "../Logger/Log";

export class EventSystem {

    private readonly allComponents: Map<number, Component> = new Map<number, Component>();

    private readonly types: UnOrderMultiMap<TypeAny, TypeAny> = new UnOrderMultiMap<TypeAny, TypeAny>();

    private readonly allEvents: Map<string, Set<IEvent>> = new Map<string, Set<IEvent>>();

    private readonly awakeSystems: UnOrderMultiMap<TypeComponent, IAwakeSystem> = new UnOrderMultiMap<TypeComponent, IAwakeSystem>();

    private readonly startSystems: UnOrderMultiMap<TypeComponent, IStartSystem> = new UnOrderMultiMap<TypeComponent, IStartSystem>();

    private readonly destroySystems: UnOrderMultiMap<TypeComponent, IDestroySystem> = new UnOrderMultiMap<TypeComponent, IDestroySystem>();

    private readonly loadSystems: UnOrderMultiMap<TypeComponent, ILoadSystem> = new UnOrderMultiMap<TypeComponent, ILoadSystem>();

    private readonly updateSystems: UnOrderMultiMap<TypeComponent, IUpdateSystem> = new UnOrderMultiMap<TypeComponent, IUpdateSystem>();

    private readonly lateUpdateSystems: UnOrderMultiMap<TypeComponent, ILateUpdateSystem> = new UnOrderMultiMap<TypeComponent, ILateUpdateSystem>();

    private readonly changeSystems: UnOrderMultiMap<TypeComponent, IChangeSystem> = new UnOrderMultiMap<TypeComponent, IChangeSystem>();

    private readonly deserializeSystems: UnOrderMultiMap<TypeComponent, IDeserializeSystem> = new UnOrderMultiMap<TypeComponent, IDeserializeSystem>();

    private updates: Array<number> = new Array<number>();
    private updates2: Array<number> = new Array<number>();

    private readonly starts: Array<number> = new Array<number>();

    private loaders: Array<number> = new Array<number>();
    private loaders2: Array<number> = new Array<number>();

    private lateUpdates: Array<number> = new Array<number>();
    private lateUpdates2: Array<number> = new Array<number>();

    private addTypeCount: number = 0;
    private get CanLoad(): boolean {
        return this.addTypeCount === 0;
    }

    public Add(component: Component): void {
        this.allComponents.set(component.InstanceId, component);

        const type = component.constructor as TypeComponent;

        if (this.loadSystems.ContainsKey(type)) {
            this.loaders.push(component.InstanceId);
        }

        if (this.startSystems.ContainsKey(type)) {
            this.starts.push(component.InstanceId);
        }

        if (this.updateSystems.ContainsKey(type)) {
            this.updates.push(component.InstanceId);
        }

        if (this.lateUpdateSystems.ContainsKey(type)) {
            this.lateUpdates.push(component.InstanceId);
        }
    }

    public AddType(target: any, type: TypeAny, attributeType: TypeAttribute, eventId?: string) {

        this.types.Add(attributeType, target);

        const obj = new target(type);
        if (attributeType === ObjectSystemAttribute) {
            if (obj instanceof AwakeSystem) {
                this.awakeSystems.Add(obj.Type(), obj);
            } else if (obj instanceof UpdateSystem) {
                this.updateSystems.Add(obj.Type(), obj);
            } else if (obj instanceof LateUpdateSystem) {
                this.lateUpdateSystems.Add(obj.Type(), obj);
            } else if (obj instanceof StartSystem) {
                this.startSystems.Add(obj.Type(), obj);
            } else if (obj instanceof DestroySystem) {
                this.destroySystems.Add(obj.Type(), obj);
            } else if (obj instanceof LoadSystem) {
                this.loadSystems.Add(obj.Type(), obj);
            } else if (obj instanceof ChangeSystem) {
                this.changeSystems.Add(obj.Type(), obj);
            } else if (obj instanceof DeserializeSystem) {
                this.deserializeSystems.Add(obj.Type(), obj);
            }
        }

        if (eventId) {
            const obj = new target(type);
            if (!AsIEvent(obj)) {
                Log.Error(`${type.name} 没有继承IEvent`);
            }
            this.RegisterEvent(eventId, obj);
        }

        --this.addTypeCount;
        if (this.CanLoad) {
            this.Load();
        }
    }

    public RegisterEvent(eventId: string, type: TypeAny) {
        if (!this.allEvents.has(eventId)) {
            this.allEvents.set(eventId, new Set<IEvent>());
        }
        this.allEvents.get(eventId).add(new type());
    }

    public GetTypes(systemAttributeType: TypeAny) {
        if (!this.types.ContainsKey(systemAttributeType)) {
            return new Set<TypeAny>();
        }
        return this.types.GetSet(systemAttributeType);
    }

    public Remove(instanceId: number): void {
        this.allComponents.delete(instanceId);
    }

    /**
     * Get
     */
    public Get(id: number): Component {
        return this.allComponents.get(id);
    }

    /**
     * Deserialize
     */
    public Deserialize(component: Component): void {
        const type = component.constructor as TypeComponent;
        const iDeserializeSystems = this.deserializeSystems.GetSet(type);
        if (iDeserializeSystems == null) {
            return;
        }
        iDeserializeSystems.forEach((iDeserializeSystem) => {
            if (iDeserializeSystem != null) {
                try {
                    iDeserializeSystem.Run(Component);
                } catch (error) {
                    Log.Error(error);
                }
            }
        })
    }

    /**
     * Awake
     */
    public Awake<P1, P2, P3>(component: Component, p1?: P1, p2?: P2, p3?: P3): void {
        const type = component.constructor as TypeComponent;
        const iAwakeSystems = this.awakeSystems.GetSet(type);
        if (iAwakeSystems == null) {
            return;
        }
        iAwakeSystems.forEach((iAwakeSystem) => {
            if (iAwakeSystem != null) {
                try {
                    const aAwake = iAwakeSystem as AwakeSystem<Component, P1, P2, P3>;
                    aAwake.Run(component, p1, p2, p3);
                } catch (error) {
                    Log.Error(error);
                }
            }
        })
    }

    public Change(component: Component): void {
        const type = component.constructor as TypeComponent;
        const iChangeSystems = this.changeSystems.GetSet(type);
        if (iChangeSystems == null) {
            return;
        }
        iChangeSystems.forEach((iChangeSystem) => {
            if (iChangeSystem != null) {
                try {
                    iChangeSystem.Run(Component);
                } catch (error) {
                    Log.Error(error);
                }
            }
        })
    }

    public Load(): void {
        while (this.loaders.length > 0) {
            const instanceId = this.loaders.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }

            const iLoadSystems = this.loadSystems.GetSet(component.constructor as TypeComponent)
            if (!iLoadSystems) {
                continue;
            }

            this.loaders2.push(instanceId);

            iLoadSystems.forEach((iLoadSystem) => {
                try {
                    iLoadSystem.Run(component);
                }
                catch (error) {
                    Log.Error(error);
                }
            })
        }
        [this.loaders, this.loaders2] = [this.loaders2, this.loaders];
    }

    private Start(): void {
        while (this.starts.length > 0) {
            const instanceId = this.starts.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }
            const iStartSystems = this.startSystems.GetSet(component.constructor as TypeComponent);
            if (iStartSystems == null) {
                continue;
            }
            iStartSystems.forEach((iStartSystem) => {
                try {
                    iStartSystem.Run(component);
                } catch (error) {
                    Log.Error(error);
                }
            })
        }
    }

    public Destroy(component: Component): void {
        const type = component.constructor as TypeComponent;
        const iDestroySystems = this.destroySystems.GetSet(type);
        if (iDestroySystems == null) {
            return;
        }
        iDestroySystems.forEach((iDestroySystem) => {
            if (iDestroySystem != null) {
                try {
                    iDestroySystem.Run(Component);
                } catch (error) {
                    Log.Error(error);
                }
            }
        })
    }

    public Update(): void {

        this.Start();

        while (this.updates.length > 0) {
            const instanceId = this.updates.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }

            const iUpdateSystems = this.updateSystems.GetSet(component.constructor as TypeComponent)
            if (!iUpdateSystems) {
                continue;
            }

            this.updates2.push(instanceId);

            iUpdateSystems.forEach((iUpdateSystem) => {
                try {
                    iUpdateSystem.Run(component);
                }
                catch (error) {
                    Log.Error(error);
                }
            })
        }
        [this.updates, this.updates2] = [this.updates2, this.updates];
    }

    public LateUpdate(): void {
        while (this.lateUpdates.length > 0) {
            const instanceId = this.lateUpdates.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }

            const iLateUpdateSystems = this.lateUpdateSystems.GetSet(component.constructor as TypeComponent)
            if (!iLateUpdateSystems) {
                continue;
            }

            this.lateUpdates2.push(instanceId);

            iLateUpdateSystems.forEach((iLateUpdateSystem) => {
                try {
                    iLateUpdateSystem.Run(component);
                }
                catch (error) {
                    Log.Error(error);
                }
            })
        }
        [this.lateUpdates, this.lateUpdates2] = [this.lateUpdates2, this.lateUpdates];
    }

    public Run<A, B, C>(type: string, a?: A, b?: B, c?: C) {
        const iEvents = this.allEvents.get(type);
        if (!iEvents) {
            return;
        }
        iEvents.forEach((iEvent) => {
            try {
                iEvent.Handle(a, b, c);
            } catch (error) {
                Log.Error(error);
            }
        });
    }
}