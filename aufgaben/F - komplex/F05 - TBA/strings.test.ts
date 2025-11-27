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

	it("works for an array of length 163", () => {
		// prettier-ignore
		const arr = ["cbbb","baabaabc","cccab","c","ca","bcaaaccc","aabaac","a","ab","aaacaca","ba","ccbaa","aaca","aaacaaabb","ccccac","bcbaba","bbabb","bb","bccbc","aaccac","ccaccc","cababbbc","aa","cbabaab","cacbabaaa","abc","aabbcc","bbaa","bcaab","aba","caa","cc","abbaaaabb","cbaacccca","abb","ccabc","aabb","ccab","cccbb","cbcabcccc","ac","bbaacc","acc","caacacca","ccaabb","ccacb","acababb","cbca","bbb","cabba","bcbcaab","aacbccba","ccbaac","baccbcbcb","babacb","b","bc","cab","abbbbacb","cbcabacc","babbcbbca","cabcaaba","aacacbcb","bacbcab","acbbac","acabbcaa","cbac","baabbba","abcb","bcaca","bbab","cabca","bcac","bacbccbcb","bcabbcb","aacccbcac","baccbabca","caabbcccc","aaaa","bcacc","abbbb","caba","abaaab","aaba","acb","acaacbac","ccabca","cbcbaaa","cbcaab","bbcbbc","aabbacca","bcaabaaaa","bbcb","caacbbac","caaabbb","ccbccacb","acbabaaba","bcaaacc","aaab","acccccbc","bbbcbcbb","bcc","bcccc","ccbaab","bcbbca","bbcbac","cbbccabaa","cb","bbcbcaaa","bcacaac","bcbacb","cbaabaab","bbcabcbb","cabcbc","bbcccbba","abbbccba","bbcbacbc","bccaabb","abcc","cbbcaaccb","abbca","bcb","bcba","accbcc","cac","bcaacc","bbaabaac","cbccccaac","cacabb","cbbbbbaca","aaac","cbb","bcabcbab","cbacb","aca","babccac","aac","bbcc","cabcab","bbaba","bcbbaacbc","caabbb","cbcbac","bccb","abacbaa","cbaa","babcb","abcbcacb","bcaacbac","bbcaba","cbabba","bbc","cbabbbacc","cbccac","accbbcbb","cbbaabbb","accabac","abcbaabca","cbbbab","cabbababa","cbabbab","ccbcacab","accbbbabc"]
		const strings = get_independent_strings(arr)
		expect(strings.length).toBe(90)
	})
})

// @ts-ignore Used to generate test arrays like the ones above.
function generate_random_string_array(
	array_length: number,
	max_str_length: number,
	chars: string[],
): string[] {
	const res = []
	for (let i = 0; i < array_length; i++) {
		let str = ""
		const str_length = Math.floor(Math.random() * (max_str_length - 1)) + 1
		for (let j = 0; j < str_length; j++) {
			const char_ind = Math.floor(Math.random() * chars.length)
			str += chars[char_ind]
		}
		res.push(str)
	}
	return Array.from(new Set(res))
}
