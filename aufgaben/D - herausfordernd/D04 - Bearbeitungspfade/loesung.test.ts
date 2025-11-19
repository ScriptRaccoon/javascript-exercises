import { describe, it, expect } from "vitest"
import { get_edit_path } from "./loesung"

describe("get_edit_path", () => {
	it("computes the correct path", () => {
		expect(get_edit_path("keiner", "eimer")).toEqual(["keiner", "einer", "eimer"])

		expect(get_edit_path("banane", "badewanne")).toEqual([
			"banane",
			"badnane",
			"badenane",
			"badewane",
			"badewanne",
		])

		expect(get_edit_path("anschauung", "schauen")).toEqual([
			"anschauung",
			"nschauung",
			"schauung",
			"schaueng",
			"schauen",
		])

		expect(get_edit_path("rund", "kantig")).toEqual([
			"rund",
			"kund",
			"kand",
			"kantd",
			"kantid",
			"kantig",
		])

		expect(get_edit_path("kantig", "rund")).toEqual([
			"kantig",
			"rantig",
			"runtig",
			"runig",
			"rung",
			"rund",
		])
	})
})
