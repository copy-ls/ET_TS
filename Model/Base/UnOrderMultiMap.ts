export class UnOrderMultiMap<T, K> {

    private readonly map: Map<T, Set<K>> = new Map<T, Set<K>>();
    private readonly queue: Array<Set<K>> = new Array<Set<K>>();

    public get Count(): number {
        return this.map.size;
    }

    public GetMap(): Map<T, Set<K>> {
        return this.map;
    }

    public Add(t: T, k: K): void {
        let set = this.map.get(t);
        if (set == null) {
            set = this.FetchSet();
            this.map.set(t, set);
        }
        set.add(k);
    }

    public First(): [T, Set<K>] {
        const array = Array.from(this.map.entries())
        return array[0];
    }

    public FetchSet(): Set<K> {
        if (this.queue.length > 0) {
            const set = this.queue.pop();
            set.clear()
            return set;
        }
        return new Set<K>();
    }

    private RecycleSet(set: Set<K>): void {
        if (this.queue.length > 100) {
            return;
        }
        set.clear();
        this.queue.push(set);
    }

    public Remove(t: T, k: K): boolean
    public Remove(t: T, ): boolean
    public Remove(): boolean {
        const t = arguments[0];
        const k = arguments[1];
        const set = this.map.get(t);
        if (k == null) {
            if (set == null) {
                return false;
            }
            if (!set.delete(k)) {
                return false;
            };
            if (set.size == 0) {
                this.RecycleSet(set);
                this.map.delete(t);
            }
            return true;
        } else {
            if (set != null) {
                this.RecycleSet(set);
            }
            return this.map.delete(t);
        }
    }

    public GetAll(t: T): K[] {
        const set = this.map.get(t);
        if (set == null) {
            return new Array<K>();
        }
        return Array.from(set.values());
    }

    public GetSet(t: T): Set<K> {
        return this.map.get(t);
    }

    public GetOne(t: T): K {
        const set = this.map.get(t);
        if (set != null && set.size > 0) {
            return Array.from(set.values())[0];
        }
        return null;
    }

    public Contains(t: T, k: K): boolean {
        const set = this.map.get(t);
        if (set == null) {
            return false;
        }
        return set.has(k);
    }

    public ContainsKey(t: T): boolean {
        return this.map.has(t);
    }

    clear(): void {
        this.map.forEach((set) => {
            this.RecycleSet(set);
        })
        this.map.clear();
    }
}