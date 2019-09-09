"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnOrderMultiMap {
    constructor() {
        this.map = new Map();
        this.queue = new Array();
    }
    get Count() {
        return this.map.size;
    }
    GetMap() {
        return this.map;
    }
    Add(t, k) {
        let set = this.map.get(t);
        if (set == null) {
            set = this.FetchSet();
            this.map.set(t, set);
        }
        set.add(k);
    }
    First() {
        const array = Array.from(this.map.entries());
        return array[0];
    }
    FetchSet() {
        if (this.queue.length > 0) {
            const set = this.queue.pop();
            set.clear();
            return set;
        }
        return new Set();
    }
    RecycleSet(set) {
        if (this.queue.length > 100) {
            return;
        }
        set.clear();
        this.queue.push(set);
    }
    Remove() {
        const t = arguments[0];
        const k = arguments[1];
        const set = this.map.get(t);
        if (k == null) {
            if (set == null) {
                return false;
            }
            if (!set.delete(k)) {
                return false;
            }
            ;
            if (set.size == 0) {
                this.RecycleSet(set);
                this.map.delete(t);
            }
            return true;
        }
        else {
            if (set != null) {
                this.RecycleSet(set);
            }
            return this.map.delete(t);
        }
    }
    GetAll(t) {
        const set = this.map.get(t);
        if (set == null) {
            return new Array();
        }
        return Array.from(set.values());
    }
    GetSet(t) {
        return this.map.get(t);
    }
    GetOne(t) {
        const set = this.map.get(t);
        if (set != null && set.size > 0) {
            return Array.from(set.values())[0];
        }
        return null;
    }
    Contains(t, k) {
        const set = this.map.get(t);
        if (set == null) {
            return false;
        }
        return set.has(k);
    }
    ContainsKey(t) {
        return this.map.has(t);
    }
    clear() {
        this.map.forEach((set) => {
            this.RecycleSet(set);
        });
        this.map.clear();
    }
}
exports.UnOrderMultiMap = UnOrderMultiMap;
//# sourceMappingURL=UnOrderMultiMap.js.map