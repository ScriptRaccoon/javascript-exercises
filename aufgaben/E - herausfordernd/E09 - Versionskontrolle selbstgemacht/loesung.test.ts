import { describe, it, expect } from "vitest"
import { Branch, Commit } from "./loesung"

describe("Commit class", () => {
	describe("commit", () => {
		it("creates a commit with only the new data", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1 })
			expect(root.data).toEqual({ a: 0 })
			expect(commit.data).toEqual({ b: 1 })
		})

		it("does not change the previous commit", () => {
			const root = new Commit({ a: 0 })
			root.commit({ a: 1 })
			expect(root.data).toEqual({ a: 0 })
		})

		it("supports adding multiple values", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1, c: 2 })
			expect(commit.data).toEqual({ b: 1, c: 2 })
		})

		it("supports deleting values", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ a: null })
			expect(commit.get("a")).toEqual(null)
		})

		it("is chainable", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1 }).commit({ c: 2 })
			expect(commit.data).toEqual({ c: 2 })
			expect(commit.to_json()).toEqual({ a: 0, b: 1, c: 2 })
		})
	})

	describe("get", () => {
		it("returns the current value, also using previous commits", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1 })
			expect(commit.get("a")).toBe(0)
			expect(commit.get("b")).toBe(1)
		})

		it("returns 'null' for unknown keys", () => {
			const root = new Commit({ a: 0 })
			expect(root.get("x")).toBe(null)
		})
	})

	describe("to_json", () => {
		it("returns the JSON data with all current values", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1 })
			expect(commit.to_json()).toEqual({ a: 0, b: 1 })
		})

		it("does not contain deleted values", () => {
			const root = new Commit({ a: 0 })
			const commit = root.commit({ b: 1 }).commit({ a: null })
			expect(commit.to_json()).toEqual({ b: 1 })
		})
	})

	describe("includes", () => {
		it("returns true if the commit comes before", () => {
			const root = new Commit()
			const commit1 = root.commit({})
			const commit2 = commit1.commit({})
			const commit3 = commit2.commit({})
			expect(commit3.includes(commit1)).toBe(true)
		})

		it("returns false if the commit does not come before", () => {
			const root = new Commit()
			const commit1 = root.commit({})
			const commit2 = root.commit({})
			expect(commit2.includes(commit1)).toBe(false)
		})
	})

	describe("get_diffs", () => {
		it("detects insertions", () => {
			const root = new Commit()
			const commit1 = root.commit({ a: 1 })
			const commit2 = commit1.commit({ b: 2 })
			expect(commit2.get_diffs()).toEqual([
				{
					type: "insert",
					key: "b",
					val: 2,
				},
			])
		})

		it("detects replacements", () => {
			const root = new Commit()
			const commit1 = root.commit({ a: 1 })
			const commit2 = commit1.commit({ a: 2 })
			expect(commit2.get_diffs()).toEqual([
				{
					type: "replace",
					key: "a",
					val: 2,
					old: 1,
				},
			])
		})

		it("detects deletions", () => {
			const root = new Commit()
			const commit1 = root.commit({ a: 1 })
			const commit2 = commit1.commit({ a: null })
			expect(commit2.get_diffs()).toEqual([
				{
					type: "delete",
					key: "a",
					old: 1,
				},
			])
		})

		it("detects all types of edits at once", () => {
			const root = new Commit()
			const commit1 = root.commit({ a: 1, b: 2, c: 3 })
			const commit2 = commit1.commit({ a: 2, b: null, d: 4 })
			expect(commit2.get_diffs()).toEqual([
				{
					type: "replace",
					key: "a",
					val: 2,
					old: 1,
				},
				{
					type: "delete",
					key: "b",
					old: 2,
				},
				{
					type: "insert",
					key: "d",
					val: 4,
				},
			])
		})
	})

	describe("lca", () => {
		it("detects the least common ancestor", () => {
			const root = new Commit()
			const ancestor = root.commit({ a: 1 })
			const commit1 = ancestor.commit({ b: 1 }).commit({ c: 1 })
			const commit2 = ancestor.commit({ a: 2 }).commit({ b: 2 })
			expect(Commit.lca(commit1, commit2)).toBe(ancestor)
		})

		it("returns 'null' when no common ancestor exists", () => {
			const root1 = new Commit()
			const commit1 = root1.commit({ a: 1 })

			const root2 = new Commit()
			const commit2 = root2.commit({ b: 2 })

			expect(Commit.lca(commit1, commit2)).toBe(null)
		})
	})
})

describe("Branch class", () => {
	describe("constructor", () => {
		it("points to a commit", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			expect(main.tip).toBe(root)
		})

		it("accepts branches as source", () => {
			const root = new Commit()
			const commit = root.commit({ a: 1 })
			const main = new Branch("main", commit)
			main.commit({ a: 2 })
			const feat = new Branch("feat", main)
			expect(feat.tip).toBe(main.tip)
			expect(feat.get("a")).toBe(2)
		})
	})

	describe("commit", () => {
		it("creates a commit on the tip, updates the tip, and returns it", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const commit = main.commit({ a: 1 })
			expect(commit instanceof Commit).toBe(true)
			expect(main.tip).toBe(commit)
			expect(commit.get("a")).toBe(1)
		})
	})

	describe("get", () => {
		it("gets the value from the tip", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1 })
			main.commit({ b: 2 })
			main.tip.commit({ c: 3 })
			expect(main.get("a")).toBe(1)
			expect(main.get("b")).toBe(2)
			expect(main.get("c")).toBe(null)
		})
	})

	describe("drops_last_commit", () => {
		it("removes the last commit", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const commit1 = main.commit({ a: 1 })
			main.commit({ a: 2, b: 2 })
			main.drop_last_commit()
			expect(main.tip).toBe(commit1)
			expect(main.get("a")).toBe(1)
		})

		it("throws an error when no parent is available", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			expect(() => main.drop_last_commit()).toThrow()
		})
	})

	describe("to_json", () => {
		it("returns the json data of the tip", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1 })
			main.commit({ b: 2 })
			expect(main.to_json()).toEqual({ a: 1, b: 2 })
		})
	})

	describe("reset", () => {
		it("drops all commits after the given one", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const base = main.commit({ a: 1 })
			main.commit({ b: 2 })
			main.commit({ c: 3 })
			main.reset(base)
			expect(main.tip).toBe(base)
			expect(main.get("c")).toBe(null)
		})

		it("throws an error when the commit does not appear in the branch", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1 })
			const base = root.commit({ b: 2 })
			expect(() => main.reset(base)).toThrow()
		})
	})

	describe("revert", () => {
		it("adds a new commit with reverts", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const commit = main.commit({ a: 1 })
			const revert_commit = main.revert(commit)
			expect(main.tip).toBe(revert_commit)
			expect(revert_commit.depth).toBe(2)
			expect(main.get("a")).toBe(null)
		})

		it("reverts all kinds of edits", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1, b: 2, c: 3 })
			const commit = main.commit({ a: 2, b: null, d: 4 })
			main.revert(commit)
			expect(main.to_json()).toEqual({ a: 1, b: 2, c: 3 })
		})

		it("reverts earlier commits", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const bad = main.commit({ a: 1, b: 2, c: 3 })
			main.commit({ a: 10, d: 5 })
			main.revert(bad)
			expect(main.to_json()).toEqual({ d: 5 })
		})

		it("throws an error when the commit is not part of the branch", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1 })
			const base = root.commit({ b: 2 })
			expect(() => main.revert(base)).toThrow()
		})
	})

	describe("merge", () => {
		it("creates a merge commit with new data", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const feat = new Branch("feat", main)

			main.commit({ a: 1 })
			feat.commit({ b: 2 })
			feat.commit({ c: 3 })

			const merge_commit = main.merge(feat)

			expect(merge_commit.data).toEqual({ b: 2, c: 3 })

			expect(main.tip).toBe(merge_commit)
		})

		it("does not change the other branch", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const feat = new Branch("feat", main)

			main.commit({ a: 1 })
			feat.commit({ b: 2 })
			const old_tip = feat.commit({ c: 3 })
			const old_json = feat.to_json()

			main.merge(feat)
			expect(feat.tip).toBe(old_tip)
			expect(feat.to_json()).toEqual(old_json)
		})

		it("handles a complex merge situation", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			main.commit({ a: 1, b: 2, c: 3 })

			const feat = new Branch("feat", main)

			main.commit({ a: 2 })
			main.commit({ a: 3 })
			main.commit({ b: 0 })

			feat.commit({ b: 2 })
			feat.commit({ a: 3, c: 5 })
			feat.commit({ d: null })
			feat.commit({ b: 0 })

			const merge_commit = main.merge(feat)

			expect(merge_commit.data).toEqual({ a: 3, b: 0, c: 5, d: null })

			expect(main.to_json()).toEqual({ a: 3, b: 0, c: 5 })
		})

		it("throws when a merge conflict is detected (1)", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const feat = new Branch("feat", main)
			main.commit({ a: 2 })
			feat.commit({ a: 5 })

			expect(() => main.merge(feat)).toThrow()
		})

		it("throws when a merge conflict is detected (2)", () => {
			const root = new Commit()
			const main = new Branch("main", root)
			const feat = new Branch("feat", main)
			main.commit({ a: 2 })
			main.commit({ b: 10 })
			feat.commit({ a: 2 })
			feat.commit({ b: 2 })

			expect(() => main.merge(feat)).toThrow()
		})
	})
})
