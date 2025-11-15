import type { AST } from "./ast"

class Parser {
	private pos = 0
	private input: string

	constructor(input: string) {
		this.input = input.replace(/\s+/g, "")
	}

	parse(): AST {
		const ast = this.parse_expression()
		if (this.pos < this.input.length) {
			throw new Error(`Unexpected input at position ${this.pos}`)
		}
		return ast
	}

	private peek(offset = 0): string {
		return this.input[this.pos + offset] ?? ""
	}

	private consume(): string {
		const char = this.input[this.pos]
		this.pos++
		return char
	}

	private parse_expression(min_precedence = 0): AST {
		const left_expr = this.parse_primary()
		return this.parse_operators(left_expr, min_precedence)
	}

	private parse_operators(left: AST, min_precedence: number): AST {
		const op = this.peek()
		const precedence = this.get_precedence(op)

		const op_does_not_bind = precedence === 0 || precedence <= min_precedence
		if (op_does_not_bind) return left

		this.consume()
		const right = this.parse_expression(precedence)
		const combined: AST = { type: "binary", op, left, right }

		return this.parse_operators(combined, min_precedence)
	}

	private parse_primary(): AST {
		const char = this.peek()

		// unary minus
		if (char === "-") {
			this.consume()
			const expr = this.parse_primary()
			return { type: "unary", op: "-", expr }
		}

		// number
		if (/\d/.test(char) || (char === "." && /\d/.test(this.peek(1)))) {
			let num_str = ""
			while (/\d|\./.test(this.peek())) num_str += this.consume()
			return { type: "number", value: parseFloat(num_str) }
		}

		// variable
		if (/[a-zA-Z]/.test(char)) {
			let name = ""
			while (/[a-zA-Z0-9_]/.test(this.peek())) name += this.consume()
			return { type: "variable", name }
		}

		// parentheses
		if (char === "(") {
			this.consume()
			const expr = this.parse_expression()
			if (this.consume() !== ")") throw new Error("Expected closing parenthesis")
			return expr
		}

		throw new Error(`Unexpected character: ${char}`)
	}

	private get_precedence(op: string): number {
		switch (op) {
			case "+":
			case "-":
				return 1
			case "*":
			case "/":
				return 2
			default:
				return 0
		}
	}
}

export function parse(txt: string): AST | null {
	try {
		return new Parser(txt).parse()
	} catch (err) {
		console.error("Parse error:", err)
		return null
	}
}
