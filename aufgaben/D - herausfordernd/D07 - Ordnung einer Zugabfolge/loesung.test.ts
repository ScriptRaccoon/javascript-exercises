import { describe, it, expect } from "vitest"
import { get_sequence_order, parse_sequence } from "./loesung"

describe("parse_sequence", () => {
	it("parses R L2 B", () => {
		const sequence = "R L2 B'"
		const expected = [
			{ letter: "R", repetitions: 1, is_inverse: false },
			{ letter: "L", repetitions: 2, is_inverse: false },
			{ letter: "B", repetitions: 1, is_inverse: true },
		]
		expect(parse_sequence(sequence)).toEqual(expected)
	})

	it("parses F U'2", () => {
		const sequence = "F U'2"
		const expected = [
			{ letter: "F", repetitions: 1, is_inverse: false },
			{ letter: "U", repetitions: 2, is_inverse: true },
		]
		expect(parse_sequence(sequence)).toEqual(expected)
	})

	it("parses the empty string", () => {
		expect(parse_sequence("")).toEqual([])
	})

	it("does throw for invalid sequences", () => {
		expect(() => parse_sequence("4R")).toThrow()
		expect(() => parse_sequence("R_2")).toThrow()
		expect(() => parse_sequence("r")).toThrow()
		expect(() => parse_sequence("R L R`")).toThrow()
	})
})

describe("get_sequence_order", () => {
	const cases: [string, number][] = [
		["", 1],
		["R", 4],
		["R'", 4],
		["R R'", 1], // cancellation
		["R2 R2", 1], // cancellation
		["R2", 2],
		["U", 4],
		["R U", 105],
		["R U'", 63],
		["R U R' U'", 6], // sexy move
		["R2 U2", 6],
		["R2 U", 30],
		["R2 U2 R2 U2 R2 U2", 2],
		["F", 4],
		["F U", 105],
		["R F", 105],
		["R F'", 63],
		["R U F", 80],
		["R U F2 U' R' F U", 126],
		["F U R U' F'", 4],
		["F U R F2 U2 R2", 60],
		["D", 4],
		["R D", 105],
		["D R", 105],
		["F D", 105],
		["R D F U", 252],
		["R3 D' F' U3 D F U", 72],
		["L", 4],
		["R L", 4],
		["R U R' U' R' F R2 U' R' U' R U R' F'", 2], // T-perm
		["R U' R U R U R U' R' U' R2", 3], // Ub-perm
		["D", 4],
		["B D", 105],
		["B U'", 63],
		["R U2 D' B D'", 1260], // largest possible order
	]

	it.each(cases)("%s --> %d", (sequence, order) => {
		expect(get_sequence_order(sequence)).toBe(order)
	})

	it("throws for illegal sequences", () => {
		expect(() => get_sequence_order("r")).toThrow()
	})
})
