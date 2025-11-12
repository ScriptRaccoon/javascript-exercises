const allowed_tags = new Set(
	[
		"div,p,span,b,i,u,s,small,strong,em",
		"ul,ol,li,br,h1,h2,h3,h4,h5,h6",
		"table,tbody,thead,tfoot,tr,th,td",
		"blockquote,hr,pre,code,sub,sup",
	]
		.join(",")
		.split(","),
)

const tag_regexp = /<\s*(\/?)([a-z][a-z0-9]*)\s*([^>]*)>/gi

/**
 * Entfernt unerwünschte HTML-Tags sowie Tag-Attribute aus einem Text.
 */
function sanitize_HTML(txt: string): string {
	return txt.replace(tag_regexp, (_, slash, tag_name, rest) => {
		const tag = tag_name.toLowerCase()
		if (!allowed_tags.has(tag)) return ""
		const self_closing = /\/\s*$/.test(rest) ? " /" : ""
		return `<${slash}${tag}${self_closing}>`
	})
}

/* ------ TESTS ------ */

const raw_html = `
<h1>Überschrift</h1>

<p style="color: red">Paragraph</p>

<script>
	fetch("https://dangerouswebsite.com", { method: "POST" });
</script>

<hr />

<button>Kicke hier</button>

<div onclick="alert('javascript is running here!')">Klicke mich</div>`

/*
1. style-attribut entfernt
2. script-tag entfernt
3. button-tag entfernt
4. onclick-attribut entfernt
*/
console.info(sanitize_HTML(raw_html))
