import { ILog } from "./ILog";
import { Log4jsAdapter } from "./Log4jsAdapter";
import { StartConfig } from "../../Component/Config/StartConfig";
import { Configuration, FileAppender, configure as Configure } from "log4js";
import log4jsConfig from "../../../Config/Log4js.json"

export class Log {
    private static readonly globalLog: ILog = new Log4jsAdapter();

    public static Trace(message: any, ...args: any[]): void {
        Log.globalLog.Trace(message, ...args);
    }

    public static Debug(message: any, ...args: any[]): void {
        Log.globalLog.Debug(message, ...args);
    }

    public static Info(message: any, ...args: any[]): void {
        Log.globalLog.Info(message, ...args);
    }

    public static Warning(message: any, ...args: any[]): void {
        Log.globalLog.Warning(message, ...args);
    }

    public static Error(message: any, ...args: any[]): void {
        Log.globalLog.Error(message, ...args);
    }

    public static Fatal(message: any, ...args: any[]): void {
        Log.globalLog.Fatal(message, ...args);
    }

    public static Msg(message: any, ...args: any[]): void {
        Log.globalLog.Debug(message, ...args);
    }
}

export class LogHelper {
    public static LoadConfig(startConfig: StartConfig) {
        const appenders = log4jsConfig.appenders;
        for (const key in appenders) {
            const appender: FileAppender = appenders[key] as FileAppender;
            if (appender.filename) {
                const filename = appender.filename.replace("*", startConfig.AppType.toString());
                appender.filename = filename;
            }
        }
        Configure(log4jsConfig as unknown as Configuration);
    }
}