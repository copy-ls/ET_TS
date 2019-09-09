
export enum AppType {
    None = 0,
    Manager = 1,
    Realm = 1 << 1,
    Gate = 1 << 2,
    Http = 1 << 3,
    DB = 1 << 4,
    Location = 1 << 5,
    Map = 1 << 6,

    AllServer = Manager | Realm | Gate | Http | DB | Location | Map,
}

export class AppTypeHelper {

    public static GetServerTypes(): Set<AppType> {
        const set = new Set<AppType>([AppType.Manager, AppType.Realm, AppType.Gate])
        return set;
    }

    /**
     * a Is b?
     * @param a 
     * @param b 
     */
    public static Is(a: any, b: any) {
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