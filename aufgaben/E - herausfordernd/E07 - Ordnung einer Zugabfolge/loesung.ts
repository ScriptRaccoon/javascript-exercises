import { move_dict, N } from "./cube"
import { Permutation, PermUtils } from "./perm.utils"

/**
 * Represents a move with its number of repetitions.
 */
type MoveToken = {
	letter: string
	repetitions: number
	is_inverse: boolean
}

/**
 * Parses a sequence of moves into an array of move tokens.
 * Throws for invalid sequences.
 */
export function parse_sequence(sequence: string): MoveToken[] {
	const txt = sequence.replace(/\s/g, "")
	let reduced_txt = ""
	const items: MoveToken[] = []

	const regex = /([A-Z])('?)(\d*)/g

	for (const match of txt.matchAll(regex)) {
		reduced_txt += match[0]
		const letter = match[1]
		const is_inverse = match[2].length > 0
		const repetitions = parseInt(match[3] || "1")
		items.push({ letter, repetitions, is_inverse })
	}

	if (txt != reduced_txt) {
		throw new Error(`Invalid sequence: ${sequence}`)
	}

	return items
}

/**
 * Evaluates an item of the parser to a permutation.
 */
function evaluate_item(item: MoveToken): Permutation {
	const { letter, repetitions, is_inverse } = item
	if (!(letter in move_dict)) throw new Error(`No move found with letter ${letter}`)
	const perm = move_dict[letter as keyof typeof move_dict]
	const exponent = is_inverse ? -repetitions : repetitions
	return PermUtils.get_power(perm, exponent)
}

/**
 * Evaluates multiple items and composes them in the opposite direction:
 * In the cubing community, R F means "first R, then F".
 */
function evaluate_items(items: MoveToken[]): Permutation {
	return PermUtils.compose_array(items.toReversed().map(evaluate_item), N)
}

/**
 * Evaluates a given sequence of moves to a permutation.
 */
function evaluate_sequence(sequence: string): Permutation {
	return evaluate_items(parse_sequence(sequence))
}

/**
 * Computes the order of a sequence of moves on a Rubik's Cube.
 */
export function get_sequence_order(sequence: string): number {
	const perm = evaluate_sequence(sequence)
	return PermUtils.get_order(perm)
}
