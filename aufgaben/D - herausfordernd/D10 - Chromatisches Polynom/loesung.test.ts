import { describe, it, expect } from "vitest"
import { get_chromatic_number, get_chromatic_polynomial } from "./loesung"

describe("get_chromatic_polynomial", () => {
	it("works for the empty graph", () => {
		const g = {}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([1])
		expect(p.to_string()).toBe("1")
	})

	it("works for the trivial graph", () => {
		/*
                    A
        */
		const g = { A: [] }

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, 1])
		expect(p.to_string()).toBe("X")
	})

	it("works for an edgeless graph", () => {
		/*
                A   B   C
        */
		const g = {
			A: [],
			B: [],
			C: [],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, 0, 0, 1])
		expect(p.to_string()).toBe("X^3")
	})

	it("works for a graph with loops", () => {
		/*
                  __
                 /  \
                |    A      B --- C
                 \__/

        */
		const g = { A: ["A"], B: ["C"], C: ["B"] }

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([])
		expect(p.to_string()).toEqual("0")
	})

	it("works for a cycle", () => {
		/*
                   A
                 /   \
                B --- C
        */
		const g = {
			A: ["B", "C"],
			B: ["A", "C"],
			C: ["A", "B"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, 2, -3, 1])
		expect(p.to_string()).toBe("X^3 - 3X^2 + 2X")
	})

	it("works for a path", () => {
		/*
                A - B - C - D - E
        */
		const g = {
			A: ["B"],
			B: ["A", "C"],
			C: ["B", "D"],
			D: ["C", "E"],
			E: ["D"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, 1, -4, 6, -4, 1])
		expect(p.to_string()).toBe("X^5 - 4X^4 + 6X^3 - 4X^2 + X")
	})

	it("works for a tree", () => {
		/*
                    A
                    |
                    B
                  /  \
                 C    D
                     / \
                    E   F
        */
		const g = {
			A: ["B"],
			B: ["A", "C", "D"],
			C: ["B"],
			D: ["B", "E", "F"],
			E: ["D"],
			F: ["D"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, -1, 5, -10, 10, -5, 1])
		expect(p.to_string()).toBe("X^6 - 5X^5 + 10X^4 - 10X^3 + 5X^2 - X")
	})

	it("works for a complete bipartite graph", () => {
		/*
        See https://en.wikipedia.org/wiki/Complete_bipartite_graph
        */
		const g = {
			A: ["a", "b", "c"],
			B: ["a", "b", "c"],
			C: ["a", "b", "c"],
			a: ["A", "B", "C"],
			b: ["A", "B", "C"],
			c: ["A", "B", "C"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([0, -31, 78, -75, 36, -9, 1])
		expect(p.to_string()).toBe("X^6 - 9X^5 + 36X^4 - 75X^3 + 78X^2 - 31X")
	})

	it("works for the Petersen graph", () => {
		/*
        See https://en.wikipedia.org/wiki/Petersen_graph
        */
		const g = {
			a: ["A", "c", "d"],
			b: ["B", "d", "e"],
			c: ["C", "e", "a"],
			d: ["D", "a", "b"],
			e: ["E", "b", "c"],
			A: ["a", "E", "B"],
			B: ["b", "A", "C"],
			C: ["c", "B", "D"],
			D: ["d", "C", "E"],
			E: ["e", "D", "A"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.coefficients).toEqual([
			0, -704, 2606, -4305, 4275, -2861, 1353, -455, 105, -15, 1,
		])
		expect(p.to_string()).toBe(
			"X^10 - 15X^9 + 105X^8 - 455X^7 + 1353X^6 - 2861X^5 + 4275X^4 - 4305X^3 + 2606X^2 - 704X",
		)
	})

	it("works for a wheel graph", () => {
		/*
		See https://en.wikipedia.org/wiki/Wheel_graph
		*/
		const g = {
			"1": ["2", "3", "4", "5", "6", "7"],
			"2": ["1", "7", "3"],
			"3": ["1", "2", "4"],
			"4": ["1", "3", "5"],
			"5": ["1", "4", "6"],
			"6": ["1", "5", "7"],
			"7": ["1", "6", "2"],
		}

		const p = get_chromatic_polynomial(g)
		expect(p.to_string()).toBe("X^7 - 12X^6 + 60X^5 - 160X^4 + 240X^3 - 191X^2 + 62X")
	})
})

describe("get_chromatic_number", () => {
	it("works for the empty graph", () => {
		const g = {}

		expect(get_chromatic_number(g)).toBe(0)
	})

	it("works for an edgeless graph", () => {
		const g = {
			A: [],
			B: [],
			C: [],
		}
		expect(get_chromatic_number(g)).toBe(1)
	})

	it("works for a cycle", () => {
		const g = {
			A: ["B", "C"],
			B: ["A", "C"],
			C: ["A", "B"],
		}
		expect(get_chromatic_number(g)).toBe(3)
	})

	it("works for a path", () => {
		const g = {
			A: ["B"],
			B: ["A", "C"],
			C: ["B", "D"],
			D: ["C", "E"],
			E: ["D"],
		}
		expect(get_chromatic_number(g)).toBe(2)
	})

	it("works for a complete bipartite graph", () => {
		const g = {
			A: ["a", "b", "c"],
			B: ["a", "b", "c"],
			C: ["a", "b", "c"],
			a: ["A", "B", "C"],
			b: ["A", "B", "C"],
			c: ["A", "B", "C"],
		}
		expect(get_chromatic_number(g)).toBe(2)
	})

	it("works for the Petersen graph", () => {
		const g = {
			a: ["A", "c", "d"],
			b: ["B", "d", "e"],
			c: ["C", "e", "a"],
			d: ["D", "a", "b"],
			e: ["E", "b", "c"],
			A: ["a", "E", "B"],
			B: ["b", "A", "C"],
			C: ["c", "B", "D"],
			D: ["d", "C", "E"],
			E: ["e", "D", "A"],
		}

		expect(get_chromatic_number(g)).toBe(3)
	})
})
