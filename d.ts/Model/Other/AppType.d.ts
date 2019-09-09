export declare enum AppType {
    None = 0,
    Manager = 1,
    Realm = 2,
    Gate = 4,
    Http = 8,
    DB = 16,
    Location = 32,
    Map = 64,
    AllServer = 127
}
export declare class AppTypeHelper {
    static GetServerTypes(): Set<AppType>;
    /**
     * a Is b?
     * @param a
     * @param b
     */
    static Is(a: any, b: any): boolean;
}
