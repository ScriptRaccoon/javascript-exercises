import { describe, it, expect } from "vitest"
import { move_dict, N } from "./cube"
import { PermUtils } from "./perm.utils"

describe("move_dict", () => {
	it("has valid permutations", () => {
		for (const move of Object.values(move_dict)) {
			expect(PermUtils.is_permutation(move)).toBe(true)
			expect(move.length).toBe(N)
		}
	})
})
