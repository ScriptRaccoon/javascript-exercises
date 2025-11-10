/**
 * Wiederholt eine Funktion mit Verzögerungen und einer
 * maximalen Anzahl von Wiederholungen
 */
function repeat_with_delay(fn, delay, repetitions) {
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
