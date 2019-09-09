import { AppType } from "../../Other/AppType";
import { Entity } from "../../Base/Object/Entity";
export declare class StartConfig extends Entity {
    constructor(id?: number);
    private appId;
    AppId: number;
    private appType;
    AppType: AppType;
    private serverIp;
    ServerIp: string;
}
