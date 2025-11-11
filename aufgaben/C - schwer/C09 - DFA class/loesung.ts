/**
 * Klasse für einen deterministischen endlichen Automaten, kurz DEA
 * (engl. deterministic finite automaton, kurz DFA)
 */
class DFA<States extends readonly string[], Alphabet extends readonly string[]> {
	private states: States
	private alphabet: Alphabet
	private start_state: States[number]
	private final_states: Set<States[number]>
	private transitions: Record<States[number], Record<Alphabet[number], States[number]>>

	constructor(options: {
		states: States
		alphabet: Alphabet
		start_state: States[number]
		final_states: Array<States[number]> | Set<States[number]>
		transitions: Record<States[number], Record<Alphabet[number], States[number]>>
	}) {
		this.states = options.states
		this.alphabet = options.alphabet
		this.start_state = options.start_state
		this.final_states = new Set(options.final_states)
		this.transitions = options.transitions
		this.validate()
	}

	private validate() {
		const is_valid =
			this.states.includes(this.start_state) &&
			Array.from(this.final_states).every((state) => this.states.includes(state))
		if (!is_valid) throw new Error("Invalid parameters")
	}

	private get_next_state(
		state: States[number],
		char: Alphabet[number],
	): States[number] {
		return this.transitions[state][char]
	}

	public accepts(input: string): boolean {
		let current_state = this.start_state

		for (const char of input) {
			const is_valid_char = this.alphabet.includes(char)
			if (!is_valid_char) throw new Error(`Invalid character: ${char}`)
			current_state = this.get_next_state(current_state, char)
		}

		return this.final_states.has(current_state)
	}

	public process(input: string): void {
		let current_state = this.start_state

		for (let i = 0; i < input.length; i++) {
			const char = input[i]

			const is_valid_char = this.alphabet.includes(char)
			if (!is_valid_char) throw new Error(`Invalid character: ${char}`)

			const next_state = this.get_next_state(current_state, char)

			const styled_input = `${input.slice(0, i)}\x1b[4m${char}\x1b[0m${input.slice(i + 1)}`

			const styled_transition = `${current_state} ---${char}---> ${next_state}`

			console.info(styled_input, "|", styled_transition)

			current_state = next_state
		}

		console.info("")
		console.info("final state:", current_state)
		console.info("accepted:", this.final_states.has(current_state))
	}
}

/* ------ TESTS ------ */

/**
 * DEA der Strings akzeptiert die höchstens zwei b enthalten.
 */
const dfa = new DFA({
	states: ["q0", "q1", "q2", "q3"] as const,
	alphabet: ["a", "b"] as const,
	start_state: "q0",
	final_states: ["q0", "q1", "q2"] as const,
	transitions: {
		q0: { a: "q0", b: "q1" },
		q1: { a: "q1", b: "q2" },
		q2: { a: "q2", b: "q3" },
		q3: { a: "q3", b: "q3" },
	},
})

console.info(dfa.accepts("aaaaaaaa")) // true
console.info(dfa.accepts("aabaabaa")) // true
console.info(dfa.accepts("bbaaabaa")) // false
console.info(dfa.accepts("bbbaabab")) // false
// console.info(dfa.accepts("abc")) // wirft einen Fehler!

dfa.process("bbaaabaa")
