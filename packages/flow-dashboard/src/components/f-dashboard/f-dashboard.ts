import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import globalStyle from "./f-dashboard-global.scss?inline";
import { injectCss } from "@cldcvr/flow-core-config";
import { GridStack } from "gridstack";

injectCss("f-dashboard", globalStyle);
@flowElement("f-dashboard")
export class FDashboard extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	title!: string;

	createRenderRoot() {
		return this;
	}

	render() {
		return html`<div class="grid-stack">
			<div class="grid-stack-item">
				<div class="grid-stack-item-content">Widget 1</div>
			</div>
			<div class="grid-stack-item" gs-w="2">
				<div class="grid-stack-item-content">Widget 2</div>
			</div>
			<div class="grid-stack-item" gs-w="2" gs-h="6">
				<div class="grid-stack-item-content">Widget 3</div>
			</div>
			<div class="grid-stack-item" gs-w="2" gs-h="2" gs-x="0" gs-y="2">
				<div class="grid-stack-item-content">Widget 4</div>
			</div>
		</div>`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		GridStack.init({ margin: "4px" });
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-dashboard": FDashboard;
	}
}
