/**
 * Class that handles polynomials with numbers as coefficients.
 * Uses an array of numbers to save the coefficients. For example,
 * a_0 + a_1 X + a_2 X^2 is saved as the array [a_0, a_1, a_2]
 */
export class Polynomial {
	private readonly coeffs: number[]

	constructor(coeffs: number[]) {
		this.coeffs = coeffs
		this.remove_trailing_zeros()
	}

	/**
	 * Returns the coefficient of X^i in the polynomial.
	 */
	get_coeff(i: number): number {
		return this.coeffs.at(i) ?? 0
	}

	/**
	 * Returns the list of coefficients.
	 */
	get coefficients(): number[] {
		return this.coeffs
	}

	/**
	 * Removes the zeros in the end, e.g. [2,0,3,0,0] -> [2,0,3].
	 */
	private remove_trailing_zeros(): void {
		while (this.coeffs.at(-1) === 0) this.coeffs.pop()
	}

	/**
	 * The number of coefficients (= degree + 1).
	 */
	get length(): number {
		return this.coeffs.length
	}

	/**
	 * Returns a readable string representation of the polynomial,
	 * such as X^3 - 2X + 1.
	 */
	to_string(): string {
		const n = this.length
		if (n === 0) {
			return "0"
		}
		if (n === 1) {
			return `${this.coeffs[0]}`
		}

		let str = ""

		for (let i = n - 1; i >= 0; i--) {
			const c = this.coeffs[i]
			if (c === 0) continue

			let power = ""
			if (i === 1) power = "X"
			else if (i > 1) power = `X^${i}`

			const op = c > 0 ? "+" : "-"
			const coeff = Math.abs(c) === 1 ? "" : `${Math.abs(c)}`
			let monomial = `${op} ${coeff}${power} `

			if (i === n - 1) {
				const sign = c > 0 ? "" : "-"
				monomial = `${sign}${coeff}${power} `
			}

			str += monomial
		}

		return str.trim()
	}

	/**
	 * Prints the string representation to the console.
	 */
	print(): void {
		console.info(this.to_string())
	}

	/**
	 * Adds the given polynomial to another polynomial.
	 * (Not needed currently.)
	 */
	add(other: Polynomial): Polynomial {
		const d = Math.max(this.length, other.length)

		const coeffs = Array.from(
			{ length: d },
			(_, i) => this.get_coeff(i) + other.get_coeff(i),
		)

		return new Polynomial(coeffs)
	}

	/**
	 * Subtracts another polynomial from the given one.
	 */
	sub(other: Polynomial): Polynomial {
		const d = Math.max(this.length, other.length)

		const coeffs = Array.from(
			{ length: d },
			(_, i) => this.get_coeff(i) - other.get_coeff(i),
		)

		return new Polynomial(coeffs)
	}

	/**
	 * Multiplies the given polynomial with another polynomial.
	 * (Not needed currently.)
	 */
	multiply(other: Polynomial): Polynomial {
		const d = this.length + other.length

		const coeffs: number[] = new Array(d).fill(0)

		for (let p = 0; p < this.length; p++) {
			for (let q = 0; q < other.length; q++) {
				coeffs[p + q] += this.get_coeff(p) * other.get_coeff(q)
			}
		}

		return new Polynomial(coeffs)
	}

	/**
	 * Computes the nth-power of the given polynomial.
	 */
	power(n: number): Polynomial {
		if (n < 0 || !Number.isInteger(n)) throw new Error("Invalid exponent")
		if (n === 0) return new Polynomial([1])
		return this.multiply(this.power(n - 1))
	}

	/**
	 * Checks if the given polynomial is equal to another polynomial
	 * by comparing the coefficients.
	 * (Not needed currently.)
	 */
	equals(other: Polynomial): boolean {
		return (
			this.length == other.length &&
			this.coeffs.every((_, i) => this.coeffs[i] === other.coeffs[i])
		)
	}

	/**
	 * Evaluates the given polynomial at some value.
	 */
	evaluate(x: number): number {
		let val = 0
		for (let i = 0; i < this.length; i++) {
			val += this.coeffs[i] * x ** i
		}
		return val
	}
}

export const X = new Polynomial([0, 1])
