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

function apply_frobenius(f: Polynomial, p: number): Polynomial {
	if (f.length <= 1) return f
	const g: Polynomial = Array(p * (f.length - 1) + 1).fill(0)
	for (let i = 0; i < f.length; i++) {
		g[p * i] = f[i]
	}
	return g
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

function subtractX(f: Polynomial, p: number): void {
	if (f.length === 0) {
		f = [0, p - 1]
	} else if (f.length === 1) {
		f.push(p - 1)
	} else {
		f[1] = mod(f[1] - 1, p)
		cleanup(f, p)
	}
}

// rabin's test for irreducibility mod p
export function is_irreducible(f: Polynomial, p: number, primes?: Set<number>): boolean {
	cleanup(f, p)
	const n = f.length - 1

	if (n <= 0) return false
	if (n === 1) return true

	// polys[k] = X^(p^k) mod f
	const X: Polynomial = [0, 1]
	const polys: Polynomial[] = [X]

	for (let k = 1; k <= n; k++) {
		polys[k] = divmod(apply_frobenius(polys[k - 1], p), f, p)[1]
	}

	// polys[k] = X^(p^k) - X mod f
	for (let k = 0; k <= n; k++) {
		subtractX(polys[k], p)
	}

	primes ??= prime_divisors(n)
	for (const q of primes) {
		const g = gcd_poly(f, polys[n / q], p)
		if (g.length !== 1) return false
	}
	const h = gcd_poly(f, polys[n], p)
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
		if (is_irreducible(f, p, prime_divisors(n))) {
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
		if (is_irreducible(f, p, prime_divisors(n))) {
			yield f
		}
	}
}
