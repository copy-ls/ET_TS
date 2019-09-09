import { StartConfig } from "../../Component/Config/StartConfig";
export declare class Log {
    private static readonly globalLog;
    static Trace(message: any, ...args: any[]): void;
    static Debug(message: any, ...args: any[]): void;
    static Info(message: any, ...args: any[]): void;
    static Warning(message: any, ...args: any[]): void;
    static Error(message: any, ...args: any[]): void;
    static Fatal(message: any, ...args: any[]): void;
    static Msg(message: any, ...args: any[]): void;
}
export declare class LogHelper {
    static LoadConfig(startConfig: StartConfig): void;
}
