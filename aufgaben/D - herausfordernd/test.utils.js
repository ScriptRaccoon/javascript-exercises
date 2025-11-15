export function describe(title, callback) {
	console.info(`Test: ${title}`)
	callback()
	console.info("")
}

export function expect(left) {
	return {
		toBe(right) {
			if (left === right) {
				process.stdout.write(" ✅")
			} else {
				process.stdout.write(` ❌\n... Expected ${left} to equal ${right}`)
			}
		},
	}
}

export function test(description, callback) {
	process.stdout.write(`... ${description}`)
	callback()
	console.info("")
}
