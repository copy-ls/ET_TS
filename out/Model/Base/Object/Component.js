"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Object_1 = require("../Base/Object");
const IdGenerator_1 = require("../Helper/IdGenerator");
const Game_1 = require("../../Entity/Game");
class Component extends Object_1.ETObject {
    constructor() {
        super();
        this.instanceId = 0;
        this.isFromPool = false;
        this.instanceId = IdGenerator_1.IdGenerator.GenerateInstanceId();
    }
    get InstanceId() {
        return this.instanceId;
    }
    get IsFromPool() {
        return this.isFromPool;
    }
    set IsFromPool(value) {
        this.isFromPool = value;
        if (!this.isFromPool) {
            return;
        }
        if (this.InstanceId === 0) {
            this.instanceId = IdGenerator_1.IdGenerator.GenerateInstanceId();
        }
    }
    get Parent() {
        return this.parent;
    }
    set Parent(value) {
        this.parent = value;
    }
    Entity() {
        return this.Parent;
    }
    get IsDisposed() {
        return this.InstanceId == 0;
    }
    GetParent() {
        return this.parent;
    }
    Dispose() {
        if (this.IsDisposed) {
            return;
        }
        Game_1.Game.EventSystem.Destroy(this);
        Game_1.Game.EventSystem.Remove(this.InstanceId);
        this.instanceId = 0;
        if (this.IsFromPool) {
            Game_1.Game.ObjectPool.Recycle(this);
        }
    }
    //TODO EndInit
    EndInit() {
    }
    //TODO Tostring
    ToString() {
        return "";
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map