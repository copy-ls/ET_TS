"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const IAwakeSystem_1 = require("../Base/Interface/IAwakeSystem");
const Component_1 = require("../Base/Object/Component");
const Options_1 = require("../Other/Options");
const AppType_1 = require("../Other/AppType");
const Decorators_1 = require("../Decorators/Decorators");
const path_1 = require("path");
class OptionComponent extends Component_1.Component {
    constructor() {
        super();
    }
    Awake(args) {
        this.options = new Options_1.Options();
        args.map((value) => {
            const appIdIdx = value.indexOf("--appId");
            if (appIdIdx > -1) {
                const appId = parseInt(value.split("=")[1]);
                if (!Number.isNaN(appId)) {
                    this.options.AppId = appId;
                }
            }
            const appTypeIdx = value.indexOf("--appType");
            if (appTypeIdx > -1) {
                const appType = AppType_1.AppType[value.split("=")[1]];
                if (appType != null) {
                    this.options.AppType = appType;
                }
            }
            const configIdx = value.indexOf("--config");
            if (configIdx > -1) {
                const config = value.split("=")[1];
                this.options.Config = path_1.join(process.cwd() + config);
            }
        });
    }
}
exports.OptionComponent = OptionComponent;
let OptionComponentSystem = class OptionComponentSystem extends IAwakeSystem_1.AwakeSystem {
    Awake(self, a) {
        self.Awake(a);
    }
};
OptionComponentSystem = __decorate([
    Decorators_1.ObjectSystem(OptionComponent)
], OptionComponentSystem);
exports.OptionComponentSystem = OptionComponentSystem;
//# sourceMappingURL=OptionComponent.js.map