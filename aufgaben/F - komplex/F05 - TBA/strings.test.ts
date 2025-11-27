import { describe, it, expect } from "vitest"
import { check_independence, get_independent_strings } from "./strings"

describe("get_independent_strings", () => {
	it("works for an array of length 4", () => {
		const arr = ["a", "b", "ab", "ba"]
		const expected = ["a", "b"]
		const strings = get_independent_strings(arr)
		expect(strings).toEqual(expected)
		expect(check_independence(strings)).toBe(true)
	})

	it("works for an array of length 7", () => {
		const arr = ["baa", "ba", "bb", "bbb", "b", "a", "ab"]
		const expected = ["baa", "ab", "bb"]
		const strings = get_independent_strings(arr)
		expect(strings).toEqual(expected)
		expect(check_independence(strings)).toBe(true)
	})

	it("works for an array of length 43", () => {
		// prettier-ignore
		const arr = ["bbaa","aaaaa","b","abbbbbaaa","babb","abaaab",
			"babbaaaba","aaaabbbb","baababa","aaa","abaababa","babbbaba",
			"abaa","bbbb","aabbbb","ab","ba","baaaaaab","bbbbaab","abbab",
			"abaabaab","baab","bb","aabaab","aab","aabbaa","abbbbaaa",
			"aabb","bbaaba","baaabbaba","bba","babaa","abaaabbaa",
			"bbbab","a","bbbbb","babbaaab","aaab","aaabaaab",
			"aabab","baaaaabb","abaabbaba","aabbabba"]

		// prettier-ignore
		const expected = ["abbbbbaaa","abbbbaaa","babaa","bbbab",
			"abaaab","baaaaaab","babbaaaba","bbbbaab","bbaaba",
			"abaabaab","aabbaa","baaaaabb","aaaabbbb","baaabbaba",
			"abaabbaba","aabbabba","baababa"]

		const strings = get_independent_strings(arr)
		expect(strings).toEqual(expected)
		expect(check_independence(strings)).toBe(true)
	})
})
