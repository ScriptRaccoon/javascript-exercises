# Aufgabe

Implementiere eine Dekorator-Funktion, die eine Funktion so abändert, dass sie innerhalb eines vorgegebenen Zeitintervalls nur einmal ausgeführt werden kann. Alle zusätzlichen Aufrufe in diesem Interval werden später ausgeführt (das ist der Unterschied zum throttle-Dekorator).

Genauer gesagt, entwickle eine Funktion `limit(fn, interval)`, die eine Funktion `fn` entgegennimmt sowie ein Zeitintervall (in Millisekunden) und eine Funktion zurückgibt, welche `fn` maximal einmal pro Intervall ausführt. Wenn innerhalb des Intervalls die Funktion trotzdem aufgerufen wird, wird dieser Aufruf später ausgeführt.

# Beispiel

**Eingabe**

```js
const send_message = (msg: string) => {
	const time = new Date().toLocaleTimeString("DE-de")
	console.info(`${time} - sending message: ${msg}`)
}

const send_message_limited = limit(send_message, 1000)

send_message_limited("a")
send_message_limited("b")
send_message_limited("c")
send_message_limited("d")
```

**Ausgabe**

```text
15:09:48 - sending message: a
15:09:49 - sending message: b
15:09:50 - sending message: c
15:09:51 - sending message: d
```

Obwohl die vier Funktionsaufrufe von `send_message_limited` im Code unmittelbar hintereinander passieren, wird `send_message` in einem Abstand von einer Sekunde von 1s ausgeführt.

# Themen

Abschluss, Funktionen höherer Ordnung, Dekorator-Funktion, Scheduling
