import { invert, is_prime_number, mod, prime_divisors } from "./utils"

type Polynomial = number[]

function cleanup(f: Polynomial, p: number): void {
	while (f.length >= 0 && mod(f[f.length - 1], p) === 0) f.pop()
}

export function stringify_poly(f: Polynomial): string {
	const n = f.length

	if (n === 0) {
		return "0"
	}

	if (n === 1) {
		return `${f[0]}`
	}

	let str = ""

	for (let i = n - 1; i >= 0; i--) {
		const c = f[i]
		if (c === 0) continue

		let power = ""
		if (i === 1) power = "X"
		else if (i > 1) power = `X^${i}`

		const op = c > 0 ? "+" : "-"
		const coeff = Math.abs(c) === 1 && i > 0 ? "" : `${Math.abs(c)}`
		let mon = `${op} ${coeff}${power} `

		if (i === n - 1) {
			const sign = c > 0 ? "" : "-"
			mon = `${sign}${coeff}${power} `
		}

		str += mon
	}

	return str.trim()
}

function structural_equal(f: Polynomial, g: Polynomial) {
	return f.length === g.length && f.every((_, i) => f[i] === g[i])
}

// polynomial division:
// computes q,r with f = gq + r with deg(r) < deg(g).
function divmod(f: Polynomial, g: Polynomial, p: number): [Polynomial, Polynomial] {
	if (g.length === 0) throw new Error("Polynomial must be non-zero.")

	const r: Polynomial = [...f]
	const q: Polynomial = Array(f.length).fill(0)

	const g_lead = g[g.length - 1]
	const g_lead_inv = invert(g_lead, p)

	while (r.length >= g.length) {
		const r_lead = r[r.length - 1]
		const d = r.length - g.length
		const c = mod(r_lead * g_lead_inv, p)
		q[d] = c
		for (let i = d; i < r.length; i++) {
			r[i] = mod(r[i] - c * g[i - d], p)
		}
		cleanup(r, p)
	}

	cleanup(q, p)

	return [q, r]
}

function gcd_poly(f: Polynomial, g: Polynomial, p: number): Polynomial {
	if (g.length === 0) return f
	const [, r] = divmod(f, g, p)
	return gcd_poly(g, r, p)
}

// rabin's test for irreducibility mod p
export function is_irreducible(f: Polynomial, p: number): boolean {
	cleanup(f, p)

	if (f.length <= 1) return false

	function test_poly(k: number): Polynomial {
		const g = Array(p ** k + 1).fill(0)
		g[p ** k] = 1
		g[1] = p - 1
		return g
	}

	const n = f.length - 1
	const primes = prime_divisors(n)
	for (const q of primes) {
		const g = gcd_poly(f, test_poly(n / q), p)
		if (g.length !== 1) return false
	}
	const h = gcd_poly(f, test_poly(n), p)
	return structural_equal(h, f)
}

// iterates through all n-tuples mod p lexicographically
function* iterate_tuples(n: number, p: number) {
	const current = Array(n).fill(0)
	while (true) {
		yield [...current]
		let i = 0
		while (i < n) {
			current[i]++
			if (current[i] < p) break
			current[i] = 0
			i++
		}
		if (i === n) return
	}
}

// returns a monic irreducible polynomial of degree n mod p,
// the lexicographically first one
export function get_monic_irreducible(n: number, p: number): Polynomial | null {
	if (!is_prime_number(p)) throw new Error("p must be a prime")
	if (!(Number.isInteger(n) && n >= 1))
		throw new Error("Degree must be positive integer")

	for (const t of iterate_tuples(n, p)) {
		const f: Polynomial = [...t, 1]
		if (is_irreducible(f, p)) {
			return f
		}
	}

	return null
}

// yields all monic irreducible polynomial of degree n mod p
export function* get_monic_irreducibles(
	n: number,
	p: number,
): IterableIterator<Polynomial> {
	if (!is_prime_number(p)) throw new Error("p must be a prime")
	if (!(Number.isInteger(n) && n >= 1))
		throw new Error("Degree must be positive integer")

	for (const t of iterate_tuples(n, p)) {
		const f: Polynomial = [...t, 1]
		if (is_irreducible(f, p)) {
			yield f
		}
	}
}
