import { CSSResult, html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@ollion/flow-core";
import globalStyle from "./f-dashboard-global.scss?inline";
import { injectCss } from "@ollion/flow-core-config";
import { GridStack } from "gridstack";
import { FDashboardConfig, FDashboardWidget } from "../../types";

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
						<div class="grid-stack-item-content">${this.renderWidget(wgt)}</div>
					</div>`;
				})}
			</div>
		`;
	}

	renderWidget(widget: FDashboardWidget) {
		switch (widget.type) {
			case "big-number":
				return html`<f-div width="100%" height="100%" class="big-number"
					>${widget.data.toFixed(2)}</f-div
				>`;

			case "timeseries":
				return html`<f-timeseries-chart .config=${widget.data}></f-timeseries-chart>`;

			default:
				return nothing;
		}
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
