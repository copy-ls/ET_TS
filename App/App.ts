import { Game } from "../Model/Entity/Game";
import { OptionComponent } from "../Model/Component/OptionComponent";
import { StartConfigComponent } from "../Model/Component/StartConfigComponent";
import { AppTypeHelper } from "../Model/Other/AppType";
import { Log, LogHelper } from "../Model/Base/Logger/Log";

async function Main() {
    try {
        const options = Game.Scene.AddComponent(OptionComponent, process.argv).options;
        const startConfigComponent = Game.Scene.AddComponent(StartConfigComponent, options.Config, options.AppId);
        const startConfig = startConfigComponent.StartConfig;
        if (!AppTypeHelper.Is(options.AppType, startConfig.AppType)) {
            Log.Error("命令行参数apptype与配置不一致");
            return;
        }
        LogHelper.LoadConfig(startConfig);

        while (true) {
            await Sleep(1);
        }
    } catch (error) {
        Log.Error(error, new Error().stack);
    }
}

Main();

async function Sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}
