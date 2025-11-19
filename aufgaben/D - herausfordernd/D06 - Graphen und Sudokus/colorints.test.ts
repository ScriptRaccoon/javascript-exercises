import { describe, it, expect } from "vitest"
import { get_colorings, Graph } from "./colorings"

describe("get_colorings", () => {
	it("returns no coloring", () => {
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

	it("returns two colorings", () => {
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
		expect(all_colorings).toContainEqual({
			A: "red",
			B: "blue",
		})
		expect(all_colorings).toContainEqual({
			A: "blue",
			B: "red",
		})
	})

	it("returns one coloring", () => {
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
		expect(all_colorings).toContainEqual({
			A: "red",
			B: "blue",
		})
	})

	it("returns one coloring", () => {
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
		expect(all_colorings.length).toBe(1)

		expect(all_colorings).toContainEqual({
			A: "red",
			B: "blue",
			C: "red",
			D: "blue",
			E: "red",
			F: "blue",
		})
	})

	it("works with numbers as colors", () => {
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

		expect(all_colorings.length).toBe(2)

		expect(all_colorings).toContainEqual({ A: 0, B: 1, C: 0 })
		expect(all_colorings).toContainEqual({ A: 1, B: 0, C: 1 })
	})

	it("returns no colorings", () => {
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

	it("returns two colorings", () => {
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
