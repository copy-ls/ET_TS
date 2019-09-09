import { AppType } from "../../Other/AppType";
import { Entity } from "../../Base/Object/Entity";

export class StartConfig extends Entity {

    public constructor(id?: number) {
        super(id);
    }

    private appId: number

    public set AppId(appId: number) {
        this.appId = appId;
    }

    public get AppId(): number {
        return this.appId;
    }

    private appType: AppType

    public set AppType(appType: AppType) {
        this.appType = appType;
    }

    public get AppType(): AppType {
        return this.appType;
    }

    private serverIp: string

    public set ServerIp(serverIp: string) {
        this.serverIp = serverIp;
    }

    public get ServerIp(): string {
        return this.serverIp;
    }
}