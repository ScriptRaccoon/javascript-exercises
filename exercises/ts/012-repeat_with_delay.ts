/*
Aufgabe: Implementiere eine Funktion, die eine Funktion mehrfach mit einer gewissen
Verzögerung ausführt. (Eine Art setInterval, nur mit zusätzlicher Abbruchbedingung.)

Genauer gesagt, implementiere eine Funktion repeat_with_delay(fn, delay, repetitions),
die eine Funktion, eine Verzögerung, sowie eine Anzahl von Wiederholungen erwartet.
Führt man diese aus, wird die ursprüngliche Funktion entsprechend oft ausgeführt,
aber dazwischen wird immer gewartet.

Beispiel:

const log_time = () => console.info(new Date().toLocaleTimeString("DE-de"))
const log_time_5_times = repeat_with_delay(log_time, 1000, 5)
log_time_5_times()

Dann wird die Uhrzeit 5 mal in die Konsole geschrieben, mit einer Verzögerung von 1s.

Themen: Funktion höherer Ordnung, Timeout
*/

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
