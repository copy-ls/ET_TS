"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdGenerator {
    static set AppId(value) {
        this.appId = value;
        this.instanceIdGenerator = this.appId << 48;
    }
    static GenerateId() {
        const time = Date.now();
        return (this.appId << 48) + (time << 16) + (++this.value);
    }
    static GenerateInstanceId() {
        return ++this.instanceIdGenerator;
    }
    static GetAppId(value) {
        return value >> 48;
    }
}
IdGenerator.instanceIdGenerator = 0;
IdGenerator.appId = 0;
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map