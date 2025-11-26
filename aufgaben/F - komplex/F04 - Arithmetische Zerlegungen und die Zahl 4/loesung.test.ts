import { describe, it, expect } from "vitest"
import { evaluate, Expr, find_shortest_expression, stringify_expression } from "./loesung"

describe("evaluate", () => {
	it("evaluates 2*(3-6) to -6", () => {
		const expr: Expr = ["*", 2, ["-", 3, 6]]
		expect(evaluate(expr)).toBe(-6)
	})

	it("evaluates 3 + 1/(5-1) to 3.25", () => {
		const expr: Expr = ["+", 3, ["/", 1, ["-", 5, 1]]]
		expect(evaluate(expr)).toBe(3.25)
	})
})

describe("stringify_expression", () => {
	it("returns a readable string", () => {
		const expr: Expr = ["+", 3, ["/", 1, ["-", 5, 1]]]
		const expected = "3+(1/(5-1))"
		expect(stringify_expression(expr)).toBe(expected)
	})
})

describe("find_shortest_expression", () => {
	describe("basis 4", () => {
		const cases: [number, string][] = [
			[1, "4/4"],
			[2, "(4+4)/4"],
			[3, "4-(4/4)"],
			[4, "4"],
			[5, "4+(4/4)"],
			[6, "4+((4+4)/4)"],
			[7, "4+(4-(4/4))"],
			[8, "4+4"],
			[9, "4+(4+(4/4))"],
			[10, "4+(4+((4+4)/4))"],
			[123, "(4*(4*(4+4)))-(4+(4/4))"],
			[999, "(4*((4**4)-4))-(4+(4+(4/4)))"],
			[2025, "4+(4+((4/4)+((4+4)*((4**4)-4))))"],
			[3003, "((4**4)*(4+(4+4)))-(4+((4+(4**4))/4))"],
			[39999, "(((4+(4*4))**4)-4)/4"],
			[91681, "(((4*4)+(4/4))**4)+((4+4)*((4*(4**4))-4))"],
		]

		it.each(cases)("finds %d = %s", (n, str) => {
			const expr = find_shortest_expression(n, 4)
			expect(expr).toBeTruthy()
			expect(evaluate(expr!)).toBe(n)
			expect(stringify_expression(expr!)).toBe(str)
		})
	})

	describe("basis 3", () => {
		const cases: [number, string][] = [
			[10, "(3*3)+(3/3)"],
			[100, "(3/3)+(3*(3+(3+(3**3))))"],
			[1000, "((3*3)+(3/3))**3"],
			[10000, "((3*3)+(3/3))**(3+(3/3))"],
			[100000, "((3*3)+(3/3))**(3+(3-(3/3)))"],
			[1000000, "((3*3)+(3/3))**(3+3)"],
			[10000000, "((3*3)+(3/3))**(3+(3+(3/3)))"],
		]

		it.each(cases)("finds %d = %s", (n, str) => {
			const expr = find_shortest_expression(n, 3)
			expect(expr).toBeTruthy()
			expect(evaluate(expr!)).toBe(n)
			expect(stringify_expression(expr!)).toBe(str)
		})
	})

	describe("basis 1", () => {
		const cases: [number, string][] = [
			[5, "1+(1+(1+(1+1)))"],
			[6, "(1+1)*(1+(1+1))"],
			[101, "1+((1+((1+(1+1))**(1+1)))**(1+1))"],
			[500, "((1+((1+(1+1))**(1+1)))**(1+(1+1)))/(1+1)"],
		]

		it.each(cases)("finds %d = %s", (n, str) => {
			const expr = find_shortest_expression(n, 1)
			expect(expr).toBeTruthy()
			expect(evaluate(expr!)).toBe(n)
			expect(stringify_expression(expr!)).toBe(str)
		})
	})

	describe("basis 42", () => {
		// not very interesting results
		const cases: [number, string][] = [
			[55, "42+((42/((42+(42+42))/42))-(42/42))"],
			[920, "42+((42*(42/((42+42)/42)))-((42+(42+(42+42)))/42))"],
			[2025, "(42+((42+(42+42))/42))**((42+42)/42)"],
		]

		it.each(cases)("finds %d = %s", (n, str) => {
			const expr = find_shortest_expression(n, 42)
			expect(expr).toBeTruthy()
			expect(evaluate(expr!)).toBe(n)
			expect(stringify_expression(expr!)).toBe(str)
		})
	})
})
