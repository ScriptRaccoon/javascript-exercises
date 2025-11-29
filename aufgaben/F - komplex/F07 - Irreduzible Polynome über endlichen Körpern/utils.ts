export function is_prime_number(n: number): boolean {
	if (!Number.isInteger(n) || n <= 1) return false
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false
	}
	return true
}

function get_smallest_prime_divisor(n: number): number | null {
	if (n === 1) return null
	for (let k = 2; k <= n; k++) {
		if (n % k === 0 && is_prime_number(k)) return k
	}
	return null
}

export function prime_divisors(n: number): Set<number> {
	const p = get_smallest_prime_divisor(n)
	if (p === null) return new Set()
	const divs = prime_divisors(n / p)
	divs.add(p)
	return divs
}

export function mod(x: number, p: number): number {
	return ((x % p) + p) % p
}

export function invert(a: number, p: number): number {
	for (let b = 1; b < p; b++) {
		if (mod(a * b, p) === 1) return b
	}
	throw new Error("No inverse found.")
}
