export class IdGenerator {

    private static instanceIdGenerator: number = 0;

    private static appId: number = 0;

    public static set AppId(value: number) {
        this.appId = value;
        this.instanceIdGenerator = this.appId << 48;
    }

    private static value: number;

    public static GenerateId(): number {
        const time: number = Date.now();
        return (this.appId << 48) + (time << 16) + (++this.value);
    }

    public static GenerateInstanceId(): number {
        return ++this.instanceIdGenerator;
    }

    public static GetAppId(value: number): number {
        return value >> 48;
    }
}