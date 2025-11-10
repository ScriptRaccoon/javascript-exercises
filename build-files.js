// @ts-check

import { glob } from "glob"
import fs from "fs"
import { removeTypes } from "remove-types"

async function build() {
	const ts_files = await glob(`aufgaben/**/*.ts`)
	for (const ts_file of ts_files) {
		const source = fs.readFileSync(ts_file, "utf-8")
		const transpiled = await removeTypes(source)
		const js_file = ts_file.replace(/\.ts$/, ".js")
		fs.writeFileSync(js_file, transpiled, "utf-8")
		console.info(`Transpiled: ${ts_file} -> ${js_file}`)
	}
}

build()
