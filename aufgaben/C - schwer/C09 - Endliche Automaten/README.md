# Aufgabe

Entwickle eine Klasse, die einen endlichen deterministischen Automaten (DEA) modelliert, vgl. [Wikipedia](https://de.wikipedia.org/wiki/Deterministischer_endlicher_Automat). Der Konstruktur soll 5 Objekte entgegennehmen:

- ein Array `states` von Strings, genannt _Zustände_
- ein _Startzustand_ `start_state`
- ein Array `alphabet` von Zeichen, genannt _Alphabet_
- ein Array von _Endzuständen_ `final_states`
- eine Übergangsfunktion `Zustände -> (Alphabet -> Zustände)`, die durch ein geschachteltes Objekt modelliert wird (siehe Beispiel unten).

Die TypeScript-Version soll hierbei vollständig typsicher sein, sodass also zum Beispiel kein Zustand in der Übergangsfunktion fehlen darf.

Die Klasse soll außerdem

1. eine Methode `accepts(input)` bereitstellen, welche feststellt, ob ein Eingabetext `input` vom Automaten akzeptiert wird, also nach der Verarbeitung jedes Zeichens in einem Endzustand landet. Wenn ein Zeichen nicht im Alphabet vorkommt, soll ein Fehler geworfen werden.

2. eine Methode `process(input)` bereitstellen, die die Verarbeitung des Eingabetextes `input` Schritt für Schritt grafisch ansprechend in der Konsole darstellt (siehe Beispiel unten).

# Beispiele

Dieser DFA akzeptiert Strings, die höchstens zwei b enthalten.

```js
const dfa = new DFA({
	states: ["q0", "q1", "q2", "q3"],
	alphabet: ["a", "b"],
	start_state: "q0",
	final_states: ["q0", "q1", "q2"],
	transitions: {
		q0: { a: "q0", b: "q1" },
		q1: { a: "q1", b: "q2" },
		q2: { a: "q2", b: "q3" },
		q3: { a: "q3", b: "q3" },
	},
})
```

| Eingabe                   | Ausgabe      |
| ------------------------- | ------------ |
| `dfa.accepts("aaaaaaaa")` | `true`       |
| `dfa.accepts("aabaabaa")` | `true`       |
| `dfa.accepts("aabaabaa")` | `false`      |
| `dfa.accepts("bbbaabab")` | `false`      |
| `dfa.accepts("abc")`      | wirft Fehler |

---

**Eingabe**

```js
dfa.process("bbaaabaa")
```

**Ausgabe**

```text
[b]b a a a b a a   |  q0 ---b---> q1
 b[b]a a a b a a   |  q1 ---b---> q2
 b b[a]a a b a a   |  q2 ---a---> q2
 b b a[a]a b a a   |  q2 ---a---> q2
 b b a a[a]b a a   |  q2 ---a---> q2
 b b a a a[b]a a   |  q2 ---b---> q3
 b b a a a b[a]a   |  q3 ---a---> q3
 b b a a a b a[a]  |  q3 ---a---> q3

final state: q3
accepted: false
```

Das ist nur ein Beispiel. Wie die Ausgabe von `.process` im Detail aussieht, ist dir überlassen.

# Themen

Automaten, Klassen, Strings
