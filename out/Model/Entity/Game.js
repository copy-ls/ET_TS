"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventSystem_1 = require("../Base/Object/EventSystem");
const Scene_1 = require("./Scene");
const ObjectPool_1 = require("../Base/Base/ObjectPool");
// import { TypeAny } from "../Base/Helper/Type";
class Game {
    static get Scene() {
        return this.scene || (this.scene = new Scene_1.Scene());
    }
    static get EventSystem() {
        return this.eventSystem || (this.eventSystem = new EventSystem_1.EventSystem());
    }
    static get ObjectPool() {
        return this.objectPool || (this.objectPool = new ObjectPool_1.ObjectPool);
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map