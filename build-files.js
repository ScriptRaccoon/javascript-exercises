// @ts-check

import { glob } from "glob"
import fs from "fs"
import { removeTypes } from "remove-types"

/**
 * @param {string} source
 * @returns {string}
 */
function append_js_to_imports(source) {
	return source
		.split("\n")
		.map((line) => {
			const trimmed = line.trim()
			if (trimmed.startsWith("import ") && trimmed.endsWith('"')) {
				const last_quote_index = line.lastIndexOf('"')
				const path = line.slice(line.indexOf('"') + 1, last_quote_index)
				if (path.startsWith("./") || path.startsWith("../")) {
					return `${line.slice(0, last_quote_index)}.js${line.slice(last_quote_index)}`
				}
			}
			return line
		})
		.join("\n")
}
async function build() {
	const ts_files = await glob(`aufgaben/**/*.ts`)
	for (const ts_file of ts_files) {
		const source = fs.readFileSync(ts_file, "utf-8")

		const transpiled = await removeTypes(source, {
			useTabs: true,
			tabWidth: 4,
			printWidth: 90,
			trailingComma: "all",
			singleQuote: false,
			semi: false,
		})
		const final_code = append_js_to_imports(transpiled)
		const js_file = ts_file.replace(/\.ts$/, ".js")
		fs.writeFileSync(js_file, final_code, "utf-8")
		console.info(`Transpiled: ${ts_file} -> ${js_file}`)
	}
}

build()
