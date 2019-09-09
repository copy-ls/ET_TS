import { AwakeSystem } from "../Base/Interface/IAwakeSystem";
import { Component } from "../Base/Object/Component";
import { Options } from "../Other/Options";
import { AppType } from "../Other/AppType";
import { ObjectSystem } from "../Decorators/Decorators";
import { join as PathJoin } from "path";

export class OptionComponent extends Component {

    public constructor() {
        super();
    }

    public options: Options;

    public Awake(args: string[]) {
        this.options = new Options();

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
                const appType = AppType[value.split("=")[1]];
                if (appType != null) {
                    this.options.AppType = appType;
                }
            }

            const configIdx = value.indexOf("--config");
            if (configIdx > -1) {
                const config = value.split("=")[1];
                this.options.Config = PathJoin(process.cwd() + config);
            }
        })
    }
}

@ObjectSystem(OptionComponent)
export class OptionComponentSystem extends AwakeSystem<OptionComponent, string[], null, null> {
    public Awake(self: OptionComponent, a: string[]) {
        self.Awake(a);
    }
}