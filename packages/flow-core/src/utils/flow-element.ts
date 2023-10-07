import { customElement } from "lit/decorators.js";

const flowElement: typeof customElement = function (tagName: string) {
	if (customElements.get(tagName)) {
		return () => false;
	}
	return customElement(tagName);
};

export default flowElement;
