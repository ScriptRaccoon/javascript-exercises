# Aufgabe

Implementiere eine Funktion, die die Stärke eines Passworts bestimmt.
Die Stärke ist standardmäßig 0, und jede der folgenden Kriterien erhöht sie um 1.

-   mind. 8 Zeichen
-   mind. 12 Zeichen (Zusatzpunkt)
-   mind. 16 Zeichen (Zusatzpunkt)
-   mind. ein Großbuchstabe
-   mind. ein Kleinbuchstabe
-   mind. eine Ziffer
-   mind. ein Sonderzeichen

Die maximale Stärke wäre hier also 7.

# Beispiel

```js
password_strength("test") == 1;
password_strength("Test_1997") == 5;
password_strength("hCq{}!w$mGg#,)4$plYw") == 7;
```

# Bonusaufgabe

Vergib einen Punktabzug, wenn das Passwort eines der gängigen Wörter
(z. B. _test_, _passwort_, _test_, usw.) beinhaltet. Dann wäre z. B.
`password_strength("Test_1997") == 4`.

# Themen

Strings, reguläre Ausdrücke, Fallunterscheidungen
