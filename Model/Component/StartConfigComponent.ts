import { Component } from "../Base/Object/Component";
import { StartConfig } from "./Config/StartConfig";
import { ConfigFromJson } from "../Helper/JsonHelper";
import { AwakeSystem } from "../Base/Interface/IAwakeSystem";
import { ObjectSystem } from "../Decorators/Decorators";
import { InnerConfig } from "../Module/Message/Config/InnerConfig";
import { AppTypeHelper, AppType } from "../Other/AppType";

export class StartConfigComponent extends Component {

    public constructor() {
        super();
    }

    private static instance: StartConfigComponent;

    public static get Instance(): StartConfigComponent {
        return StartConfigComponent.instance;
    }

    private configMap: Map<number, StartConfig>;

    private innerAddressMap: Map<number, string>;

    private startConfig: StartConfig;

    public get StartConfig(): StartConfig {
        return this.startConfig
    }

    private dbConfig: StartConfig;

    public get DBConfig(): StartConfig {
        return this.dbConfig
    }

    private realmConfig: StartConfig;

    public get RealmConfig(): StartConfig {
        return this.realmConfig
    }

    private locationConfig: StartConfig;

    public get LocationConfig(): StartConfig {
        return this.locationConfig
    }

    private mapConfigs: Set<StartConfig>;

    public get MapConfigs(): Set<StartConfig> {
        return this.mapConfigs;
    }

    private gateConfigs: Set<StartConfig>;

    public get GateConfigs(): Set<StartConfig> {
        return this.gateConfigs;
    }

    public Awake(path: string, appId: number) {
        StartConfigComponent.instance = this;

        this.innerAddressMap = new Map<number, string>()
        this.configMap = new Map<number, StartConfig>();
        this.mapConfigs = new Set<StartConfig>();
        this.gateConfigs = new Set<StartConfig>();

        const startConfigs: any[] = require(path);

        startConfigs.map((value) => {
            const startConfig = ConfigFromJson<StartConfig>(StartConfig, value);
            this.configMap.set(startConfig.AppId, startConfig);

            const innerConfig = startConfig.GetComponent(InnerConfig) as InnerConfig;
            const appType = startConfig.AppType;

            if (innerConfig != null) {
                this.innerAddressMap.set(startConfig.AppId, innerConfig.Address);
            }

            if (AppTypeHelper.Is(appType, AppType.Realm)) {
                this.realmConfig = startConfig;
            }

            if (AppTypeHelper.Is(appType, AppType.Location)) {
                this.locationConfig = startConfig;
            }

            if (AppTypeHelper.Is(appType, AppType.DB)) {
                this.dbConfig = startConfig;
            }

            if (AppTypeHelper.Is(appType, AppType.Map)) {
                this.MapConfigs.add(startConfig);
            }

            if (AppTypeHelper.Is(appType, AppType.Gate)) {
                this.GateConfigs.add(startConfig);
            }
        })

        this.startConfig = this.Get(appId);
    }

    public Get(appId: number): StartConfig {
        return this.configMap.get(appId);
    }

    public GetInnerAddress(id: number) {
        return this.innerAddressMap.get(id);
    }

    public GetAll(): StartConfig[] {
        return Array.from(this.configMap.values());
    }

    public get Count() {
        return this.configMap.size;
    }

    Dispose() {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();
        StartConfigComponent.instance = null;
    }
}

@ObjectSystem(StartConfigComponent)
export class StartConfigComponentSystem extends AwakeSystem<StartConfigComponent, string, number, null> {
    public Awake(self: StartConfigComponent, a: string, b: number) {
        self.Awake(a, b);
    }
}