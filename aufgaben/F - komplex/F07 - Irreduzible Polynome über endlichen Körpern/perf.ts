import { is_irreducible } from "./loesung"

console.time("c")
console.info(is_irreducible([2, 1, 0, 0, 0, 0, 1], 5)) // X^6 + X + 2 (mod 5)
console.timeEnd("c") // 3.731ms (FAST)

console.time("c")
console.info(is_irreducible([2, 0, 0, 0, 0, 0, 0, 0, 0, 1], 7)) // X^9 + 2 (mod 7)
console.timeEnd("c") // 7.827ss (SLOW)
