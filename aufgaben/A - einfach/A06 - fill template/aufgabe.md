# Aufgabe

Schreibe eine Funktion `fill_template(txt, data)`, welche eine Textvorlage
mit Werten aus einem Objekt ausfüllt und den veränderten Text zurückgibt.
Dabei wird jeweils ein Textabschnitt der Form `{{ name }}` durch den entsprechenden Wert ersetzt.

# Beispiel

```js
const txt = "Hallo {{ first_name }} {{ last_name }}, willkommen im Jahr {{ year }}.";
const data = { first_name: "Gregor", last_name: "Samsa", year: 1912 };

fill_template(txt, data) == "Hallo Gregor Samsa, willkommen im Jahr 1912.";
```

# Themen

Strings
