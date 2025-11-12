/**
 * Bestimmt die Liste der Konflikte zwischen Kalendereinträgen.
 */
function get_conflicting_events(events) {
	const conflicts = []

	for (let i = 0; i < events.length; i++) {
		for (let j = i + 1; j < events.length; j++) {
			const a = events[i]
			const b = events[j]
			if (a.end > b.start && b.end > a.start) {
				const conflict = {
					start: a.start <= b.start ? b.start : a.start,
					end: a.end <= b.end ? a.end : b.end,
					events: [a.title, b.title],
				}
				conflicts.push(conflict)
			}
		}
	}
	return conflicts
}

/* ------ TESTS ------ */

const events = [
	{ title: "book train tickets", start: "09:00", end: "09:15" },
	{ title: "train to lusanne", start: "17:00", end: "18:45" },
	{ title: "lunch", start: "12:00", end: "12:30" },
	{ title: "meeting with peter", start: "11:00", end: "12:15" },
	{ title: "call with luisa", start: "15:00", end: "16:00" },
	{ title: "call with tom", start: "16:50", end: "17:20" },
]

/*
[
	{ start: "17:00", end: "17:20", events: ["train to lusanne", "call with tom"] },
	{ start: "12:00", end: "12:15", events: ["lunch", "meeting with peter"] },
]
*/
console.info(get_conflicting_events(events))
