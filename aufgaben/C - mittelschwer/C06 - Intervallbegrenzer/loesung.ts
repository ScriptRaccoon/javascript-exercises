/**
 * Dekorator-Funktion, die eine Funktion innerhalb eines Intervals auf nur eine
 * Ausführung beschränkt und weitere Aufrufe in diesem Interval später ausführt.
 */
function limit<T extends (...args: any[]) => void>(fn: T, interval: number) {
	type P = Parameters<T>

	const queue: P[] = []
	let running = false

	function run(): void {
		if (queue.length === 0) {
			running = false
			return
		}

		running = true

		const args = queue.shift()!
		fn(...args)

		setTimeout(run, interval)
	}

	return (...args: P) => {
		queue.push(args)
		if (!running) run()
	}
}

/* ------ TESTS ------ */

const send_message = (msg: string) => {
	const time = new Date().toLocaleTimeString("DE-de")
	console.info(`${time} - sending message: ${msg}`)
}

const send_message_limited = limit(send_message, 1000)

send_message_limited("a") // 15:09:48 - sending message: a
send_message_limited("b") // 15:09:49 - sending message: b
send_message_limited("c") // 15:09:50 - sending message: c
send_message_limited("d") // 15:09:51 - sending message: d
