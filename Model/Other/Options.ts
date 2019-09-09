import { AppType } from "./AppType";
import { join as PathJoin } from "path";

export class Options {

    private appId: number = 1;

    public set AppId(appId: number) {
        this.appId = appId;
    }

    public get AppId(): number {
        return this.appId;
    }

    private appType: AppType = AppType.Manager;

    public set AppType(appType: AppType) {
        this.appType = appType;
    }

    public get AppType(): AppType {
        return this.appType;
    }

    private config: string = PathJoin(process.cwd(), "/Config/LocalAllServer.json");

    public set Config(config: string) {
        this.config = config;
    }

    public get Config(): string {
        return this.config;
    }
}