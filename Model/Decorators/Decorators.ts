import { Game } from "../Entity/Game";
import { TypeComponent } from "../Base/Helper/Type";
import { ObjectSystemAttribute } from "../Base/Base/ObjectSystemAttribute";

export class DecorateManager {

    private static instance: DecorateManager;

    public static get Instance(): DecorateManager {
        return this.instance || (this.instance = new DecorateManager);
    }

    private configMap: Map<string, TypeComponent> = new Map<string, TypeComponent>();

    public AddConfigMap(type: TypeComponent) {
        this.configMap.set(type.name, type);
    }

    public GetConfig(name: string): TypeComponent {
        return this.configMap.get(name);
    }
}

export function Config(type: any) {
    DecorateManager.Instance.AddConfigMap(type as TypeComponent);
}

export function ObjectSystem(type: TypeComponent) {
    return (target: any) => {
        Game.EventSystem.AddType(target, type, ObjectSystemAttribute);
    };
}