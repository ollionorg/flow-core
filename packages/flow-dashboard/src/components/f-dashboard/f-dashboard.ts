import { CSSResult, html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@nonfx/flow-core";
import globalStyle from "./f-dashboard-global.scss?inline";
import { injectCss } from "@nonfx/flow-core-config";
import { GridStack } from "gridstack";
import { FDashboardConfig } from "../../types";
import { getWidgetHeader, renderWidget, getWidgetFooter } from "./f-dashboard-utils";
import { createRef, Ref, ref } from "lit/directives/ref.js";

import { keyed } from "lit/directives/keyed.js";

injectCss("f-dashboard", globalStyle);

// const pollingWorker = new Worker(new URL("./polling-worker.ts", import.meta.url));
@flowElement("f-dashboard")
export class FDashboard extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles: CSSResult[] = [unsafeCSS(globalStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object })
	config!: FDashboardConfig;

	/**
	 * mention required fields here for generating vue types
	 */
	readonly required = ["config"];

	gridStack?: GridStack;

	gridStackElement: Ref<HTMLDivElement> = createRef<HTMLDivElement>();

	createRenderRoot() {
		return this;
	}
	protected willUpdate(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		if (this.gridStack) {
			// destroy existing grid
			this.gridStack.destroy(false);
		}
	}

	render() {
		return html`
			<div class="grid-stack" ${ref(this.gridStackElement)}>
				${this.config.widgets.map(wgt => {
					return keyed(
						wgt.id,
						html`<div
							id="${wgt.id}"
							class="grid-stack-item"
							gs-w="${wgt.placement.w}"
							gs-h="${wgt.placement.h}"
						>
							<div class="grid-stack-item-content">
								${getWidgetHeader(wgt)}${renderWidget(wgt)}${getWidgetFooter(wgt)}
							</div>
						</div>`
					);
				})}
			</div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		try {
			this.gridStack = GridStack.init({ margin: "4px" });

			this.updateWidgetFontSize();
			this.gridStack.on("resizecontent", () => {
				this.updateWidgetFontSize();
			});
		} catch (er) {
			//ignore girdstack error for now
		}
	}

	updateWidgetFontSize() {
		this.querySelectorAll<HTMLDivElement>(".grid-stack-item-content > .big-number").forEach(
			widgetContainer => {
				const wHeight = widgetContainer.offsetHeight;
				const wWidth = widgetContainer.offsetWidth;
				const fontSize = Math.min(wHeight, wWidth) * 0.3 + "px";
				widgetContainer.style.fontSize = fontSize;
				widgetContainer.style.display = "flex";
				widgetContainer.style.alignItems = "center";
				widgetContainer.style.justifyContent = "center";
			}
		);
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
