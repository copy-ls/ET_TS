import { EventSystem } from "../Base/Object/EventSystem";
import { Scene } from "./Scene";
import { ObjectPool } from "../Base/Base/ObjectPool";
export declare class Game {
    private static scene;
    static readonly Scene: Scene;
    private static eventSystem;
    static readonly EventSystem: EventSystem;
    private static objectPool;
    static readonly ObjectPool: ObjectPool;
}
