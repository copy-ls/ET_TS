export declare class UnOrderMultiMap<T, K> {
    private readonly map;
    private readonly queue;
    readonly Count: number;
    GetMap(): Map<T, Set<K>>;
    Add(t: T, k: K): void;
    First(): [T, Set<K>];
    FetchSet(): Set<K>;
    private RecycleSet;
    Remove(t: T, k: K): boolean;
    Remove(t: T): boolean;
    GetAll(t: T): K[];
    GetSet(t: T): Set<K>;
    GetOne(t: T): K;
    Contains(t: T, k: K): boolean;
    ContainsKey(t: T): boolean;
    clear(): void;
}
