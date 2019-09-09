"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Model/Entity/Game");
const OptionComponent_1 = require("../Model/Component/OptionComponent");
const StartConfigComponent_1 = require("../Model/Component/StartConfigComponent");
const AppType_1 = require("../Model/Other/AppType");
const Log_1 = require("../Model/Base/Logger/Log");
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = Game_1.Game.Scene.AddComponent(OptionComponent_1.OptionComponent, process.argv).options;
            const startConfigComponent = Game_1.Game.Scene.AddComponent(StartConfigComponent_1.StartConfigComponent, options.Config, options.AppId);
            const startConfig = startConfigComponent.StartConfig;
            if (!AppType_1.AppTypeHelper.Is(options.AppType, startConfig.AppType)) {
                Log_1.Log.Error("命令行参数apptype与配置不一致");
                return;
            }
            Log_1.LogHelper.LoadConfig(startConfig);
            while (true) {
                yield Sleep(1);
            }
        }
        catch (error) {
            Log_1.Log.Error(error, new Error().stack);
        }
    });
}
Main();
function Sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    });
}
//# sourceMappingURL=App.js.map