/* eslint-disable @typescript-eslint/no-unused-vars */
import { html, PropertyValueMap, unsafeCSS, TemplateResult, svg, render } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement, FDiv } from "@cldcvr/flow-core";
import globalStyle from "./f-chart-global.scss?inline";
import { injectCss } from "@cldcvr/flow-core-config";
import * as d3 from "d3";
import { NumberValue, window } from "d3";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { createRef, ref } from "lit/directives/ref.js";

injectCss("f-chart", globalStyle);

@flowElement("f-chart")
export class FChart extends FRoot {
	/**
	 * css loaded from scss file
	 */

	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object })
	config!: unknown;

	chartContainer = createRef<FDiv>();

	chartTooltip = createRef<FDiv>();

	/**
	 * mention required fields here for generating vue types
	 */
	readonly required = ["config"];

	createRenderRoot() {
		return this;
	}

	render() {
		return html`<f-div ${ref(this.chartContainer)}
			>${svg`<svg xmlns="http://www.w3.org/2000/svg"></svg>`}
			<f-div
				state="custom,#000000"
				variant="curved"
				padding="medium"
				height="hug-content"
				max-width="320px"
				class="f-chart-tooltip hide"
				${ref(this.chartTooltip)}
			></f-div>
		</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		const chartData = generateLineChartData(100);
		const width = this.offsetWidth;
		const height = 500;
		const marginTop = 20;
		const marginRight = 30;
		const marginBottom = 30;
		const marginLeft = 40;

		// Declare the x (horizontal position) scale.
		const x = d3.scaleTime(
			d3.extent<TimeseriesPoint, number>(chartData, d => d.date) as Iterable<NumberValue>,
			[marginLeft, width - marginRight]
		);

		// Declare the y (vertical position) scale.
		const y = d3.scaleLinear([0, d3.max(chartData, d => d.value)] as Iterable<NumberValue>, [
			height - marginBottom,
			marginTop
		]);

		// Declare the line generator.
		const line = d3
			.line<TimeseriesPoint>()
			.x(d => x(d.date))
			.y(d => y(d.value));

		// Create the SVG container.
		const svg = d3
			.select(this.chartContainer.value!.querySelector<SVGSVGElement>("svg"))
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width, height])
			.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

		const xTooltipLine = svg
			.append("line")
			.attr("class", "x-tooltip-line tooltip-line")
			.attr("x1", `0`)
			.attr("x2", `0`)
			.attr("y1", `0`)
			.attr("y2", `0`);
		const yTooltipLine = svg
			.append("line")
			.attr("class", "y-tooltip-line tooltip-line")
			.attr("x1", `0`)
			.attr("x2", `0`)
			.attr("y1", `0`)
			.attr("y2", `0`);

		const bisect = d3.bisector<TimeseriesPoint, number>(d => d.date).center;

		const xGridLines = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
			g.selectAll(".tick line")
				.clone()
				.attr("class", "x-grid-line grid-line")
				.attr("x2", width - marginLeft - marginRight);
		};
		const yGridLines = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
			g.selectAll(".tick line")
				.clone()
				.attr("class", "y-grid-line grid-line")
				.attr("y2", marginTop + marginBottom - height);
		};

		// Add the x-axis.
		const xAxis = d3
			.axisBottom(x)
			.ticks(width / 80)
			.tickSizeOuter(0);
		const xAxisG = svg
			.append("g")
			.attr("transform", `translate(0,${height - marginBottom})`)
			.call(xAxis)
			.call(yGridLines);

		// Add the y-axis, remove the domain line, add grid lines and a label.
		const yAxis = d3.axisLeft(y).ticks(height / 40); //

		const yAxisG = svg
			.append("g")
			.attr("transform", `translate(${marginLeft},0)`)
			.call(yAxis)
			.call(xGridLines);

		// Append a path for the line.
		const path = svg
			.append("path")
			.attr("fill", "none")
			.attr("stroke", "var(--color-primary-default)")
			.attr("stroke-width", 1.2)
			.attr("d", line(chartData));
		const tooltipPoint = svg
			.append("circle")
			.attr("class", "tooltip-point")
			.attr("cx", `0`)
			.attr("cy", `0`)
			.attr("r", `0`);
		const pointermoved = (event: PointerEvent) => {
			const i = bisect(chartData, x.invert(d3.pointer(event)[0]).getTime());

			xTooltipLine
				.attr("x1", `${x(chartData[i].date)}`)
				.attr("x2", `${x(chartData[i].date)}`)
				.attr("y1", `${marginTop}`)
				.attr("y2", `${height - marginBottom}`);

			yTooltipLine
				.attr("x1", `${marginLeft}`)
				.attr("x2", `${width - marginRight}`)
				.attr("y1", `${y(chartData[i].value)}`)
				.attr("y2", `${y(chartData[i].value)}`);

			tooltipPoint
				.attr("cx", `${x(chartData[i].date)}`)
				.attr("cy", `${y(chartData[i].value)}`)
				.attr("r", `4`);

			if (this.chartTooltip.value) {
				const coOrdinates = tooltipPoint.node()?.getBoundingClientRect();
				this.chartTooltip.value.classList.add("show");
				this.chartTooltip.value.classList.remove("hide");

				if (coOrdinates && coOrdinates.top > this.chartTooltip.value.offsetHeight) {
					this.chartTooltip.value.style.removeProperty("top");
					this.chartTooltip.value.style.setProperty(
						"bottom",
						`${document.body.offsetHeight - (coOrdinates?.top ?? 0)}px`
					);
				} else {
					this.chartTooltip.value.style.removeProperty("bottom");
					this.chartTooltip.value.style.setProperty("top", `${coOrdinates?.top ?? 0}px`);
				}

				if (
					coOrdinates &&
					coOrdinates.left > document.body.offsetWidth - this.chartTooltip.value.offsetWidth
				) {
					this.chartTooltip.value.style.removeProperty("left");
					this.chartTooltip.value.style.setProperty(
						"right",
						`${document.body.offsetWidth - 16 - coOrdinates?.left}px`
					);
				} else {
					this.chartTooltip.value.style.removeProperty("right");
					this.chartTooltip.value.style.setProperty("left", `${(coOrdinates?.left ?? 0) + 16}px`);
				}
				const xDate = new Date();
				xDate.setTime(chartData[i].date);
				render(
					html`<f-div width="100%" direction="column" gap="small">
						<f-text>Date : ${xDate.toLocaleDateString()} ${xDate.toLocaleTimeString()}</f-text>
						<f-text>Value : ${chartData[i].value}</f-text>
					</f-div>`,
					this.chartTooltip.value
				);
			}
		};

		const pointerleft = (event: PointerEvent) => {
			if (event.relatedTarget !== this.chartTooltip.value) {
				if (this.chartTooltip.value) {
					this.chartTooltip.value.classList.add("hide");
					this.chartTooltip.value.classList.remove("show");
				}
				xTooltipLine.attr("x1", `0`).attr("x2", `0`).attr("y1", `0`).attr("y2", `0`);
				yTooltipLine.attr("x1", `0`).attr("x2", `0`).attr("y1", `0`).attr("y2", `0`);
				tooltipPoint.attr("cx", `0`).attr("cy", `0`).attr("r", `0`);
			}
		};

		svg
			.on("pointerenter pointermove", pointermoved)
			.on("pointerleave", pointerleft)
			.on("touchstart", (event: Event) => event.preventDefault());

		const interval = setInterval(() => {
			const newPoints = generateLineChartData(
				1,
				new Date(chartData[chartData.length - 1].date + 60 * 1000),
				500
			);
			chartData.shift();
			chartData.push(...newPoints);

			x.domain(d3.extent<TimeseriesPoint, number>(chartData, d => d.date) as Iterable<NumberValue>);
			y.domain([0, d3.max(chartData, d => d.value)] as Iterable<NumberValue>);
			svg.call(g => g.selectAll(".grid-line").remove());
			xAxisG.call(xAxis);
			xAxisG.call(yGridLines);
			yAxisG.call(yAxis);
			yAxisG.call(xGridLines);
			path.attr("d", line(chartData));
		}, 1000000000);

		setTimeout(() => {
			clearInterval(interval);
		}, 15000);
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-chart": FChart;
	}
}

export type TimeseriesPoint = {
	date: number;
	value: number;
};

function generateLineChartData(
	numPoints: number,
	from?: Date,
	yOffSet?: number
): TimeseriesPoint[] {
	const startDate = from ? from.getTime() : new Date().getTime();
	const data: TimeseriesPoint[] = [];

	for (let i = 0; i < numPoints; i++) {
		const currentDate = startDate + i * 60 * 1000; // Incrementing date by one day
		let fluctuatingValue = Math.random() * (yOffSet ?? 100) + Math.sin(i / 8) * 50; // Adding a sine wave for fluctuation
		if (fluctuatingValue < 0) {
			fluctuatingValue *= -1;
		}
		const dataPoint: TimeseriesPoint = {
			date: currentDate,
			value: +fluctuatingValue.toFixed(0)
		};

		data.push(dataPoint);
	}

	return data;
}
