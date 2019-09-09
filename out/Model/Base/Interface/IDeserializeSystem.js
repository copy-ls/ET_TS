"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeserializeSystem {
    constructor(t) {
        this.type = t;
    }
    Type() {
        return this.type;
    }
    Run(o) {
        this.Deserialize(o);
    }
}
exports.DeserializeSystem = DeserializeSystem;
//# sourceMappingURL=IDeserializeSystem.js.map