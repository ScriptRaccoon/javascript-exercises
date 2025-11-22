/**
 * Prüft, ob ein beliebiger JavaScript-Wert ein Objekt ist.
 */
function is_object(obj: unknown): obj is Record<string, unknown> {
	return typeof obj === "object" && obj !== null && !Array.isArray(obj)
}

/**
 * Berechnet rekursiv die maximale Tiefe eines beliebigen JavaScript-Wertes.
 */
function max_depth(obj: unknown): number {
	if (!is_object(obj)) return 0
	const children = Object.values(obj)
	if (children.length === 0) return 0
	const max_depths_of_children = children.map(max_depth)
	return 1 + Math.max(...max_depths_of_children)
}

/* ------ TESTS ------ */

console.info(max_depth(1)) // 0
console.info(max_depth({})) // 0
console.info(max_depth(null)) // 0
console.info(max_depth([1, 2, 3])) // 0
console.info(max_depth({ a: 1 })) // 1
console.info(max_depth({ a: 1, b: 2 })) // 1
console.info(max_depth({ a: {} })) // 1
console.info(max_depth({ a: { b: 1 } })) // 2
console.info(max_depth({ a: { b: { c: 1 } } })) // 3
console.info(max_depth({ a: { b: 1 }, c: { d: 2 } })) // 2
console.info(max_depth({ a: { b: 1 }, c: { d: { e: 1 } } })) // 3

const deep_obj = {
	b: {},
	k: {
		x: {
			u: {
				z: {},
				o: 8,
				v: {
					b: 1,
				},
			},
			i: {
				h: {
					p: {
						q: 6,
						o: 7,
						r: 0,
						d: 0,
					},
					t: 7,
				},
				i: {
					s: {
						b: 7,
						w: 6,
						a: 0,
					},
				},
				k: 0,
				m: {},
			},
			q: 6,
			g: 1,
		},
		y: {
			u: {
				y: 0,
				r: 2,
				k: 2,
			},
		},
		h: {
			t: {
				w: 7,
				g: 0,
				o: 3,
			},
			d: {},
			i: {
				q: 0,
				h: {
					g: 6,
					k: 2,
				},
			},
			z: 0,
		},
		t: {},
	},
	c: {
		t: 0,
	},
	u: {
		f: {},
		q: {
			z: {
				o: 1,
				s: 4,
				r: 1,
			},
			r: 8,
			f: {},
		},
		v: {},
		x: {
			j: {
				a: 2,
				m: 3,
				p: 4,
			},
			y: {
				b: 2,
			},
			t: {
				q: 1,
			},
			u: {
				s: 9,
				h: 2,
			},
		},
	},
}

console.info(max_depth(deep_obj)) // 6
