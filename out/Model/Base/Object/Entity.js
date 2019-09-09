"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentWithId_1 = require("./ComponentWithId");
const Component_1 = require("./Component");
const ISerializeToEntity_1 = require("../Interface/ISerializeToEntity");
const ComponentFactory_1 = require("../Base/ComponentFactory");
const Log_1 = require("../Logger/Log");
class Entity extends ComponentWithId_1.ComponentWithId {
    constructor(id) {
        super(id);
        this.components = new Set();
        this.componentMap = new Map();
    }
    Dispose() {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();
        this.components.forEach((component) => {
            try {
                component.Dispose();
            }
            catch (error) {
                Log_1.Log.Error(error);
            }
        });
        this.componentMap.forEach((component) => {
            try {
                component.Dispose();
            }
            catch (error) {
                Log_1.Log.Error(error);
            }
        });
        this.components.clear();
        this.componentMap.clear();
    }
    AddComponent() {
        const arg1 = arguments[0];
        let type;
        if (arg1 instanceof Component_1.Component) {
            type = arg1.constructor;
            if (this.componentMap.has(type)) {
                Log_1.Log.Error(`AddComponent, component already exist, id: ${this.Id}, component: ${type.name}`);
                return;
            }
            const component = arg1;
            component.Parent = this;
            this.componentMap.set(type, component);
            if (ISerializeToEntity_1.InstanceOfISerializeToEntity(component)) {
                this.components.add(component);
            }
            return component;
        }
        else {
            type = arg1;
            if (this.componentMap.has(type)) {
                Log_1.Log.Error(`AddComponent, component already exist, id: ${this.Id}, component: ${type.name}`);
                return;
            }
            const p1 = arguments[1];
            const p2 = arguments[2];
            const p3 = arguments[3];
            const component = ComponentFactory_1.ComponentFactory.Instance.CreateWithParent(type, this, this.IsFromPool, p1, p2, p3);
            this.componentMap.set(type, component);
            if (ISerializeToEntity_1.InstanceOfISerializeToEntity(component)) {
                this.components.add(component);
            }
            return component;
        }
    }
    RemoveComponent(type) {
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
    GetComponent(type) {
        return this.componentMap.get(type);
    }
    GetComponents() {
        return Array.from(this.componentMap.values());
    }
    EndInit() {
        try {
            super.EndInit();
            this.componentMap.clear();
            if (this.components != null) {
                this.components.forEach((component) => {
                    component.Parent = this;
                    this.componentMap.set(component.constructor, component);
                });
            }
        }
        catch (error) {
            Log_1.Log.Error(error);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map