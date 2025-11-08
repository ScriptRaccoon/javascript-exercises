/*
Aufgabe: Implementiere eine Funktion, die ein Array entgegennimmt und alle Verschiebungen
(shifts) zurückgibt. Das Ergebnis ist also ein Array von Arrays.
 
Beispiel:
 
shifts([2,3,5]) == [[2,3,5], [3,5,2], [5,2,3]]
shifts([]) == [[]]
 
Themen: Schleifen, Arrays, Einstieg, Modulo-Rechnen, Randfälle
*/

/**
 * Berechnet das Array aller Verschiebungen.
 */
function shifts<T>(arr: T[]): T[][] {
	const n = arr.length
	if (n === 0) return [[]]

	const result: T[][] = []

	for (let i = 0; i < n; i++) {
		const shift = arr.slice(i).concat(arr.slice(0, i))
		result.push(shift)
	}

	return result
}

/**
 * Berechnet das Array aller Verschiebungen.
 * Alternative Implementierung.
 */
function shifts_lowlevel<T>(arr: T[]): T[][] {
	const n = arr.length
	if (n === 0) return [[]]

	const result = new Array<T[]>(n)

	for (let i = 0; i < n; i++) {
		const shifted = new Array<T>(n)
		for (let j = 0; j < n; j++) {
			shifted[j] = arr[(i + j) % n]
		}
		result[i] = shifted
	}

	return result
}

/* ------ TESTS ------ */
console.info(shifts([2, 3, 5]))
console.info(shifts([]))
