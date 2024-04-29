import { html } from "lit";

import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

export class FFormField extends FRoot {
	static tagName = "f-form-field";
	static styles = [...FDiv.styles];
	render() {
		/**
		 * Final html to render
		 */
		return html`
			<f-div padding="none" gap="x-small" direction="column" width="100%">
				<f-div padding="none" gap="none" align="bottom-left">
					<f-div padding="none" direction="column" width="fill-container">
						<f-div padding="none" gap="auto" direction="row" height="hug-content">
							<f-div
								padding="none"
								gap="small"
								direction="row"
								width="hug-content"
								height="hug-content"
							>
								<slot name="label"></slot>
								<slot name="icon-tooltip"></slot>
							</f-div>
							<f-div width="hug-content">
								<slot name="subtitle"></slot>
							</f-div>
						</f-div>
						<slot name="description"></slot>
					</f-div>
				</f-div>
				<f-div gap="x-small" direction="row" width="100%" class="f-input-row" overflow="hidden">
					<slot></slot>
				</f-div>
				<f-div>
					<slot name="help"></slot>
				</f-div>
			</f-div>
		`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-form-field": FFormField;
	}
}
