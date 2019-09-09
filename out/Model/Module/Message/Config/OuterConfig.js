"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConfigComponent_1 = require("../../../Component/Config/BaseConfigComponent");
class OuterConfig extends BaseConfigComponent_1.BaseConfigComponent {
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
    get Address2() {
        return this.address2;
    }
    set Address2(value) {
        this.address2 = value;
    }
    get Port2() {
        return this.port2;
    }
    set Port2(value) {
        this.port2 = value;
    }
}
exports.OuterConfig = OuterConfig;
//# sourceMappingURL=OuterConfig.js.map