"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../Base/Object/Component");
const StartConfig_1 = require("./Config/StartConfig");
const JsonHelper_1 = require("../Helper/JsonHelper");
const IAwakeSystem_1 = require("../Base/Interface/IAwakeSystem");
const Decorators_1 = require("../Decorators/Decorators");
const InnerConfig_1 = require("../Module/Message/Config/InnerConfig");
const AppType_1 = require("../Other/AppType");
class StartConfigComponent extends Component_1.Component {
    constructor() {
        super();
    }
    static get Instance() {
        return StartConfigComponent.instance;
    }
    get StartConfig() {
        return this.startConfig;
    }
    get DBConfig() {
        return this.dbConfig;
    }
    get RealmConfig() {
        return this.realmConfig;
    }
    get LocationConfig() {
        return this.locationConfig;
    }
    get MapConfigs() {
        return this.mapConfigs;
    }
    get GateConfigs() {
        return this.gateConfigs;
    }
    Awake(path, appId) {
        StartConfigComponent.instance = this;
        this.innerAddressMap = new Map();
        this.configMap = new Map();
        this.mapConfigs = new Set();
        this.gateConfigs = new Set();
        const startConfigs = require(path);
        startConfigs.map((value) => {
            const startConfig = JsonHelper_1.ConfigFromJson(StartConfig_1.StartConfig, value);
            this.configMap.set(startConfig.AppId, startConfig);
            const innerConfig = startConfig.GetComponent(InnerConfig_1.InnerConfig);
            const appType = startConfig.AppType;
            if (innerConfig != null) {
                this.innerAddressMap.set(startConfig.AppId, innerConfig.Address);
            }
            if (AppType_1.AppTypeHelper.Is(appType, AppType_1.AppType.Realm)) {
                this.realmConfig = startConfig;
            }
            if (AppType_1.AppTypeHelper.Is(appType, AppType_1.AppType.Location)) {
                this.locationConfig = startConfig;
            }
            if (AppType_1.AppTypeHelper.Is(appType, AppType_1.AppType.DB)) {
                this.dbConfig = startConfig;
            }
            if (AppType_1.AppTypeHelper.Is(appType, AppType_1.AppType.Map)) {
                this.MapConfigs.add(startConfig);
            }
            if (AppType_1.AppTypeHelper.Is(appType, AppType_1.AppType.Gate)) {
                this.GateConfigs.add(startConfig);
            }
        });
        this.startConfig = this.Get(appId);
    }
    Get(appId) {
        return this.configMap.get(appId);
    }
    GetInnerAddress(id) {
        return this.innerAddressMap.get(id);
    }
    GetAll() {
        return Array.from(this.configMap.values());
    }
    get Count() {
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
exports.StartConfigComponent = StartConfigComponent;
let StartConfigComponentSystem = class StartConfigComponentSystem extends IAwakeSystem_1.AwakeSystem {
    Awake(self, a, b) {
        self.Awake(a, b);
    }
};
StartConfigComponentSystem = __decorate([
    Decorators_1.ObjectSystem(StartConfigComponent)
], StartConfigComponentSystem);
exports.StartConfigComponentSystem = StartConfigComponentSystem;
//# sourceMappingURL=StartConfigComponent.js.map