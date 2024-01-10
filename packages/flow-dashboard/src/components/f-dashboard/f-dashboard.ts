import { CSSResult, html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@ollion/flow-core";
import globalStyle from "./f-dashboard-global.scss?inline";
import { injectCss } from "@ollion/flow-core-config";
import { GridStack } from "gridstack";
import { FDashboardConfig, FDashboardWidget } from "../../types";

injectCss("f-dashboard", globalStyle);

const pollingWorker = new Worker(new URL("./polling-worker.ts", import.meta.url));
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
		console.log("rendering");
		return html`
			<div class="grid-stack">
				${this.config.widgets.map(wgt => {
					pollingWorker.postMessage(wgt);
					return html`<div
						class="grid-stack-item"
						gs-w="${wgt.placement.w}"
						gs-h="${wgt.placement.h}"
					>
						<div class="grid-stack-item-content">${wgt.data.toFixed(2)}</div>
					</div>`;
				})}
			</div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		try {
			const gridStack = GridStack.init({ margin: "4px" });
			let timer: number = 0;
			pollingWorker.onmessage = (e: MessageEvent<FDashboardWidget>) => {
				const wgtIdx = this.config.widgets.findIndex(w => w.id === e.data.id);
				this.config.widgets[wgtIdx] = e.data;
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					this.requestUpdate();
				}, 300);
			};

			this.updateWidgetFontSize();
			gridStack.on("resizecontent", () => {
				this.updateWidgetFontSize();
			});
		} catch (er) {
			//ignore girdstack error for now
		}
		//console.log(gridStack);
	}

	updateWidgetFontSize() {
		this.querySelectorAll<HTMLDivElement>(".grid-stack-item-content").forEach(widgetContainer => {
			const wHeight = widgetContainer.offsetHeight;
			const wWidth = widgetContainer.offsetWidth;
			const fontSize = Math.min(wHeight, wWidth) * 0.3 + "px";
			widgetContainer.style.fontSize = fontSize;
			widgetContainer.style.display = "flex";
			widgetContainer.style.alignItems = "center";
			widgetContainer.style.justifyContent = "center";
		});
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
