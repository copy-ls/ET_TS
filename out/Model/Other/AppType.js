"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppType;
(function (AppType) {
    AppType[AppType["None"] = 0] = "None";
    AppType[AppType["Manager"] = 1] = "Manager";
    AppType[AppType["Realm"] = 2] = "Realm";
    AppType[AppType["Gate"] = 4] = "Gate";
    AppType[AppType["Http"] = 8] = "Http";
    AppType[AppType["DB"] = 16] = "DB";
    AppType[AppType["Location"] = 32] = "Location";
    AppType[AppType["Map"] = 64] = "Map";
    AppType[AppType["AllServer"] = 127] = "AllServer";
})(AppType = exports.AppType || (exports.AppType = {}));
class AppTypeHelper {
    static GetServerTypes() {
        const set = new Set([AppType.Manager, AppType.Realm, AppType.Gate]);
        return set;
    }
    /**
     * a Is b?
     * @param a
     * @param b
     */
    static Is(a, b) {
        if (typeof a === "string") {
            a = parseInt(AppType[a]);
        }
        if (typeof b === "string") {
            b = parseInt(AppType[b]);
        }
        if ((a & b) != 0) {
            return true;
        }
        return false;
    }
}
exports.AppTypeHelper = AppTypeHelper;
//# sourceMappingURL=AppType.js.map