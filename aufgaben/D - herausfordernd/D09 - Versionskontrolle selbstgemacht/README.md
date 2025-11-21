# Versionskontrolle selbstgemacht

## Aufgabe

Entwickle ein System für die Versionskontrolle mit Commits und Branches, ähnlich wie Git.

_Commits_ enthalten Daten, die in diesem Fall einfach Schlüssel-Wert-Paare sind, wobei die Schlüssel Strings und die Werte Zahlen oder `null` sind:

```json
{ "a": 10, "b": null }
```

Commits können aneinander gehangen werden. Genauer zeigt jeder Commit (bis auf den Root-Commit) auf einen vorherigen Commit:

```text
          { "a": 1 }    { "b": 2 }
            /             /
ROOT <-- COMMIT_1 <--- COMMIT_2 <--- ...
```

In jedem Commit kann man den Wert für einen Schlüssel auslesen, der eventuell auch bereits von vorigen Commits gesetzt worden ist. Im obigen Beispiel wäre also `a = 1` und `b = 2` in `COMMIT_2`.

Die Daten sind in einem Commit unveränderlich gespeichert. Eine "Veränderung" kann nur durch einen späteren Commit erfolgen. Wenn ein Wert gelöscht werden soll, setzt man ihn auf `null`:

```text
          { "a": 1 }    { "a": null }
            /             /
ROOT <-- COMMIT_1 <--- COMMIT_2 <--- ...
```

Zur besseren Unterscheidung bekommt jeder Commit eine eindeutige ID.

Ein _Branch_ (Zweig) besteht aus einem Namen und einem Zeiger auf einen Commit, die Spitze des Branches:

```text

           MAIN          FEAT
            |             |
            v             v
ROOT <-- COMMIT_1 <--- COMMIT_2 <--- ...
```

Wenn man in einem Branch commitet, wird der Zeiger auf den neuen Commit gesetzt. Die Daten kann man auch bei einem Branch auslesen, was einfach die Daten des letzten Commits sind.

Branches sollen außerdem die folgenden Funktionalitäten haben:

- Die gesamte Historie der vorigen Commits lässt sich auflisten.

- Es lässt sich der letzte Commit entfernen. Dadurch wird er nicht zerstört, sondern lediglich der Zeiger des Branches verändert:

    ```text
                            MAIN
                             |
                             v
    ROOT <-- COMMIT_1 <-- COMMIT_2
    ```

    ```text
               MAIN
                |
                v
    ROOT <-- COMMIT_1 <-- COMMIT_2
    ```

- Allgeminer lässt sich ein Branch auf einen vorherigen Commit zurücksetzen:

    ```text
                                        MAIN
                                         |
                                         v
    ROOT <-- COMMIT_1 <-- COMMIT_2 <-- COMMIT_3
    ```

    ```text
               MAIN
                |
                v
    ROOT <-- COMMIT_1 <-- COMMIT_2 <-- COMMIT_3
    ```

- Ein vorheriger Commit lässt sich rückgängig machen: dadurch wird am Ende ein neuer Commit angehangen, dessen Daten die Änderungen rückgängig machten.

    ```text
             {"a": 1}   {"a": 2, "b": 3}   {"a": 1, "b": null}
                /             /             /
    ROOT <-- COMMIT_1 <-- COMMIT_2 <--- COMMIT_2_REV
    ```

- Zwei Branches lassen sich _mergen_ (zusammenführen). Dadurch werden sämtliche Commits eines Branches nach der Abzweigung vom Hauptbranch zu einem _Merge Commit_ zusammengefasst, und dieser wird dem Hauptbranch angehangen. Es kann dabei _Merge Conflicts_ geben, wenn der Hauptbranch andere Änderungen an denselben Daten vorgenommen hat. In diesem Fall wird ein Fehler ausgeworfen.

    ```text
    ROOT <--- COMMIT_1 <--- COMMIT_2 <--- COMMIT_3 (MAIN)
                 |
                  ---- COMMIT_4 <--- COMMIT_5 (FEAT)
    ```

    ```text
    ROOT <--- COMMIT_1 <--- COMMIT_2 <--- COMMIT_3 <--- MERGE_COMMIT (MAIN)
    ```

Um diese Form der Versionskontrolle zu realisieren, entwickle zwei Klassen `Commit` und `Branch` mit entsprechenden Klassenmethoden.

## Beispiele

**Commits**

```ts
const root = new Commit()
const commit_1 = root.commit({ a: 1, c: 3 })
const commit_2 = commit_1.commit({ a: 2, b: 1 })

console.info(commit_2.get("a")) // 2
console.info(commit_2.get("b")) // 1
console.info(commit_2.get("c")) // 3
console.info(commit_2.to_json()) // { a: 2, c: 3, b: 1 }

const commit_3 = commit_2.commit({ a: null })

console.info(commit_2.get("a")) // 2 (did not change!)
console.info(commit_3.get("a")) // null
```

**Branches**

```ts
// --- GRUNDLAGEN ---

const root = new Commit()
const main = new Branch("main", root)

main.commit({ a: 1, b: 2, c: 3 })
main.commit({ a: 2, b: null, c: 5 })

/*
Commit history of main:
• z8ijey: {"a":2,"b":null,"c":5}
• nia8lk: {"a":1,"b":2,"c":3}
• zjz4d3: {} (ROOT)
*/
main.log()

console.info(main.to_json()) // { a: 2, c: 5 }

// --- COMMITS RÜCKGÄNGIG MACHEN ---

main.drop_last_commit()

console.info(main.to_json()) // { a: 1, b: 2, c: 3 }
const base = main.tip
console.info(base.data) // { a: 1, b: 2, c: 3 }

main.commit({ x: 1 })
main.commit({ y: 2 })

console.info(main.to_json()) // { a: 1, b: 2, c: 3, x: 1, y: 2 }

main.reset(base)

console.info(main.to_json()) // { a: 1, b: 2, c: 3 }
console.info(main.tip === base) // true

/*
Commit history of main:
• nia8lk: {"a":1,"b":2,"c":3}
• zjz4d3: {} (ROOT)
*/
main.log()

const commit_1 = main.commit({ a: 2 })
const commit_2 = main.commit({ b: null })
console.info(main.to_json()) // { a: 2, c: 3 }

main.revert(commit_1)
console.info(main.to_json()) // { a: 1, c: 3 }

main.revert(commit_2)
console.info(main.to_json()) // { a: 1, b: 2, c: 3 }

/*
Commit history of main:
• vnrqy5: {"b":2}
• e8s2j4: {"a":1}
• 2yv2ac: {"b":null}
• m8u08w: {"a":2}
• nia8lk: {"a":1,"b":2,"c":3}
• zjz4d3: {} (ROOT)
*/
main.log()

main.reset(root)
console.info(main.to_json()) // {}

/*
Commit history of main:
• zjz4d3: {} (ROOT)
*/
main.log()

// --- BRANCHES MERGEN ----

main.commit({ x: 0 })

const feat = new Branch("feat", main)

main.commit({ a: 1 })
main.commit({ b: 2 })
main.commit({ c: 3 })

feat.commit({ a: 1 })
feat.commit({ d: 4 })

console.info(main.to_json()) // { x: 0, a: 1, b: 2, c: 3 }
console.info(feat.to_json()) // { x: 0, a: 1, d: 4 }

main.merge(feat)

console.info(main.to_json()) // { x: 0, a: 1, b: 2, c: 3, d: 4 }
/*
• ccgn97: {"a":1,"d":4} 
• fi3a35: {"c":3}
• b0rkmc: {"b":2}
• oasm50: {"a":1}
• ny2jd9: {"x":0}
• zjz4d3: {} (ROOT)
*/
main.log()
```

## Themen

Versionskontrolle, Git, Bäume, Graphen, Klassen
