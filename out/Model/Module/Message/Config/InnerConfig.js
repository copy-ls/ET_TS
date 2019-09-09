"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConfigComponent_1 = require("../../../Component/Config/BaseConfigComponent");
class InnerConfig extends BaseConfigComponent_1.BaseConfigComponent {
    constructor() {
        super();
    }
    get Address() {
        return this.address;
    }
    set Address(value) {
        this.address = value;
    }
    set Host(value) {
        this.host = value;
    }
    get Host() {
        return this.host;
    }
    get Port() {
        return this.port;
    }
    set Port(value) {
        this.port = value;
    }
}
exports.InnerConfig = InnerConfig;
//# sourceMappingURL=InnerConfig.js.map