import { describe, it, expect } from "vitest"
import { parse_expression } from "./parser"

describe("parse", () => {
	it("parses numbers", () => {
		const ast = parse_expression("0.5")
		const expected = { type: "number", value: 0.5 }
		expect(ast).toEqual(expected)
	})

	it("parses unary operations and variables", () => {
		const ast = parse_expression("-x")

		const expected = {
			type: "unary",
			op: "-",
			expr: { type: "variable", name: "x" },
		}

		expect(ast).toEqual(expected)
	})

	it("parses binary operations", () => {
		const ast = parse_expression("x + 42")

		const expected = {
			type: "binary",
			op: "+",
			left: { type: "variable", name: "x" },
			right: { type: "number", value: 42 },
		}

		expect(ast).toEqual(expected)
	})

	it("respects operator precedence", () => {
		const ast = parse_expression("x * y + z")

		const expected = {
			type: "binary",
			op: "+",
			left: {
				type: "binary",
				op: "*",
				left: { type: "variable", name: "x" },
				right: { type: "variable", name: "y" },
			},
			right: { type: "variable", name: "z" },
		}

		expect(ast).toEqual(expected)
	})

	it("parses complex expressions", () => {
		const ast = parse_expression("3.5/(2 - 1/(3 - p))")

		const expected = {
			type: "binary",
			op: "/",
			left: { type: "number", value: 3.5 },
			right: {
				type: "binary",
				op: "-",
				left: { type: "number", value: 2 },
				right: {
					type: "binary",
					op: "/",
					left: { type: "number", value: 1 },
					right: {
						type: "binary",
						op: "-",
						left: { type: "number", value: 3 },
						right: { type: "variable", name: "p" },
					},
				},
			},
		}

		expect(ast).toEqual(expected)
	})
})
