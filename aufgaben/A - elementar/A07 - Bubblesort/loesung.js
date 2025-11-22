/**
 * Implementiert den Bubblesort-Algorithmus für ein Array von Zahlen.
 * Dieses wird an Ort und Stelle modifiziert.
 * Es wird kein neues Array zurückgegeben.
 */
function bubble_sort(arr) {
	for (let m = arr.length - 1; m >= 0; m--) {
		let swapped = false
		for (let i = 0; i < m; i++) {
			if (arr[i] > arr[i + 1]) {
				swapped = true
				const temp = arr[i]
				arr[i] = arr[i + 1]
				arr[i + 1] = temp
			}
		}
		if (!swapped) return
	}
}

/* ------ TESTS ------ */

const arr = [
	42, 31, 12, 52, 29, 92, 99, 77, 87, 45, 30, 7, 12, 72, 69, 94, 98, 69, 25, 66,
]

bubble_sort(arr)

// [ 7, 12, 12, 25, 29, 30, 31, 42, 45, 52, 66, 69, 69, 72, 77, 87, 92, 94, 98, 99 ]
console.info(arr)
