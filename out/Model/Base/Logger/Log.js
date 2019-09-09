"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log4jsAdapter_1 = require("./Log4jsAdapter");
const log4js_1 = require("log4js");
const Log4js_json_1 = __importDefault(require("../../../Config/Log4js.json"));
class Log {
    static Trace(message, ...args) {
        Log.globalLog.Trace(message, ...args);
    }
    static Debug(message, ...args) {
        Log.globalLog.Debug(message, ...args);
    }
    static Info(message, ...args) {
        Log.globalLog.Info(message, ...args);
    }
    static Warning(message, ...args) {
        Log.globalLog.Warning(message, ...args);
    }
    static Error(message, ...args) {
        Log.globalLog.Error(message, ...args);
    }
    static Fatal(message, ...args) {
        Log.globalLog.Fatal(message, ...args);
    }
    static Msg(message, ...args) {
        Log.globalLog.Debug(message, ...args);
    }
}
Log.globalLog = new Log4jsAdapter_1.Log4jsAdapter();
exports.Log = Log;
class LogHelper {
    static LoadConfig(startConfig) {
        const appenders = Log4js_json_1.default.appenders;
        for (const key in appenders) {
            const appender = appenders[key];
            if (appender.filename) {
                const filename = appender.filename.replace("*", startConfig.AppType.toString());
                appender.filename = filename;
            }
        }
        log4js_1.configure(Log4js_json_1.default);
    }
}
exports.LogHelper = LogHelper;
//# sourceMappingURL=Log.js.map