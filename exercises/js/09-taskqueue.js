/**
 * Aufgabe: Schreibe eine generische Klasse, die asynchrone Aufgaben nacheinander ausführt.
 *
 * Beispiel: In einem Drehpuzzle kann ein User mehrere Züge schnell nacheinander anklicken;
 * sie dürfen aber nicht parallel, sondern müssen nacheinander verarbeitet und animiert werden.
 * (Beispiel: {@link https://loopster.netlify.app/})
 * Ein solcher Zug könnte durch eine Koordinate gegeben sein, wo der User geklickt hat.
 * Wir simulieren die Verarbeitung hier mit einem Promise, das einfach eine Sekunde lang abwartet.
 *
 * const process_move = async (coord) => { ...siehe unten... }
 *
 * Die Klasse `TaskQueue` können wir damit nun initialisieren:
 *
 * const queue = new TaskQueue(process_move)
 *
 * Die Klasse soll eine Methode .enqueue() besitzen, mit der wir neue Aufgaben
 * hinzufügen können:
 *
 * queue.enqueue(0)
 * queue.enqueue(4)
 * queue.enqueue(1)
 *
 * Die Aufgaben sollen hier nacheinander, also mit einem Abstand von einer Sekunde bearbeitet werden.
 *
 * Themen: Klassen, objektorientierte Programmierung, Promises, Abstraktion
 */

const process_move = (coord) => {
	return new Promise((res) =>
		setTimeout(() => {
			console.info("Move has been processed at coordinate", coord)
			res()
		}, 1000),
	)
}

export class TaskQueue {
	constructor(execute_task) {
		this.tasks = []
		this.processing = false
		this.execute_task = execute_task
	}

	enqueue(task) {
		this.tasks.push(task)
		if (!this.processing) {
			this.process_next()
		}
	}

	async process_next() {
		if (this.processing) return
		this.processing = true
		while (this.tasks.length > 0) {
			const task = this.tasks.shift()
			await this.execute_task(task)
		}
		this.processing = false
	}
}

const queue = new TaskQueue(process_move)

queue.enqueue(0)
queue.enqueue(4)
queue.enqueue(1)
