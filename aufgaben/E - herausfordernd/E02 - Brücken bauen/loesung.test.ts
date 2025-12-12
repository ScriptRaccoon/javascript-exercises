import { describe, it, expect } from "vitest"
import { get_islands } from "./islands"
import { Profile } from "./profile"
import {
	construct_island_graph,
	construct_shortest_bridge,
	construct_shortest_bridges,
	get_best_bridge_plan,
} from "./loesung"

describe("construct_shortest_bridge", () => {
	it("computes the shortest bridge between two islands", () => {
		const profile: Profile = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]
		const islands = get_islands(profile)
		expect(islands.length).toBe(3)
		const A = islands[0]
		const B = islands[1]
		const C = islands[2]

		const bridge_AB = construct_shortest_bridge(A, B, profile)
		expect(bridge_AB).not.toBe(null)
		expect(bridge_AB).toHaveLength(7)

		const bridge_AC = construct_shortest_bridge(A, C, profile)
		expect(bridge_AC).not.toBe(null)
		expect(bridge_AC).toHaveLength(6)

		const bridge_BC = construct_shortest_bridge(B, C, profile)
		expect(bridge_BC).not.toBe(null)
		expect(bridge_BC).toHaveLength(3)
	})

	it("returns null when no bridge can be built", () => {
		const profile: Profile = [
			[0, 0, 1, 0, 0],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[0, 0, 1, 0, 0],
		]

		const islands = get_islands(profile)
		expect(islands.length).toBe(3)
		const B = islands[1]
		const C = islands[2]
		const bridge_BC = construct_shortest_bridge(B, C, profile)
		expect(bridge_BC).toBe(null)
	})
})

describe("construct_island_graph", () => {
	it("returns a weighted graph with islands as nodes and lengths of shortest bridge as edges", () => {
		const profile: Profile = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
		]

		const islands = get_islands(profile)
		const bridges = construct_shortest_bridges(islands, profile)
		const g = construct_island_graph(islands, bridges)

		expect(g.length).toBe(3)

		expect(g).toEqual([
			[Infinity, 6, 5],
			[6, Infinity, 2],
			[5, 2, Infinity],
		])
	})
})

describe("get_best_bridge_plan", () => {
	it("returns a plan with bridges that connect all islands with minimal cost (1)", () => {
		const profile: Profile = [
			[0, 0, 0, 0, 0, 1, 1, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 1, 1],
			[0, 0, 0, 0, 1, 1, 0, 1, 1],
		]

		const expected = [
			[0, 0, 0, 0, 0, 1, 1, 0, 0],
			[1, 1, 1, 0, 0, 2, 0, 0, 0],
			[1, 1, 1, 0, 0, 2, 0, 0, 0],
			[0, 0, 2, 2, 1, 1, 2, 1, 1],
			[0, 0, 0, 0, 1, 1, 0, 1, 1],
		]

		const plan = get_best_bridge_plan(profile)
		expect(plan).toEqual(expected)
	})

	it("returns a plan with bridges that connect all islands with minimal cost (2)", () => {
		const profile: Profile = [
			[0, 0, 1, 0, 0],
			[0, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 0],
		]

		const expected = [
			[0, 0, 1, 0, 0],
			[0, 0, 1, 2, 1],
			[1, 2, 1, 0, 1],
			[1, 0, 1, 0, 0],
		]

		const plan = get_best_bridge_plan(profile)
		expect(plan).toEqual(expected)
	})

	it("returns a plan with bridges that connect all islands with minimal cost (3)", () => {
		const profile: Profile = [
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
		]

		const expected = [
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
			[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
			[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
			[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 0],
			[0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 0],
			[0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
		]

		const plan = get_best_bridge_plan(profile)
		expect(plan).toEqual(expected)
	})
})
