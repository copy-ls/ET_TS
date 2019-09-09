"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppType_1 = require("./AppType");
const path_1 = require("path");
class Options {
    constructor() {
        this.appId = 1;
        this.appType = AppType_1.AppType.Manager;
        this.config = path_1.join(process.cwd(), "/Config/LocalAllServer.json");
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
    set Config(config) {
        this.config = config;
    }
    get Config() {
        return this.config;
    }
}
exports.Options = Options;
//# sourceMappingURL=Options.js.map