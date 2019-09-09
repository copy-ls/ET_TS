"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConfigComponent_1 = require("./BaseConfigComponent");
class ClientConfig extends BaseConfigComponent_1.BaseConfigComponent {
    constructor() {
        super();
    }
    get Address() {
        return this.address;
    }
    set Address(value) {
        this.address = value;
    }
    get Port() {
        return this.port;
    }
    set Port(value) {
        this.port = value;
    }
}
exports.ClientConfig = ClientConfig;
//# sourceMappingURL=ClientConfig.js.map