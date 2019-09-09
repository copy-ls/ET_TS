"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class ComponentWithId extends Component_1.Component {
    constructor(id) {
        super();
        if (id != null) {
            this.Id = id;
            return;
        }
        this.Id = this.InstanceId;
    }
    ;
    get Id() {
        return this.id;
    }
    set Id(value) {
        this.id = value;
    }
    Dispose() {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();
    }
}
exports.ComponentWithId = ComponentWithId;
//# sourceMappingURL=ComponentWithId.js.map