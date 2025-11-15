import { parse } from "../D01 - Parser/parser"
import { type AST, AST_UTILS } from "../D01 - Parser/ast"

class Cell {
	private ast: AST = { type: "number", value: 0 }

	constructor(def: string | number) {
		this.set_def(def)
	}

	set_def(def: string | number) {
		if (typeof def === "number") {
			this.ast = { type: "number", value: def }
		} else if (typeof def === "string") {
			const defi = def.trim()
			if (!defi.startsWith("=")) {
				throw new Error(`Definition '${defi}' does not start with =`)
			}
			const formula = defi.slice(1)
			const ast = parse(formula)
			if (!ast) {
				throw new Error(`Invalid formula: ${formula}`)
			}
			this.ast = ast
		} else {
			throw new Error(`Invalid definition type: ${typeof def}`)
		}
	}

	get_dependencies(): string[] {
		return AST_UTILS.get_variable_names(this.ast)
	}

	evaluate(vars: Record<string, number>): number {
		return AST_UTILS.evaluate(this.ast, vars)
	}
}

class Sheet {
	private cells: Partial<Record<string, Cell>> = {}

	constructor(cell_defs: Partial<Record<string, string | number>> = {}) {
		for (const [name, def] of Object.entries(cell_defs)) {
			this.set(name, def!)
		}
	}

	set(cell_name: string, def: string | number): void {
		const cell = this.cells[cell_name]
		if (cell) {
			cell.set_def(def)
		} else {
			if (!/^[A-Z]\d+$/.test(cell_name)) {
				throw new Error(`Invalid cell name: ${cell_name}`)
			}
			this.cells[cell_name] = new Cell(def)
		}
	}

	get(cell_name: string, context: string[] = []): number {
		const expanded_context = [...context, cell_name]
		if (context.includes(cell_name)) {
			throw new Error(
				`Circular definition detected: ${expanded_context.join(" -> ")}`,
			)
		}

		const cell = this.cells[cell_name]
		if (!cell) {
			throw new Error(`Unknown cell: ${cell_name}`)
		}

		const dependencies = cell.get_dependencies()

		const vars: Record<string, number> = {}

		for (const var_name of dependencies) {
			const val = this.get(var_name, expanded_context)
			vars[var_name] = val
		}

		return cell.evaluate(vars)
	}

	print(cell_name: string) {
		const val = this.get(cell_name)
		console.info(`${cell_name} = ${val}`)
	}

	get_values(): Partial<Record<string, number>> {
		const result: Partial<Record<string, number>> = {}

		for (const key of Object.keys(this.cells)) {
			const value = this.get(key)
			result[key] = value
		}

		return result
	}
}

const sheet = new Sheet()

sheet.set("A1", 1)
sheet.set("B1", "=A1 * 2")
sheet.set("C1", "=B1 * 2")

sheet.print("A1")
sheet.print("B1")
sheet.print("C1")

console.info(sheet.get_values())
