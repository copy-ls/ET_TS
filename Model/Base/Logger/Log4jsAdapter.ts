import { getLogger, Logger } from "log4js";
import { ILog } from "./ILog";

export class Log4jsAdapter implements ILog {

    private readonly traceLogger: Logger = getLogger("trace");
    private readonly debugLogger: Logger = getLogger("debug");
    private readonly infoLogger: Logger = getLogger("info");
    private readonly warningLogger: Logger = getLogger("warning");
    private readonly errorLogger: Logger = getLogger("error");
    private readonly fatalLogger: Logger = getLogger("fatal");

    public Trace(message: any, ...args: any[]): void {
        this.traceLogger.trace(message, ...args);
    }

    public Debug(message: any, ...args: any[]): void {
        this.debugLogger.debug(message, ...args);
    }

    public Info(message: any, ...args: any[]): void {
        this.infoLogger.info(message, ...args);
    }

    public Warning(message: any, ...args: any[]): void {
        this.warningLogger.warn(message, ...args);
    }

    public Error(message: any, ...args: any[]): void {
        this.errorLogger.error(message, ...args);
    }

    public Fatal(message: any, ...args: any[]): void {
        this.fatalLogger.fatal(message, ...args);
    }
}