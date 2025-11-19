import { describe, expect, test } from "../test.utils"
import { get_colorings, Graph } from "./colorings"
import { get_sudoku_solutions } from "./sudoku"

/* ------ TESTS ------ */

describe("get_colorings", () => {
	test("line segment with one color", () => {
		/*
				A --- B
		*/
		const graph: Graph = {
			A: ["B"],
			B: ["A"],
		}
		const colors = ["red"]

		const all_colorings = [...get_colorings(graph, colors)]
		expect(all_colorings.length).toBe(0)
	})

	test("line segment with two colors", () => {
		/*
				A --- B
		*/
		const graph: Graph = {
			A: ["B"],
			B: ["A"],
		}
		const colors = ["red", "blue"]

		const all_colorings = [...get_colorings(graph, colors)]
		expect(all_colorings.length).toBe(2)
	})

	test("line segment with prescribed color", () => {
		/*
				A --- B
		*/
		const graph: Graph = {
			A: ["B"],
			B: ["A"],
		}
		const colors = ["red", "blue"]

		const all_colorings = [...get_colorings(graph, colors, { A: "red" })]
		expect(all_colorings.length).toBe(1)
	})

	test("rectangular graph", () => {
		/*
				A -- B -- C
				|    |    |
				D -- E -- F
		*/
		const graph: Graph = {
			A: ["B", "D"],
			B: ["A", "E", "C"],
			C: ["B", "F"],
			D: ["A", "E"],
			E: ["D", "B", "F"],
			F: ["E", "C"],
		}

		const colors = ["red", "blue"]

		const all_colorings = [...get_colorings(graph, colors, { A: "red" })]
		const expected = [
			{ A: "red", B: "blue", C: "red", D: "blue", E: "red", F: "blue" },
		]
		expect(JSON.stringify(all_colorings)).toBe(JSON.stringify(expected))
	})

	test("numbers as colors", () => {
		/*
				A -- B -- C
		*/
		const graph: Graph = {
			A: ["B"],
			B: ["A", "C"],
			C: ["B"],
		}
		const colors = [0, 1]
		const all_colorings = [...get_colorings(graph, colors)]

		expect(all_colorings.length === 2)

		const expected = [
			{ A: 0, B: 1, C: 0 },
			{ A: 1, B: 0, C: 1 },
		]

		expect(JSON.stringify(all_colorings)).toBe(JSON.stringify(expected))
	})

	test("cycle", () => {
		/*
				  A
				 / \
				B - C
		*/
		const graph: Graph = {
			A: ["B", "C"],
			B: ["A", "C"],
			C: ["A", "B"],
		}
		const colors = ["red", "blue"]
		const colorings = [...get_colorings(graph, colors)]
		expect(colorings.length).toBe(0)
	})

	test("bipartite graph K(3,3)", () => {
		/*
				A---   B   ---C
				|\  \ /|\ /  /|
				| \  / | \  / |
				|  \/ \|/ \/  |
				|  /\ /|\ /\  |
				| /  \ | /  \ |
				|/  / \|/ \  \|
				X---   Y   ---Z	
		*/
		const graph: Graph = {
			A: ["X", "Y", "Z"],
			B: ["X", "Y", "Z"],
			C: ["X", "Y", "Z"],
			X: ["A", "B", "C"],
			Y: ["A", "B", "C"],
			Z: ["A", "B", "C"],
		}
		const colors = ["red", "blue"]
		const colorings = [...get_colorings(graph, colors)]
		expect(colorings.length).toBe(2)
	})
})

describe("get_sudoku_solutions", () => {
	test("finds a solution to medium sudokus", () => {
		const sample = [
			[7, 9, 4, 0, 8, 6, 3, 1, 0],
			[1, 0, 2, 0, 7, 3, 5, 8, 9],
			[0, 5, 0, 0, 9, 2, 0, 0, 0],
			[0, 0, 0, 7, 5, 0, 1, 2, 0],
			[0, 0, 7, 3, 0, 0, 0, 9, 6],
			[0, 4, 0, 0, 1, 0, 0, 0, 0],
			[4, 3, 0, 0, 0, 0, 0, 5, 1],
			[0, 0, 0, 9, 0, 0, 6, 0, 0],
			[6, 0, 1, 0, 3, 0, 0, 0, 0],
		]

		const solutions = [...get_sudoku_solutions(sample)]

		expect(solutions.length).toBe(1)

		const expected = [
			[7, 9, 4, 5, 8, 6, 3, 1, 2],
			[1, 6, 2, 4, 7, 3, 5, 8, 9],
			[3, 5, 8, 1, 9, 2, 7, 6, 4],
			[9, 8, 6, 7, 5, 4, 1, 2, 3],
			[5, 1, 7, 3, 2, 8, 4, 9, 6],
			[2, 4, 3, 6, 1, 9, 8, 7, 5],
			[4, 3, 9, 8, 6, 7, 2, 5, 1],
			[8, 2, 5, 9, 4, 1, 6, 3, 7],
			[6, 7, 1, 2, 3, 5, 9, 4, 8],
		]

		expect(JSON.stringify(solutions[0])).toBe(JSON.stringify(expected))
	})

	test("finds a solution to difficult sudokus", () => {
		const sample = [
			[0, 0, 0, 0, 0, 0, 6, 0, 0],
			[0, 0, 0, 7, 0, 0, 8, 0, 5],
			[0, 0, 1, 0, 2, 8, 0, 3, 0],
			[0, 0, 0, 0, 0, 6, 0, 2, 8],
			[0, 0, 2, 1, 5, 0, 9, 0, 0],
			[0, 0, 0, 0, 0, 4, 0, 7, 0],
			[0, 8, 4, 0, 0, 0, 0, 5, 0],
			[0, 0, 3, 5, 4, 0, 0, 0, 7],
			[2, 0, 7, 0, 0, 0, 4, 0, 9],
		]

		const solutions = [...get_sudoku_solutions(sample)]

		expect(solutions.length).toBe(1)

		const expected = [
			[3, 7, 8, 4, 1, 5, 6, 9, 2],
			[4, 2, 9, 7, 6, 3, 8, 1, 5],
			[5, 6, 1, 9, 2, 8, 7, 3, 4],
			[7, 4, 5, 3, 9, 6, 1, 2, 8],
			[8, 3, 2, 1, 5, 7, 9, 4, 6],
			[1, 9, 6, 2, 8, 4, 5, 7, 3],
			[9, 8, 4, 6, 7, 2, 3, 5, 1],
			[6, 1, 3, 5, 4, 9, 2, 8, 7],
			[2, 5, 7, 8, 3, 1, 4, 6, 9],
		]

		expect(JSON.stringify(solutions[0])).toBe(JSON.stringify(expected))
	})

	test("finds a solution to very hard sudokus", () => {
		const sample = [
			[4, 0, 0, 0, 0, 0, 8, 0, 5],
			[0, 3, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 7, 0, 0, 0, 0, 0],
			[0, 2, 0, 0, 0, 0, 0, 6, 0],
			[0, 0, 0, 0, 8, 0, 4, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 6, 0, 3, 0, 7, 0],
			[5, 0, 0, 2, 0, 0, 0, 0, 0],
			[1, 0, 4, 0, 0, 0, 0, 0, 0],
		]

		const solutions = [...get_sudoku_solutions(sample)]

		expect(solutions.length).toBe(1)

		const expected = [
			[4, 1, 7, 3, 6, 9, 8, 2, 5],
			[6, 3, 2, 1, 5, 8, 9, 4, 7],
			[9, 5, 8, 7, 2, 4, 3, 1, 6],
			[8, 2, 5, 4, 3, 7, 1, 6, 9],
			[7, 9, 1, 5, 8, 6, 4, 3, 2],
			[3, 4, 6, 9, 1, 2, 7, 5, 8],
			[2, 8, 9, 6, 4, 3, 5, 7, 1],
			[5, 7, 3, 2, 9, 1, 6, 8, 4],
			[1, 6, 4, 8, 7, 5, 2, 9, 3],
		]

		expect(JSON.stringify(solutions[0])).toBe(JSON.stringify(expected))
	})

	test("finds multiple solutions", () => {
		const sample = [
			[0, 0, 4, 0, 8, 6, 3, 1, 0],
			[1, 0, 2, 0, 7, 3, 5, 8, 9],
			[0, 5, 0, 0, 9, 2, 0, 0, 0],
			[0, 0, 0, 7, 5, 0, 1, 2, 0],
			[0, 0, 7, 3, 0, 0, 0, 9, 6],
			[0, 4, 0, 0, 1, 0, 0, 0, 0],
			[4, 3, 0, 0, 0, 0, 0, 5, 1],
			[0, 0, 0, 9, 0, 0, 6, 0, 0],
			[6, 0, 1, 0, 3, 0, 0, 0, 0],
		]

		const solutions = [...get_sudoku_solutions(sample)]

		expect(solutions.length).toBe(2)

		const expected = [
			[
				[7, 9, 4, 5, 8, 6, 3, 1, 2],
				[1, 6, 2, 4, 7, 3, 5, 8, 9],
				[3, 5, 8, 1, 9, 2, 7, 6, 4],
				[9, 8, 6, 7, 5, 4, 1, 2, 3],
				[5, 1, 7, 3, 2, 8, 4, 9, 6],
				[2, 4, 3, 6, 1, 9, 8, 7, 5],
				[4, 3, 9, 8, 6, 7, 2, 5, 1],
				[8, 2, 5, 9, 4, 1, 6, 3, 7],
				[6, 7, 1, 2, 3, 5, 9, 4, 8],
			],
			[
				[9, 7, 4, 5, 8, 6, 3, 1, 2],
				[1, 6, 2, 4, 7, 3, 5, 8, 9],
				[3, 5, 8, 1, 9, 2, 7, 6, 4],
				[8, 9, 6, 7, 5, 4, 1, 2, 3],
				[5, 1, 7, 3, 2, 8, 4, 9, 6],
				[2, 4, 3, 6, 1, 9, 8, 7, 5],
				[4, 3, 9, 8, 6, 7, 2, 5, 1],
				[7, 2, 5, 9, 4, 1, 6, 3, 8],
				[6, 8, 1, 2, 3, 5, 9, 4, 7],
			],
		]

		expect(JSON.stringify(solutions)).toBe(JSON.stringify(expected))
	})
})
