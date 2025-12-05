/**
 * Returns the minimal element excluded from the array.
 */
export function mex(arr: number[]): number {
	let res = 0
	while (arr.includes(res)) res++
	return res
}

/**
 * Creates an LRU (last recently used) cache with bounded size.
 */
export function create_lru_cache<K, V>(max_size: number, prune_size: number = 1) {
	const cache = new Map<K, V>()

	function get(key: K): undefined | V {
		const val = cache.get(key)
		if (val === undefined) return

		cache.delete(key)
		cache.set(key, val)
		return val
	}

	function set(key: K, val: V) {
		if (cache.size >= max_size) {
			let i = 0
			for (const k of cache.keys()) {
				cache.delete(k)
				i++
				if (i >= prune_size) break
			}
		}

		cache.set(key, val)
	}

	function size() {
		return cache.size
	}

	return { get, set, size }
}
