import { customElement } from "lit/decorators.js";

export default function flowElement(tagName: string) {
	if (customElements.get(tagName)) {
		return () => false;
	}
	return customElement(tagName);
}
