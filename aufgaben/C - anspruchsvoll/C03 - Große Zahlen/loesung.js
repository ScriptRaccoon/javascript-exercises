/**
 * Klasse für beliebig große natürliche Zahlen.
 */
class BigNumber {
	constructor(input) {
		if (Array.isArray(input)) {
			if (!input.every((d) => Number.isInteger(d) && d >= 0 && d <= 9)) {
				throw new Error(`Invalid digit array: ${input}`)
			}
			this.digits = input.slice()
		} else {
			const str = typeof input === "number" ? input.toString() : input
			if (!/^\d+$/.test(str)) throw new Error(`Invalid string: ${input}`)
			this.digits = str.split("").map(Number).reverse()
		}

		this.remove_trailing_zeros()
	}

	remove_trailing_zeros() {
		while (this.digits.at(-1) === 0) this.digits.pop()
	}

	get length() {
		return this.digits.length
	}

	to_string() {
		return this.digits.toReversed().join("") || "0"
	}

	print() {
		console.info(this.to_string())
	}

	equals(other) {
		return (
			this.length === other.length &&
			this.digits.every((val, index) => val === other.digits[index])
		)
	}

	add(other) {
		const result = []
		let carry = 0
		const max_length = Math.max(this.length, other.length)

		for (let i = 0; i < max_length; i++) {
			const sum = (this.digits[i] ?? 0) + (other.digits[i] ?? 0) + carry
			result.push(sum % 10)
			carry = Math.floor(sum / 10)
		}

		if (carry > 0) {
			result.push(carry)
		}

		return new BigNumber(result)
	}

	multiply(other) {
		const result = new Array(this.length + other.length).fill(0)

		for (let i = 0; i < this.length; i++) {
			let carry = 0
			const a = this.digits[i]

			for (let j = 0; j < other.length; j++) {
				const b = other.digits[j]
				const sum = result[i + j] + a * b + carry
				result[i + j] = sum % 10
				carry = Math.floor(sum / 10)
			}

			if (carry > 0) {
				result[i + other.length] += carry
			}
		}

		return new BigNumber(result)
	}
}

/* ------ GENERAL TESTS ------ */

function test_addition() {
	for (let i = 0; i < 1000; i++) {
		const n = Math.floor(Math.random() * 10000)
		const m = Math.floor(Math.random() * 10000)
		const a = new BigNumber(n)
		const b = new BigNumber(m)
		const ok = a.add(b).to_string() === (n + m).toString()
		if (!ok) return console.warn("Addition invalid:", n, m)
	}
	console.info("Addition is valid")
}

test_addition()

function test_multiplication() {
	for (let i = 0; i < 1000; i++) {
		const n = Math.floor(Math.random() * 10000)
		const m = Math.floor(Math.random() * 10000)
		const a = new BigNumber(n)
		const b = new BigNumber(m)
		const ok = a.multiply(b).to_string() === (n * m).toString()
		if (!ok) return console.warn("Multiplication invalid:", n, m)
	}
	console.info("Multiplication is valid")
}

test_multiplication()

/* ------ TESTS ------ */

const x = new BigNumber(8916)
const y = new BigNumber(12087)

const u = x.add(y)
u.print() // '21003'

const v = x.multiply(y)
v.print() // '107767692'

const a = new BigNumber(1000000000000000000)
const b = new BigNumber(42)
const s = a.add(b)
s.print() // '1000000000000000042'
