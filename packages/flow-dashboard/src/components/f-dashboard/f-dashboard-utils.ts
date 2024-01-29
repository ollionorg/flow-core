import { html, nothing } from "lit";
import { FDashboardWidget } from "../../types";

export function getWidgetHeader(widget: FDashboardWidget) {
	if (widget.header) {
		if (typeof widget.header === "object") {
			return html`<f-div
				align="middle-left"
				height="hug-content"
				padding="medium"
				direction="column"
				border="small solid subtle bottom"
			>
				<f-text ellipsis .tooltip=${widget.header.title} variant="heading" weight="bold"
					>${widget.header.title}</f-text
				>
				<f-text ellipsis .tooltip=${widget.header.description} size="small"
					>${widget.header.description}</f-text
				>
			</f-div>`;
		} else if (typeof widget.header === "function") {
			return widget.header();
		}
	}

	return nothing;
}

export function renderWidget(widget: FDashboardWidget) {
	switch (widget.type) {
		case "big-number":
			return html`<f-div padding="medium" class="big-number">${widget.data.toFixed(2)}</f-div>`;

		case "timeseries":
			return html`<f-div padding="medium"
				><f-timeseries-chart .config=${widget.data}></f-timeseries-chart
			></f-div>`;

		default:
			return nothing;
	}
}
