"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Entity/Game");
const ObjectSystemAttribute_1 = require("../Base/Base/ObjectSystemAttribute");
class DecorateManager {
    constructor() {
        this.configMap = new Map();
    }
    static get Instance() {
        return this.instance || (this.instance = new DecorateManager);
    }
    AddConfigMap(type) {
        this.configMap.set(type.name, type);
    }
    GetConfig(name) {
        return this.configMap.get(name);
    }
}
exports.DecorateManager = DecorateManager;
function Config(type) {
    DecorateManager.Instance.AddConfigMap(type);
}
exports.Config = Config;
function ObjectSystem(type) {
    return (target) => {
        Game_1.Game.EventSystem.AddType(target, type, ObjectSystemAttribute_1.ObjectSystemAttribute);
    };
}
exports.ObjectSystem = ObjectSystem;
//# sourceMappingURL=Decorators.js.map