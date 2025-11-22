// @ts-check

import { glob } from "glob"
import fs from "fs"
import { removeTypes } from "remove-types"

async function build() {
	const ts_files = await glob(`aufgaben/**/*.ts`)
	for (const ts_file of ts_files) {
		if (ts_file.startsWith("aufgaben/E - herausfordernd")) {
			console.info("skip", ts_file)
			continue
		}
		const source = fs.readFileSync(ts_file, "utf-8")

		const transpiled = await removeTypes(source, {
			useTabs: true,
			tabWidth: 4,
			printWidth: 90,
			trailingComma: "all",
			singleQuote: false,
			semi: false,
		})
		const js_file = ts_file.replace(/\.ts$/, ".js")
		fs.writeFileSync(js_file, transpiled, "utf-8")
		console.info(`Transpiled: ${ts_file} -> ${js_file}`)
	}
}

build()
