"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../Base/Object/Entity");
class StartConfig extends Entity_1.Entity {
    constructor(id) {
        super(id);
    }
    set AppId(appId) {
        this.appId = appId;
    }
    get AppId() {
        return this.appId;
    }
    set AppType(appType) {
        this.appType = appType;
    }
    get AppType() {
        return this.appType;
    }
    set ServerIp(serverIp) {
        this.serverIp = serverIp;
    }
    get ServerIp() {
        return this.serverIp;
    }
}
exports.StartConfig = StartConfig;
//# sourceMappingURL=StartConfig.js.map