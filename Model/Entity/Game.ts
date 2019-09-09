import { EventSystem } from "../Base/Object/EventSystem";
import { Scene } from "./Scene";
import { ObjectPool } from "../Base/Base/ObjectPool";
// import { TypeAny } from "../Base/Helper/Type";

export class Game {
    private static scene: Scene;

    public static get Scene(): Scene {
        return this.scene || (this.scene = new Scene());
    }

    private static eventSystem: EventSystem;

    public static get EventSystem(): EventSystem {
        return this.eventSystem || (this.eventSystem = new EventSystem())
    }

    private static objectPool: ObjectPool;

    public static get ObjectPool(): ObjectPool {
        return this.objectPool || (this.objectPool = new ObjectPool);
    }

    // public static AddObjectSystem(type: TypeAny) {
    //     this.EventSystem.AddType(type);
    // }
}