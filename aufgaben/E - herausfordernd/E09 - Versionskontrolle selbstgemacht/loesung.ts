type Data = Record<string, number | null>

type Diff =
	| {
			type: "insert"
			key: string
			val: number
	  }
	| {
			type: "replace"
			key: string
			val: number
			old: number
	  }
	| {
			type: "delete"
			key: string
			old: number
	  }

export class Commit {
	readonly id: string
	readonly data: Data
	readonly parent: Commit | null
	readonly depth: number

	constructor(data: Data = {}, parent: Commit | null = null) {
		this.id = this.generate_id()
		this.data = Object.assign({}, data)
		this.parent = parent
		this.depth = this.parent ? this.parent.depth + 1 : 0
	}

	private generate_id(): string {
		return Math.random().toString(36).slice(2, 8)
	}

	commit(data: Data): Commit {
		return new Commit(data, this)
	}

	get(key: string): number | null {
		if (key in this.data) return this.data[key]
		if (this.parent) return this.parent.get(key)
		return null
	}

	private keys(): string[] {
		const result = this.parent
			? this.parent.keys().concat(Object.keys(this.data))
			: Object.keys(this.data)
		return [...new Set(result)]
	}

	to_json(): Data {
		const json: Data = {}
		for (const key of this.keys()) {
			const val = this.get(key)
			if (val !== null) json[key] = val
		}
		return json
	}

	includes(commit: Commit): boolean {
		return this == commit || (this.parent !== null && this.parent.includes(commit))
	}

	log(recursive = false): void {
		const mark = this.parent ? "" : " (ROOT)"
		const prefix = recursive ? "• " : ""
		const line = `${prefix}${this.id}: ${JSON.stringify(this.data)}${mark}`
		console.info(line)
		if (recursive && this.parent) this.parent.log(recursive)
	}

	get_diffs(): Diff[] {
		const diffs: Diff[] = []

		for (const [key, val] of Object.entries(this.data)) {
			const old = this.parent ? this.parent.get(key) : null

			if (val !== null && old === null) {
				diffs.push({ type: "insert", key, val })
			} else if (val !== null && old !== null) {
				diffs.push({ type: "replace", key, val, old })
			} else if (val === null && old !== null) {
				diffs.push({ type: "delete", key, old })
			}
		}

		return diffs
	}

	static lca(a: Commit, b: Commit): Commit | null {
		let low = a.depth < b.depth ? a : b
		let high = a.depth < b.depth ? b : a

		while (low.depth < high.depth && high.parent) high = high.parent

		while (low !== high) {
			if (!low.parent || !high.parent) return null
			low = low.parent
			high = high.parent
		}

		return low
	}
}

export const ROOT_COMMIT = new Commit()

export class Branch {
	name: string
	tip: Commit

	constructor(name: string, from: Commit | Branch) {
		this.name = name
		this.tip = from instanceof Branch ? from.tip : from
	}

	commit(data: Data): Commit {
		const new_commit = this.tip.commit(data)
		this.tip = new_commit
		return this.tip
	}

	get(key: string): number | null {
		return this.tip.get(key)
	}

	drop_last_commit(): void {
		if (!this.tip.parent) {
			throw new Error("Root cannot be dropped.")
		}
		this.tip = this.tip.parent
	}

	to_json(): Data {
		return this.tip.to_json()
	}

	print_json(): void {
		console.info(this.to_json())
	}

	reset(commit: Commit): void {
		const valid = this.tip.includes(commit)
		if (!valid) {
			throw new Error(`Commit ${commit.id} does not belong to the branch history.`)
		}
		while (this.tip !== commit) this.drop_last_commit()
	}

	log(): void {
		console.info(`Commit history of ${this.name}:`)
		this.tip.log(true)
	}

	revert(commit: Commit): Commit {
		const valid = this.tip.includes(commit)
		if (!valid) {
			throw new Error(`Commit ${commit.id} does not belong to the branch history.`)
		}

		if (!commit.parent) {
			throw new Error("The root commit cannot be reverted.")
		}

		const diffs = commit.get_diffs()

		const reverts: Data = {}

		for (const diff of diffs) {
			switch (diff.type) {
				case "insert":
					reverts[diff.key] = null
					break
				case "replace":
					reverts[diff.key] = diff.old
					break
				case "delete":
					reverts[diff.key] = diff.old
					break
			}
		}

		return this.commit(reverts)
	}

	merge(branch: Branch, logging = true): Commit {
		if (logging) console.info(`Merge ${branch.name} into ${this.name}...`)

		const ancestor = Commit.lca(this.tip, branch.tip)

		if (!ancestor) {
			throw new Error("No common ancestor found. Merge failed.")
		}

		const merge_data: Data = {}

		const commits_to_merge: Commit[] = []
		let commit_to_merge = branch.tip

		while (commit_to_merge !== ancestor) {
			commits_to_merge.push(commit_to_merge)
			commit_to_merge = commit_to_merge.parent!
		}

		if (commits_to_merge.length === 0) {
			if (logging) console.info("Nothing to merge.")
			return this.tip
		}

		commits_to_merge.reverse()

		for (const commit of commits_to_merge) {
			if (logging) console.info(`Merge commit ${commit.id}...`)
			for (const [key, val] of Object.entries(commit.data)) {
				const current = this.get(key)
				const old = ancestor.get(key)
				if (current !== old && val !== old && current !== val) {
					throw new Error(
						`Merge conflict: ${key} has been changed to ${current} in ${this.name}, but to ${val} in ${branch.name}.`,
					)
				}
				merge_data[key] = val
			}
		}

		const merge_commit = this.commit(merge_data)
		this.tip = merge_commit

		if (logging) console.info("Merge is complete.")

		return this.tip
	}
}

// @ts-expect-error This function is only executed when needed.
function test_functions() {
	const root = new Commit()
	const main = new Branch("main", root)
	main.commit({ a: 1, b: 2, c: 3 })
	main.commit({ a: 2, b: null, c: 5 })
	/*
	Commit history of main:
	• z8ijey: {"a":2,"b":null,"c":5}
	• nia8lk: {"a":1,"b":2,"c":3}
	• zjz4d3: {} (ROOT)
	*/
	main.log()
	console.info(main.to_json()) // { a: 2, c: 5 }
	main.drop_last_commit()
	console.info(main.to_json()) // { a: 1, b: 2, c: 3 }
	const base = main.tip
	console.info(base.data) // { a: 1, b: 2, c: 3 }
	main.commit({ x: 1 })
	main.commit({ y: 2 })
	console.info(main.to_json()) // { a: 1, b: 2, c: 3, x: 1, y: 2 }
	main.reset(base)
	console.info(main.to_json()) // { a: 1, b: 2, c: 3 }
	console.info(main.tip === base) // true

	/*
	Commit history of main:
	• nia8lk: {"a":1,"b":2,"c":3}
	• zjz4d3: {} (ROOT)
	*/
	main.log()

	const commit_1 = main.commit({ a: 2 })
	const commit_2 = main.commit({ b: null })
	console.info(main.to_json()) // { a: 2, c: 3 }
	main.revert(commit_1)
	console.info(main.to_json()) // { a: 1, c: 3 }
	main.revert(commit_2)
	console.info(main.to_json()) // { a: 1, b: 2, c: 3 }
	/*
	Commit history of main:
	• vnrqy5: {"b":2}
	• e8s2j4: {"a":1}
	• 2yv2ac: {"b":null}
	• m8u08w: {"a":2}
	• nia8lk: {"a":1,"b":2,"c":3}
	• zjz4d3: {} (ROOT)
	*/
	main.log()
	main.reset(root)
	console.info(main.to_json()) // {}

	/*
	Commit history of main:
	• zjz4d3: {} (ROOT)
	*/
	main.log()
	main.commit({ x: 0 })
	const feat = new Branch("feat", main)
	main.commit({ a: 1 })
	main.commit({ b: 2 })
	main.commit({ c: 3 })
	feat.commit({ a: 1 })
	feat.commit({ d: 4 })
	console.info(main.to_json()) // { x: 0, a: 1, b: 2, c: 3 }
	console.info(feat.to_json()) // { x: 0, a: 1, d: 4 }
	main.merge(feat)
	console.info(main.to_json()) // { x: 0, a: 1, b: 2, c: 3, d: 4 }
	/*
	• ccgn97: {"a":1,"d":4} 
	• fi3a35: {"c":3}
	• b0rkmc: {"b":2}
	• oasm50: {"a":1}
	• ny2jd9: {"x":0}
	• zjz4d3: {} (ROOT)
	*/
	main.log()
}
