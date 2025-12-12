import { describe, it, expect } from "vitest"
import { get_islands } from "./islands"
import { Profile } from "./profile"

describe("get_islands", () => {
	it("finds all connected regions of 1s", () => {
		const profile: Profile = [
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
			[0, 0, 1, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]

		const islands = get_islands(profile)
		expect(islands.length).toBe(5)
		expect(islands).toContainEqual(new Set([7, 17, 18, 28]))
		expect(islands).toContainEqual(new Set([107]))
	})
})
