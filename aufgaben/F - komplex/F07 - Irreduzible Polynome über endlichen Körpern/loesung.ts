import { invert, is_prime_number, mod, prime_divisors } from "./utils"

/**
 * We encode polynomials by arrays of numbers:
 * a_0 + a_1 X + a_2 X^2 + ... by [ a_0, a_1, a_2, ...].
 */
type Polynomial = number[]

/**
 * Removes the zero coefficients in the end (mod p).
 */
function cleanup(f: Polynomial, p: number): void {
	while (f.length >= 0 && mod(f[f.length - 1], p) === 0) f.pop()
}

/**
 * Transforms a polynomial to a readable string.
 * e.g. [1,0,2] ---> 2X^2 + 1.
 */
export function stringify_poly(f: Polynomial): string {
	const n = f.length

	if (n === 0) return "0"

	const monomials: string[] = []

	for (let i = n - 1; i >= 0; i--) {
		const c = f[i]
		if (c === 0) continue
		const coeff = c === 1 ? "" : c
		const monomial = i === 0 ? `${c}` : i === 1 ? `${coeff}X` : `${coeff}X^${i}`
		monomials.push(monomial)
	}

	return monomials.join(" + ")
}

/**
 * Checks if two polynomials have the same coefficients.
 */
function structural_equal(f: Polynomial, g: Polynomial) {
	return f.length === g.length && f.every((_, i) => f[i] === g[i])
}

/**
 * Maps a polynomial f(X) to f(X^p) for a prime p.
 */
function apply_frobenius(f: Polynomial, p: number): Polynomial {
	if (f.length <= 1) return f
	const g: Polynomial = Array(p * (f.length - 1) + 1).fill(0)
	for (let i = 0; i < f.length; i++) {
		g[p * i] = f[i]
	}
	return g
}

/**
 * Applies polynomial long division modulo a prime p. For two polynomials
 * f,g (where g is non-zero), returns two polynomials q,r such that
 * f = q * g + r and deg(r) < deg(f).
 * Directy manipulates the coefficients for performance reasons.
 */
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

/**
 * Computes the greatest common divisor of two polynomials mod p.
 */
function gcd_poly(f: Polynomial, g: Polynomial, p: number): Polynomial {
	if (g.length === 0) return f
	const [, r] = divmod(f, g, p)
	return gcd_poly(g, r, p)
}

/**
 * Replaces a polynomial f(X) by f(X) - X.
 */
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

/**
 * Checks if a polynomial f is irreducible modulo a prime p.
 * Uses Rabin's test of irreducibility, cf.
 * {@link https://en.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields#Rabin's_test_of_irreducibility}.
 */
export function is_irreducible(f: Polynomial, p: number, primes?: Set<number>): boolean {
	cleanup(f, p)
	const n = f.length - 1

	if (n <= 0) return false
	if (n === 1) return true

	primes ??= prime_divisors(n)

	const X: Polynomial = [0, 1]

	/**
	 * polys[k] := X^(p^k) mod f
	 */
	const polys: Polynomial[] = [X]

	for (let k = 1; k <= n; k++) {
		polys[k] = divmod(apply_frobenius(polys[k - 1], p), f, p)[1]
	}

	/**
	 * polys[k] := (X^(p^k) - X) mod f
	 */
	for (let k = 0; k <= n; k++) {
		subtractX(polys[k], p)
	}

	/**
	 * Check if gcd(X^(p^k) - X, f) = 1 for all proper divisors k of n.
	 */
	for (const q of primes) {
		const g = gcd_poly(f, polys[n / q], p)
		if (g.length !== 1) return false
	}

	/**
	 * Check if gcd(X^(p^n) - X, f) = f.
	 */
	const h = gcd_poly(f, polys[n], p)
	return structural_equal(h, f)
}

/**
 * Iterates through all n-tuples mod p lexicographically.
 */
function* iterate_tuples(n: number, p: number): IterableIterator<number[]> {
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

/**
 * Returns the lexicographically smallest monic irreducible polynomial
 * of degree n modulo a prime p.
 */
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

/**
 * Generates all monic irreducible polynomials of degree n modulo a prime p,
 * sorted lexicographically.
 */
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
