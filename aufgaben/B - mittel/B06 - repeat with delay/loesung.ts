/**
 * Wiederholt eine Funktion mit Verzögerung und einer maximalen Anzahl von Wiederholungen.
 */
function repeat_with_delay<T extends (...args: any[]) => void>(
	fn: T,
	delay: number,
	repetitions: number,
): T {
	let counter = 0

	function run(...args: Parameters<T>) {
		fn(...args)
		counter++
		if (counter >= repetitions) return
		setTimeout(() => {
			run(...args)
		}, delay)
	}

	return run as T
}

/* ------ TESTS ------ */

const log_time = () => console.info(new Date().toLocaleTimeString("DE-de"))

const log_time_3_times = repeat_with_delay(log_time, 1000, 3)

/*
15:19:22
15:19:23
15:19:24
*/
log_time_3_times()
