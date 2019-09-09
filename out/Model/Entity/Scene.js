"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../Base/Object/Entity");
class Scene extends Entity_1.Entity {
    constructor(id) {
        super(id);
    }
    get Name() {
        return this.name;
    }
    set Name(vlaue) {
        this.name = vlaue;
    }
    Dispose() {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();
    }
}
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map