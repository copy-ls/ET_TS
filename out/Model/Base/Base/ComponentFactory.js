"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../../Entity/Game");
const ComponentWithId_1 = require("../Object/ComponentWithId");
class ComponentFactory {
    static get Instance() {
        return ComponentFactory.instance || (ComponentFactory.instance = new ComponentFactory());
    }
    CreateWithParent(type, parent, fromPool = true, a, b, c) {
        let component;
        if (fromPool) {
            component = Game_1.Game.ObjectPool.Fetch(type);
        }
        else {
            component = new type();
        }
        Game_1.Game.EventSystem.Add(component);
        component.Parent = parent;
        if (component instanceof ComponentWithId_1.ComponentWithId) {
            component.Id = component.InstanceId;
        }
        Game_1.Game.EventSystem.Awake(component, a, b, c);
        return component;
    }
    Create(type, a, b, c, fromPool = true) {
        let component;
        if (fromPool) {
            component = Game_1.Game.ObjectPool.Fetch(type);
        }
        else {
            component = new type();
        }
        Game_1.Game.EventSystem.Add(component);
        if (component instanceof ComponentWithId_1.ComponentWithId) {
            component.Id = component.InstanceId;
        }
        Game_1.Game.EventSystem.Awake(component, a, b, c);
        return component;
    }
    CreateWithId(type, id, a, b, c, fromPool = true) {
        let component;
        if (fromPool) {
            component = Game_1.Game.ObjectPool.Fetch(type);
        }
        else {
            component = new type();
        }
        Game_1.Game.EventSystem.Add(component);
        component.Id = id;
        Game_1.Game.EventSystem.Awake(component, a, b, c);
        return component;
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=ComponentFactory.js.map