import { get_monic_irreducible, stringify_poly } from "./loesung"

console.time("c")
console.info(stringify_poly(get_monic_irreducible(200, 2)!)) // X^200 + X^5 + X^3 + X^2 + 1
console.timeEnd("c") // 501.117ms (MEDIUM)

console.time("c")
console.info(stringify_poly(get_monic_irreducible(44, 11)!)) // X^44 + X^2 + 4X + 7
console.timeEnd("c") // 588.789ms (MEDIUM)

console.time("c")
console.info(stringify_poly(get_monic_irreducible(34, 19)!)) // X^34 + X^2 + 2X + 16
console.timeEnd("c") // 1.676s (SLOW)

console.time("c")
console.info(stringify_poly(get_monic_irreducible(60, 13)!)) // X^60 + 2X^2 + X + 1
console.timeEnd("c") // 5.339s (SLOW)
