export function describe(title: string, callback: () => void) {
	console.info(`Test: ${title}`)
	callback()
	console.info("")
}

export function expect(left: any) {
	return {
		toBe(right: any) {
			if (left === right) {
				process.stdout.write(" ✅")
			} else {
				process.stdout.write(` ❌\n... Expected ${left} to equal ${right}`)
			}
		},
	}
}

export function test(description: string, callback: () => void) {
	process.stdout.write(`... ${description}`)
	callback()
	console.info("")
}
