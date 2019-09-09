export declare class IdGenerator {
    private static instanceIdGenerator;
    private static appId;
    static AppId: number;
    private static value;
    static GenerateId(): number;
    static GenerateInstanceId(): number;
    static GetAppId(value: number): number;
}
