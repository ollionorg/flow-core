import { FLineage } from "../f-lineage";
import { LineageNodeElement } from "../lineage-types";
export default function removeLinks(nodes: LineageNodeElement[], lineage: FLineage) {
	const root = lineage.shadowRoot;
	if (root) {
		nodes.forEach(n => {
			root.querySelectorAll(`[id^="${n.id}->"]`).forEach(el => {
				el.remove();
			});
			root.querySelectorAll(`[id$="->${n.id}"]`).forEach(el => {
				el.remove();
			});
			root.querySelectorAll(`[id$="${`${n.id}~target-dot`}"]`).forEach(el => {
				el.remove();
			});
			root.querySelectorAll(`[id$="->${n.id}~arrow"]`).forEach(el => {
				el.remove();
			});
			root.querySelectorAll(`[id^="${`source-dot-${n.id}`}->"]`).forEach(el => {
				el.remove();
			});
		});
	}
}
export function removeDistantLinks(lineage: FLineage) {
	const root = lineage.shadowRoot;
	if (root) {
		root.querySelectorAll(`.distant-link`).forEach(el => {
			el.remove();
		});
		root.querySelectorAll(`.backward-link`).forEach(el => {
			el.remove();
		});
	}
}
