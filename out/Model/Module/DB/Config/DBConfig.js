"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConfigComponent_1 = require("../../../Component/Config/BaseConfigComponent");
class DBConfig extends BaseConfigComponent_1.BaseConfigComponent {
    constructor() {
        super();
    }
    get ConnectionString() {
        return this.connectionString;
    }
    set ConnectionString(value) {
        this.connectionString = value;
    }
    get DBName() {
        return this.dbName;
    }
    set DBName(value) {
        this.dbName = value;
    }
}
exports.DBConfig = DBConfig;
//# sourceMappingURL=DBConfig.js.map