import { describe, it, expect } from "vitest"
import { compute_mst } from "./mst"

describe("compute_mst", () => {
	it("finds the minimum spanning tree (1)", () => {
		/*
        
        0 --2-- 1 --1-- 3
        |      /
        4    3
        |  /
        2 

        */

		const g = [
			[Infinity, 2, 4, Infinity],
			[2, Infinity, 3, 1],
			[4, 3, Infinity, Infinity],
			[Infinity, 1, Infinity, Infinity],
		]

		/*
        
        0 --2-- 1 --1-- 3
               /
             3
           /
        2 

        */

		const expected = [
			[0, 1],
			[1, 3],
			[1, 2],
		]

		const edges = compute_mst(g)
		expect(edges).toEqual(expected)
	})

	it("finds the minimum spanning tree (2)", () => {
		/*

        0 --4-- 1 -0-- 2
        |       |    /
        1       9   2
        |       |  /
        3 --7-- 4 
        |       |
        8       2
        |       |
        5 --1-- 6

        */
		const g = [
			[Infinity, 4, Infinity, 1, Infinity, Infinity, Infinity],
			[4, Infinity, 0, Infinity, 9, Infinity, Infinity],
			[Infinity, 0, Infinity, Infinity, 2, Infinity, Infinity],
			[1, Infinity, Infinity, Infinity, 7, 8, Infinity],
			[Infinity, 9, 2, 7, Infinity, Infinity, 2],
			[Infinity, Infinity, Infinity, 8, Infinity, Infinity, 1],
			[Infinity, Infinity, Infinity, Infinity, 2, 1, Infinity],
		]

		/*
        0 --4-- 1 -0-- 2
        |            /
        1           2
        |         /
        3       4 
                |
                2
                |
        5 --1-- 6
        */

		const expected = [
			[0, 3],
			[0, 1],
			[1, 2],
			[2, 4],
			[4, 6],
			[5, 6],
		]

		expect(compute_mst(g)).toEqual(expected)
	})

	it("finds the minimum spanning tree (3)", () => {
		/*
                3
                |  \
                3    5
                |      \
        0 --5-- 1 --7-- 2
        |             / |
        13   ---3----   9
        |  /            |
        4 ------2------ 5    

        */

		const g = [
			[Infinity, 5, Infinity, Infinity, 13, Infinity],
			[5, Infinity, 7, 3, Infinity, Infinity],
			[Infinity, 7, Infinity, 5, 3, 9],
			[Infinity, 3, 5, Infinity, Infinity, Infinity],
			[13, Infinity, 3, Infinity, Infinity, 2],
			[Infinity, Infinity, 9, Infinity, 2, Infinity],
		]

		/*
                3
                |  \
                3    5
                |      \
        0 --5-- 1       2
                      /  
             ---3----    
           /             
        4 ------2------ 5    

        */

		const expected = [
			[0, 1],
			[1, 3],
			[2, 3],
			[2, 4],
			[4, 5],
		]

		expect(compute_mst(g)).toEqual(expected)
	})

	it("returns null when the graph is empty", () => {
		expect(compute_mst([])).toBe(null)
	})

	it("returns null when the graph is not connected", () => {
		/*

        0 --5-- 1      2
        
        */

		const g = [
			[Infinity, 5, Infinity],
			[5, Infinity, Infinity],
			[Infinity, Infinity, Infinity],
		]

		expect(compute_mst(g)).toBe(null)
	})
})
