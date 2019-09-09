import { ILog } from "./ILog";
export declare class Log4jsAdapter implements ILog {
    private readonly traceLogger;
    private readonly debugLogger;
    private readonly infoLogger;
    private readonly warningLogger;
    private readonly errorLogger;
    private readonly fatalLogger;
    Trace(message: any, ...args: any[]): void;
    Debug(message: any, ...args: any[]): void;
    Info(message: any, ...args: any[]): void;
    Warning(message: any, ...args: any[]): void;
    Error(message: any, ...args: any[]): void;
    Fatal(message: any, ...args: any[]): void;
}
