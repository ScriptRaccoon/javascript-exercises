/**
 * Dekorator-Funktion, die eine Funktion innerhalb eines Intervals auf nur eine
 * Ausführung beschränkt und weitere Aufrufe später ausführt.
 */
export function limit<T extends (...args: any[]) => void>(fn: T, interval: number) {
	type P = Parameters<T>

	const queue: P[] = []
	let running = false

	function run() {
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
const log_date = (msg: string) => console.info(new Date().toLocaleString("DE-de"), msg)
const log_date_limited = limit(log_date, 1000)

log_date_limited("a")
log_date_limited("b")
log_date_limited("c")
log_date_limited("d")
