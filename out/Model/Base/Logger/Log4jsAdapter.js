"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
class Log4jsAdapter {
    constructor() {
        this.traceLogger = log4js_1.getLogger("trace");
        this.debugLogger = log4js_1.getLogger("debug");
        this.infoLogger = log4js_1.getLogger("info");
        this.warningLogger = log4js_1.getLogger("warning");
        this.errorLogger = log4js_1.getLogger("error");
        this.fatalLogger = log4js_1.getLogger("fatal");
    }
    Trace(message, ...args) {
        this.traceLogger.trace(message, ...args);
    }
    Debug(message, ...args) {
        this.debugLogger.debug(message, ...args);
    }
    Info(message, ...args) {
        this.infoLogger.info(message, ...args);
    }
    Warning(message, ...args) {
        this.warningLogger.warn(message, ...args);
    }
    Error(message, ...args) {
        this.errorLogger.error(message, ...args);
    }
    Fatal(message, ...args) {
        this.fatalLogger.fatal(message, ...args);
    }
}
exports.Log4jsAdapter = Log4jsAdapter;
//# sourceMappingURL=Log4jsAdapter.js.map