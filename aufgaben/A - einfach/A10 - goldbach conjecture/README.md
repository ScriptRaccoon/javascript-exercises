# Kontext

Die Goldbach-Vermutung aus der Mathematik besagt, dass jede gerade Zahl > 2
als Summe von zwei Primzahlen geschrieben werden kann. Sie ist bis heute offen.

# Aufgabe

Schreibe eine Funktion `verify_goldbach(n)`, welche die Goldbach-Vermutung
für eine gerade Zahl `n` prüft und eine entsprechende Zerlegung in die Konsole schreibt.
Es müssen nicht alle Zerlegungen bestimmt werden; eine reicht aus.
Schreibe außerdem eine Funktion `verify_goldbachs(n)`, welche die Vermutung für alle
geraden Zahlen `<= n` überprüft und jeweils eine Zerlegung ausgibt.

# Beispiel

```js
verify_goldbachs(12);
```

druckt

```text
4 = 2 + 2
6 = 3 + 3
8 = 3 + 5
10 = 3 + 7
12 = 5 + 7
```

# Themen

Arithmetik, Mathematik, Primzahlen, Schleifen
