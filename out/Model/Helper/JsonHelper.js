"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConfig_1 = require("../Module/DB/Config/DBConfig");
const ClientConfig_1 = require("../Component/Config/ClientConfig");
const InnerConfig_1 = require("../Module/Message/Config/InnerConfig");
const OuterConfig_1 = require("../Module/Message/Config/OuterConfig");
const ConfigTypes = {
    [DBConfig_1.DBConfig.name]: DBConfig_1.DBConfig,
    [ClientConfig_1.ClientConfig.name]: ClientConfig_1.ClientConfig,
    [InnerConfig_1.InnerConfig.name]: InnerConfig_1.InnerConfig,
    [OuterConfig_1.OuterConfig.name]: OuterConfig_1.OuterConfig,
};
function ConfigFromJson(type, obj) {
    const t = new type(obj._id);
    for (const key in obj) {
        if (key in t) {
            t[key] = obj[key];
        }
        else if (key === "C") {
            obj[key].forEach(value => {
                const configType = ConfigTypes[value._t];
                if (configType) {
                    const t1 = new configType();
                    for (const key1 in value) {
                        if (key1 in t1) {
                            t1[key1] = value[key1];
                        }
                    }
                    t.AddComponent(t1);
                }
            });
        }
    }
    t.EndInit();
    return t;
}
exports.ConfigFromJson = ConfigFromJson;
//# sourceMappingURL=JsonHelper.js.map