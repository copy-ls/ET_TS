import { Component } from "../Base/Object/Component";
import { StartConfig } from "./Config/StartConfig";
import { AwakeSystem } from "../Base/Interface/IAwakeSystem";
export declare class StartConfigComponent extends Component {
    constructor();
    private static instance;
    static readonly Instance: StartConfigComponent;
    private configMap;
    private innerAddressMap;
    private startConfig;
    readonly StartConfig: StartConfig;
    private dbConfig;
    readonly DBConfig: StartConfig;
    private realmConfig;
    readonly RealmConfig: StartConfig;
    private locationConfig;
    readonly LocationConfig: StartConfig;
    private mapConfigs;
    readonly MapConfigs: Set<StartConfig>;
    private gateConfigs;
    readonly GateConfigs: Set<StartConfig>;
    Awake(path: string, appId: number): void;
    Get(appId: number): StartConfig;
    GetInnerAddress(id: number): string;
    GetAll(): StartConfig[];
    readonly Count: number;
    Dispose(): void;
}
export declare class StartConfigComponentSystem extends AwakeSystem<StartConfigComponent, string, number, null> {
    Awake(self: StartConfigComponent, a: string, b: number): void;
}
