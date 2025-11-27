import { describe, it, expect } from "vitest"
import { get_largest_independent_subset, Graph } from "./independent"

describe("get_largest_independent_subset", () => {
	it("works for a path graph", () => {
		/*
			0 --- 1 --- 2 --- 3
		*/
		const g: Graph = [[1], [0, 2], [1, 3], [2]]
		const expected = [0, 2]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a basic graph", () => {
		/*
		0 --- 1 --- 2     5    8
		      |     |
		      3 --- 4 --- 7
		      |
		      6
        */
		const g: Graph = [[1], [0, 2, 3], [1, 4], [1, 4, 6], [2, 3, 7], [], [3], [4], []]
		const expected = [5, 8, 0, 2, 7, 3]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a bunch of cycles", () => {
		/*
			0		1 -- 2		3 - 4		6 -- 7
							     \ /	    |    |
							      5		    8 -- 9
        */
		const g: Graph = [
			[],
			[2],
			[1],
			[4, 5],
			[3, 5],
			[3, 4],
			[7, 8],
			[6, 9],
			[6, 8],
			[7, 8],
		]

		const expected = [0, 1, 3, 6, 9]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a tree", () => {
		/*
				    0
				   / \
				  1   2
				 / \   \
				3   4   5
				    |   |
				    6   7
		*/
		const g: Graph = [[1, 2], [0, 3, 4], [0, 5], [1], [1, 6], [2, 7], [4], [5]]
		const expected = [3, 0, 4, 5]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a larger graph", () => {
		/*
		    0 -- 1
		    |    |
		    2 -- 3 -- 4         9
		         |    |         |
		         5 -- 6 -- 7 -- 8 -- 10
		         |
		  11 -- 12 -- 13 -- 14
		*/
		const g: Graph = [
			[1, 2],
			[0, 3],
			[0, 3],
			[1, 2, 4, 5],
			[3, 6],
			[3, 6, 12],
			[4, 5, 7],
			[6, 8],
			[7, 9, 10],
			[8],
			[8],
			[12],
			[5, 11, 13],
			[12, 14],
			[13],
		]
		const expected = [9, 10, 7, 4, 1, 2, 5, 11, 13]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a complete graph K5", () => {
		const g: Graph = [
			[1, 2, 3, 4],
			[0, 2, 3, 4],
			[0, 1, 3, 4],
			[0, 1, 2, 4],
			[0, 1, 2, 3],
		]
		const subset = get_largest_independent_subset(g)
		expect(subset.length).toBe(1)
	})

	it("works for a dense graph", () => {
		/*
		     1 --- 2
		   /   \ /   \
		  4 --- 0 --- 3
		   \   / \   /
		     5 --- 6
		*/
		const g: Graph = [
			[1, 2, 3, 4, 5, 6],
			[0, 2, 4],
			[0, 1, 3],
			[0, 2, 6],
			[0, 1, 5],
			[0, 4, 6],
			[0, 3, 5],
		]
		const expected = [1, 3, 5]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a grid graph", () => {
		/*
			0 -- 1 -- 2
			|    |    |
			3 -- 4 -- 5
			|    |    |
			6 -- 7 -- 8
		*/
		const g: Graph = [
			[1, 4],
			[0, 2, 4],
			[1, 5],
			[0, 4, 6],
			[1, 3, 5, 7],
			[2, 4, 8],
			[3, 7],
			[4, 6, 8],
			[5, 7],
		]
		const expected = [1, 3, 5, 7]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})

	it("works for a bipartite graph", () => {
		/*
			0   1   2
			| X | X |
			3   4   5
		*/
		const g: Graph = [
			[3, 4, 5],
			[3, 4, 5],
			[3, 4, 5],
			[0, 1, 2],
			[0, 1, 2],
			[0, 1, 2],
		]
		const expected = [0, 1, 2]
		const subset = get_largest_independent_subset(g)
		expect(subset).toEqual(expected)
	})
})
