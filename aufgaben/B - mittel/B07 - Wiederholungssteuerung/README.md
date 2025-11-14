# Wiederholungssteuerung

## Aufgabe

Implementiere eine Funktion, die eine Funktion mehrfach mit einer gewissen Verzögerung ausführt. (Eine Art `setInterval`, nur mit zusätzlicher Abbruchbedingung.)

Genauer gesagt, implementiere eine Funktion `repeat_with_delay(fn, delay, repetitions)`, die eine Funktion, eine Verzögerung, sowie eine Anzahl von Wiederholungen erwartet. Führt man diese aus, wird die ursprüngliche Funktion entsprechend oft ausgeführt, aber dazwischen wird immer gewartet.

## Beispiel

**Eingabe**

```js
const log_time = () => console.info(new Date().toLocaleTimeString("DE-de"))

const log_time_3_times = repeat_with_delay(log_time, 1000, 3)

log_time_3_times()
```

**Ausgabe**

```text
15:19:22
15:19:23
15:19:24
```

## Themen

Abschluss, Funktionen höherer Ordnung, Dekorator-Funktion, Scheduling
