export function groupBy<T, TKey>(source: T[], getKey: (t: T) => TKey) {
    const map = source.reduce(
        (map, t) => map.set(getKey(t), [...(map.get(getKey(t)) ?? []), t]),
        new Map<TKey, T[]>());
    return Array.from(map.entries())
        .map(e => { return { key: e[0], value: e[1] }; })
}