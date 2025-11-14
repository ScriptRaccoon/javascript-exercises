# Textvorlagen ausfüllen

## Aufgabe

Schreibe eine Funktion, welche eine Textvorlage mit Werten aus einem Datenobjekt ausfüllt. Dabei wird jeweils ein Textabschnitt der Form `{{ name }}` durch den entsprechenden Wert ersetzt.

## Beispiel

**Eingabe**

```js
const txt = "Hallo {{ first_name }} {{ last_name }}, willkommen im Jahr {{ year }}."
const data = { first_name: "Gregor", last_name: "Samsa", year: 1912 }
fill_template(txt, data)
```

**Ausgabe**

```text
"Hallo Gregor Samsa, willkommen im Jahr 1912."
```

## Themen

Strings, Schleifen
