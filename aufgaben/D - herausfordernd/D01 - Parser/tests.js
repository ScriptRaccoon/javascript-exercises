import { AST_UTILS } from "./ast.js"
import { parse } from "./parser.js"
import { test, expect, describe } from "../test.utils.js"

describe("AST_UTILS.evaluate", () => {
	test("numbers", () => {
		const ast = { type: "number", value: 42 }
		const val = AST_UTILS.evaluate(ast)
		expect(val === 42)
	})

	test("binary operations", () => {
		const ast = {
			type: "binary",
			op: "+",
			left: { type: "variable", name: "x" },
			right: { type: "variable", name: "y" },
		}

		const val = AST_UTILS.evaluate(ast, { x: 10, y: 2 })
		expect(val).toBe(12)
	})

	test("nested expressions", () => {
		const ast = {
			type: "binary",
			op: "/",
			left: { type: "number", value: 1 },
			right: {
				type: "binary",
				op: "+",
				left: { type: "number", value: 1 },
				right: {
					type: "binary",
					op: "/",
					left: { type: "number", value: 1 },
					right: { type: "variable", name: "y" },
				},
			},
		}

		const val = AST_UTILS.evaluate(ast, { y: 1 })
		expect(val).toBe(0.5)
	})
})

describe("parser", () => {
	test("unary operations", () => {
		const ast = parse("-0.6")

		const expected = { type: "unary", op: "-", expr: { type: "number", value: 0.6 } }

		expect(JSON.stringify(ast)).toBe(JSON.stringify(expected))
	})

	test("binary operations", () => {
		const ast = parse("x + 42")

		const expected = {
			type: "binary",
			op: "+",
			left: { type: "variable", name: "x" },
			right: { type: "number", value: 42 },
		}

		expect(JSON.stringify(ast)).toBe(JSON.stringify(expected))
	})

	test("operator precedence", () => {
		const ast = parse("x * y + z")

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

		expect(JSON.stringify(ast)).toBe(JSON.stringify(expected))
	})

	test("complex expressions", () => {
		const ast = parse("3.5/(2 - 1/(3 - p))")

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

		expect(JSON.stringify(ast)).toBe(JSON.stringify(expected))
	})
})
