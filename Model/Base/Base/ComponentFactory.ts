import { Component } from "../Object/Component";
import { Game } from "../../Entity/Game";
import { ComponentWithId } from "../Object/ComponentWithId";

export class ComponentFactory {

    public static instance: ComponentFactory;

    public static get Instance(): ComponentFactory {
        return ComponentFactory.instance || (ComponentFactory.instance = new ComponentFactory());
    }

    public CreateWithParent<T extends Component, A, B, C>(type: new () => T, parent: Component, fromPool = true, a?: A, b?: B, c?: C): T {
        let component: T;
        if (fromPool) {
            component = Game.ObjectPool.Fetch<T>(type);
        }
        else {
            component = new type();
        }

        Game.EventSystem.Add(component);

        component.Parent = parent;
        if (component instanceof ComponentWithId) {
            component.Id = component.InstanceId;
        }
        Game.EventSystem.Awake<A, B, C>(component, a, b, c);
        return component;
    }

    public Create<T extends Component, A, B, C>(type: new () => T, a?: A, b?: B, c?: C, fromPool = true): T {
        let component: T;
        if (fromPool) {
            component = Game.ObjectPool.Fetch<T>(type);
        }
        else {
            component = new type();
        }

        Game.EventSystem.Add(component);

        if (component instanceof ComponentWithId) {
            component.Id = component.InstanceId;
        }
        Game.EventSystem.Awake<A, B, C>(component, a, b, c);
        return component;
    }

    public CreateWithId<T extends ComponentWithId, A, B, C>(type: new () => T, id: number, a?: A, b?: B, c?: C, fromPool = true): T {
        let component: T;
        if (fromPool) {
            component = Game.ObjectPool.Fetch<T>(type);
        }
        else {
            component = new type();
        }

        Game.EventSystem.Add(component);

        component.Id = id;
        Game.EventSystem.Awake<A, B, C>(component, a, b, c);
        return component;
    }
}
