import { Entity } from "../Base/Object/Entity";
import { DBConfig } from "../Module/DB/Config/DBConfig";
import { ClientConfig } from "../Component/Config/ClientConfig";
import { InnerConfig } from "../Module/Message/Config/InnerConfig";
import { OuterConfig } from "../Module/Message/Config/OuterConfig";
const ConfigTypes = {
    [DBConfig.name]: DBConfig,
    [ClientConfig.name]: ClientConfig,
    [InnerConfig.name]: InnerConfig,
    [OuterConfig.name]: OuterConfig,
}

export function ConfigFromJson<T extends Entity>(type: new (id?: number) => T, obj: any): T {
    const t = new type(obj._id);
    for (const key in obj) {
        if (key in t) {
            t[key] = obj[key]
        }
        else if (key === "C") {
            obj[key].forEach(value => {
                const configType = ConfigTypes[value._t];
                if (configType) {
                    const t1 = new configType();
                    for (const key1 in value) {
                        if (key1 in t1) {
                            t1[key1] = value[key1]
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