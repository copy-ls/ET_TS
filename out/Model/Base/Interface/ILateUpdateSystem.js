"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LateUpdateSystem {
    constructor(t) {
        this.type = t;
    }
    Type() {
        return this.type;
    }
    Run(o) {
        this.LateUpdate(o);
    }
}
exports.LateUpdateSystem = LateUpdateSystem;
//# sourceMappingURL=ILateUpdateSystem.js.map