import { CSSResult, html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@ollion/flow-core";
import globalStyle from "./f-dashboard-global.scss?inline";
import { injectCss } from "@ollion/flow-core-config";
import { GridStack } from "gridstack";
import { FDashboardConfig } from "../../types";
import { getWidgetHeader, renderWidget, getWidgetFooter } from "./f-dashboard-utils";

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

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div class="grid-stack">
				${this.config.widgets.map(wgt => {
					// pollingWorker.postMessage(wgt);
					return html`<div
						class="grid-stack-item"
						gs-w="${wgt.placement.w}"
						gs-h="${wgt.placement.h}"
					>
						<div class="grid-stack-item-content">
							${getWidgetHeader(wgt)}${renderWidget(wgt)}${getWidgetFooter(wgt)}
						</div>
					</div>`;
				})}
			</div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		try {
			const gridStack = GridStack.init({ margin: "4px" });

			this.updateWidgetFontSize();
			gridStack.on("resizecontent", () => {
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
