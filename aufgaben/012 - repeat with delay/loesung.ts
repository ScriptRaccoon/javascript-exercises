/**
 * Repeats a function a number of times with a given delay
 */
function repeat_with_delay(fn: () => unknown, delay: number, repetitions: number) {
	let counter = 0

	function run() {
		fn()
		counter++
		if (counter >= repetitions) return
		setTimeout(run, delay)
	}

	return run
}

/* ------ TESTS ------ */
const log_time = () => console.info(new Date().toLocaleTimeString("DE-de"))
const log_time_5_times = repeat_with_delay(log_time, 1000, 5)
log_time_5_times()
