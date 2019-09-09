"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const UnOrderMultiMap_1 = require("../UnOrderMultiMap");
const IEvent_1 = require("../Interface/IEvent");
const IAwakeSystem_1 = require("../Interface/IAwakeSystem");
const IStartSystem_1 = require("../Interface/IStartSystem");
const IDestroySystem_1 = require("../Interface/IDestroySystem");
const ILoadSystem_1 = require("../Interface/ILoadSystem");
const IUpdateSystem_1 = require("../Interface/IUpdateSystem");
const ILateUpdateSystem_1 = require("../Interface/ILateUpdateSystem");
const IChangeSystem_1 = require("../Interface/IChangeSystem");
const IDeserializeSystem_1 = require("../Interface/IDeserializeSystem");
const ObjectSystemAttribute_1 = require("../Base/ObjectSystemAttribute");
const Log_1 = require("../Logger/Log");
class EventSystem {
    constructor() {
        this.allComponents = new Map();
        this.types = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.allEvents = new Map();
        this.awakeSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.startSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.destroySystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.loadSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.updateSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.lateUpdateSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.changeSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.deserializeSystems = new UnOrderMultiMap_1.UnOrderMultiMap();
        this.updates = new Array();
        this.updates2 = new Array();
        this.starts = new Array();
        this.loaders = new Array();
        this.loaders2 = new Array();
        this.lateUpdates = new Array();
        this.lateUpdates2 = new Array();
        this.addTypeCount = 0;
    }
    get CanLoad() {
        return this.addTypeCount === 0;
    }
    Add(component) {
        this.allComponents.set(component.InstanceId, component);
        const type = component.constructor;
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
    AddType(target, type, attributeType, eventId) {
        this.types.Add(attributeType, target);
        const obj = new target(type);
        if (attributeType === ObjectSystemAttribute_1.ObjectSystemAttribute) {
            if (obj instanceof IAwakeSystem_1.AwakeSystem) {
                this.awakeSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof IUpdateSystem_1.UpdateSystem) {
                this.updateSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof ILateUpdateSystem_1.LateUpdateSystem) {
                this.lateUpdateSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof IStartSystem_1.StartSystem) {
                this.startSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof IDestroySystem_1.DestroySystem) {
                this.destroySystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof ILoadSystem_1.LoadSystem) {
                this.loadSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof IChangeSystem_1.ChangeSystem) {
                this.changeSystems.Add(obj.Type(), obj);
            }
            else if (obj instanceof IDeserializeSystem_1.DeserializeSystem) {
                this.deserializeSystems.Add(obj.Type(), obj);
            }
        }
        if (eventId) {
            const obj = new target(type);
            if (!IEvent_1.AsIEvent(obj)) {
                Log_1.Log.Error(`${type.name} 没有继承IEvent`);
            }
            this.RegisterEvent(eventId, obj);
        }
        --this.addTypeCount;
        if (this.CanLoad) {
            this.Load();
        }
    }
    RegisterEvent(eventId, type) {
        if (!this.allEvents.has(eventId)) {
            this.allEvents.set(eventId, new Set());
        }
        this.allEvents.get(eventId).add(new type());
    }
    GetTypes(systemAttributeType) {
        if (!this.types.ContainsKey(systemAttributeType)) {
            return new Set();
        }
        return this.types.GetSet(systemAttributeType);
    }
    Remove(instanceId) {
        this.allComponents.delete(instanceId);
    }
    /**
     * Get
     */
    Get(id) {
        return this.allComponents.get(id);
    }
    /**
     * Deserialize
     */
    Deserialize(component) {
        const type = component.constructor;
        const iDeserializeSystems = this.deserializeSystems.GetSet(type);
        if (iDeserializeSystems == null) {
            return;
        }
        iDeserializeSystems.forEach((iDeserializeSystem) => {
            if (iDeserializeSystem != null) {
                try {
                    iDeserializeSystem.Run(Component_1.Component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            }
        });
    }
    /**
     * Awake
     */
    Awake(component, p1, p2, p3) {
        const type = component.constructor;
        const iAwakeSystems = this.awakeSystems.GetSet(type);
        if (iAwakeSystems == null) {
            return;
        }
        iAwakeSystems.forEach((iAwakeSystem) => {
            if (iAwakeSystem != null) {
                try {
                    const aAwake = iAwakeSystem;
                    aAwake.Run(component, p1, p2, p3);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            }
        });
    }
    Change(component) {
        const type = component.constructor;
        const iChangeSystems = this.changeSystems.GetSet(type);
        if (iChangeSystems == null) {
            return;
        }
        iChangeSystems.forEach((iChangeSystem) => {
            if (iChangeSystem != null) {
                try {
                    iChangeSystem.Run(Component_1.Component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            }
        });
    }
    Load() {
        while (this.loaders.length > 0) {
            const instanceId = this.loaders.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }
            const iLoadSystems = this.loadSystems.GetSet(component.constructor);
            if (!iLoadSystems) {
                continue;
            }
            this.loaders2.push(instanceId);
            iLoadSystems.forEach((iLoadSystem) => {
                try {
                    iLoadSystem.Run(component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            });
        }
        [this.loaders, this.loaders2] = [this.loaders2, this.loaders];
    }
    Start() {
        while (this.starts.length > 0) {
            const instanceId = this.starts.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }
            const iStartSystems = this.startSystems.GetSet(component.constructor);
            if (iStartSystems == null) {
                continue;
            }
            iStartSystems.forEach((iStartSystem) => {
                try {
                    iStartSystem.Run(component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            });
        }
    }
    Destroy(component) {
        const type = component.constructor;
        const iDestroySystems = this.destroySystems.GetSet(type);
        if (iDestroySystems == null) {
            return;
        }
        iDestroySystems.forEach((iDestroySystem) => {
            if (iDestroySystem != null) {
                try {
                    iDestroySystem.Run(Component_1.Component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            }
        });
    }
    Update() {
        this.Start();
        while (this.updates.length > 0) {
            const instanceId = this.updates.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }
            const iUpdateSystems = this.updateSystems.GetSet(component.constructor);
            if (!iUpdateSystems) {
                continue;
            }
            this.updates2.push(instanceId);
            iUpdateSystems.forEach((iUpdateSystem) => {
                try {
                    iUpdateSystem.Run(component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            });
        }
        [this.updates, this.updates2] = [this.updates2, this.updates];
    }
    LateUpdate() {
        while (this.lateUpdates.length > 0) {
            const instanceId = this.lateUpdates.unshift();
            const component = this.allComponents.get(instanceId);
            if (!component || component.IsDisposed) {
                continue;
            }
            const iLateUpdateSystems = this.lateUpdateSystems.GetSet(component.constructor);
            if (!iLateUpdateSystems) {
                continue;
            }
            this.lateUpdates2.push(instanceId);
            iLateUpdateSystems.forEach((iLateUpdateSystem) => {
                try {
                    iLateUpdateSystem.Run(component);
                }
                catch (error) {
                    Log_1.Log.Error(error);
                }
            });
        }
        [this.lateUpdates, this.lateUpdates2] = [this.lateUpdates2, this.lateUpdates];
    }
    Run(type, a, b, c) {
        const iEvents = this.allEvents.get(type);
        if (!iEvents) {
            return;
        }
        iEvents.forEach((iEvent) => {
            try {
                iEvent.Handle(a, b, c);
            }
            catch (error) {
                Log_1.Log.Error(error);
            }
        });
    }
}
exports.EventSystem = EventSystem;
//# sourceMappingURL=EventSystem.js.map