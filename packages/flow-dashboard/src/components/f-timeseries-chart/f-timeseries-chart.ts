import { html, PropertyValueMap, unsafeCSS, svg, render } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement, FDiv } from "@cldcvr/flow-core";
import globalStyle from "./f-timeseries-chart-global.scss?inline";
import { injectCss } from "@cldcvr/flow-core-config";
import * as d3 from "d3";
import { NumberValue } from "d3";
import { createRef, Ref, ref } from "lit/directives/ref.js";

injectCss("f-timeseries-chart", globalStyle);

export type AxisLine = {
	value: number;
	color: string;
};

export type YAxisLine = AxisLine;
export type XAxisLine = AxisLine;
export type TimeseriesPoint = {
	date: number;
	value: number;
};

export type TimeseriesData = {
	seriesName: string;
	points: TimeseriesPoint[];
	color: string;
};

export type FTimeseriesChartConfig = {
	data: TimeseriesData[];
	type: "line" | "bar" | "area";
	size?: {
		width?: number;
		height?: number;
		margin?: {
			top?: number;
			right?: number;
			left?: number;
			bottom?: number;
		};
	};
	xAxis?: {
		lines?: XAxisLine[];
	};
	yAxis?: {
		lines?: YAxisLine[];
	};
};

@flowElement("f-timeseries-chart")
export class FTimeseriesChart extends FRoot {
	/**
	 * css loaded from scss file
	 */

	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object })
	config!: FTimeseriesChartConfig;

	chartContainer: Ref<FDiv> = createRef<FDiv>();

	chartTooltip: Ref<FDiv> = createRef<FDiv>();

	x!: d3.ScaleTime<number, number, never>;
	y!: d3.ScaleLinear<number, number, never>;
	svg!: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
	xAxisG!: d3.Selection<SVGGElement, unknown, null, undefined>;
	yAxisG!: d3.Selection<SVGGElement, unknown, null, undefined>;
	path!: d3.Selection<SVGPathElement, TimeseriesData, SVGSVGElement | null, unknown>;
	xGridLines!: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
	yGridLines!: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
	line!: d3.Line<TimeseriesPoint>;
	xAxis!: d3.Axis<d3.NumberValue | Date>;
	yAxis!: d3.Axis<d3.NumberValue>;
	/**
	 * mention required fields here for generating vue types
	 */
	readonly required = ["config"];

	plotCustomLines = () => {
		this.svg.call(g => g.selectAll(".custom-lines").remove());
		this.config.yAxis?.lines?.forEach(line => {
			this.svg
				.append("line")
				.attr("class", "y-lines custom-lines")
				.attr("x1", `${this.chartMargin[3]}`)
				.attr("x2", `${this.chartWidth - this.chartMargin[1]}`)
				.attr("y1", `${this.y(line.value)}`)
				.attr("y2", `${this.y(line.value)}`)
				.attr("stroke", `${line.color}`);
		});
		this.config.xAxis?.lines?.forEach(line => {
			this.svg
				.append("line")
				.attr("class", "x-lines custom-lines")
				.attr("x1", `${this.x(line.value)}`)
				.attr("x2", `${this.x(line.value)}`)
				.attr("y1", `${this.chartMargin[0]}`)
				.attr("y2", `${this.chartHeight - this.chartMargin[2]}`)
				.attr("stroke", `${line.color}`);
		});
	};

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

	get chartWidth() {
		if (this.config.size?.width) {
			return this.config.size?.width;
		}
		return this.offsetWidth ?? 300;
	}
	get chartHeight() {
		if (this.config.size?.height) {
			return this.config.size?.height;
		}
		return this.offsetHeight ?? 300;
	}

	get chartMargin() {
		const margin = this.config.size?.margin;
		return [margin?.top ?? 20, margin?.right ?? 30, margin?.bottom ?? 30, margin?.left ?? 40];
	}

	init() {
		const chartData = this.config.data;
		const chartDataFlat = chartData.map(series => series.points).flat();

		const width = this.chartWidth;
		const height = this.chartHeight;
		const [marginTop, marginRight, marginBottom, marginLeft] = this.chartMargin;

		// Declare the x (horizontal position) scale.
		this.x = d3.scaleTime(
			d3.extent<TimeseriesPoint, number>(chartDataFlat, d => d.date) as Iterable<NumberValue>,
			[marginLeft, width - marginRight]
		);

		// Declare the y (vertical position) scale.
		this.y = d3.scaleLinear([0, d3.max(chartDataFlat, d => d.value)] as Iterable<NumberValue>, [
			height - marginBottom,
			marginTop
		]);

		// Declare the line generator.
		this.line = d3
			.line<TimeseriesPoint>()
			.x(d => this.x(d.date))
			.y(d => this.y(d.value));

		// Create the SVG container.
		this.svg = d3
			.select(this.chartContainer.value!.querySelector<SVGSVGElement>("svg"))
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width, height])
			.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

		const xTooltipLine = this.svg
			.append("line")
			.attr("class", "x-tooltip-line tooltip-line")
			.attr("x1", `0`)
			.attr("x2", `0`)
			.attr("y1", `0`)
			.attr("y2", `0`);
		const yTooltipLine: Record<string, d3.Selection<SVGLineElement, unknown, null, undefined>> = {};

		chartData.forEach(series => {
			yTooltipLine[series.seriesName] = this.svg
				.append<SVGLineElement>("line")
				.attr("class", "y-tooltip-line tooltip-line")
				.attr("x1", `0`)
				.attr("x2", `0`)
				.attr("y1", `0`)
				.attr("y2", `0`);
		});
		const bisect = d3.bisector<TimeseriesPoint, number>(d => d.date).center;

		this.xGridLines = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
			g.selectAll(".tick line")
				.clone()
				.attr("class", "x-grid-line grid-line")
				.attr("x2", width - marginLeft - marginRight);
		};
		this.yGridLines = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
			g.selectAll(".tick line")
				.clone()
				.attr("class", "y-grid-line grid-line")
				.attr("y2", marginTop + marginBottom - height);
		};

		// Add the x-axis.
		this.xAxis = d3
			.axisBottom(this.x)
			.ticks(width / 80)
			.tickSizeOuter(0);
		this.xAxisG = this.svg
			.append("g")
			.attr("transform", `translate(0,${height - marginBottom})`)
			.call(this.xAxis)
			.call(this.yGridLines);

		// Add the y-axis, remove the domain line, add grid lines and a label.
		this.yAxis = d3.axisLeft(this.y).ticks(height / 40); //

		this.yAxisG = this.svg
			.append("g")
			.attr("transform", `translate(${marginLeft},0)`)
			.call(this.yAxis)
			.call(this.xGridLines);

		// Append a path for the line.
		this.path = this.svg
			.selectAll<SVGPathElement, TimeseriesData>("path.chart-line")
			.data(chartData, d => d.seriesName)
			.join("path")
			.attr("fill", "none")
			.attr("class", "chart-line")
			.attr("stroke", d => d.color)
			.attr("stroke-width", 1.2)
			.attr("d", d => this.line(d.points));

		const tooltipPoint: Record<
			string,
			d3.Selection<SVGCircleElement, unknown, null, undefined>
		> = {};

		chartData.forEach(series => {
			tooltipPoint[series.seriesName] = this.svg
				.append<SVGCircleElement>("circle")
				.attr("class", "tooltip-point")
				.attr("cx", `0`)
				.attr("cy", `0`)
				.attr("r", `0`);
		});
		const pointermoved = (event: PointerEvent) => {
			const time = this.x.invert(d3.pointer(event)[0]).getTime();

			xTooltipLine
				.attr("x1", `${this.x(time)}`)
				.attr("x2", `${this.x(time)}`)
				.attr("y1", `${marginTop}`)
				.attr("y2", `${height - marginBottom}`);

			chartData.forEach(series => {
				const i = bisect(series.points, this.x.invert(d3.pointer(event)[0]).getTime());
				const seriesPoint = series.points[i];
				if (seriesPoint) {
					yTooltipLine[series.seriesName]
						.attr("x1", `${marginLeft}`)
						.attr("x2", `${width - marginRight}`)
						.attr("y1", `${this.y(seriesPoint.value)}`)
						.attr("y2", `${this.y(seriesPoint.value)}`);

					tooltipPoint[series.seriesName]
						.attr("cx", `${this.x(seriesPoint.date)}`)
						.attr("cy", `${this.y(seriesPoint.value)}`)
						.attr("r", `4`);
				}
			});

			if (this.chartTooltip.value) {
				const coOrdinates = Object.values(tooltipPoint)[0].node()?.getBoundingClientRect();
				this.chartTooltip.value.classList.add("show");
				this.chartTooltip.value.classList.remove("hide");
				const tooltipOffset = 32;
				if (coOrdinates && coOrdinates.top < Math.max(this.chartTooltip.value.offsetHeight, 150)) {
					this.chartTooltip.value.style.removeProperty("top");
					this.chartTooltip.value.style.setProperty(
						"bottom",
						`${
							document.body.offsetHeight -
							((coOrdinates?.top ?? 0) + this.chartTooltip.value.offsetHeight)
						}px`
					);
				} else {
					this.chartTooltip.value.style.removeProperty("bottom");
					this.chartTooltip.value.style.setProperty(
						"top",
						`${(coOrdinates?.top ?? 0) + tooltipOffset}px`
					);
				}

				if (
					coOrdinates &&
					coOrdinates.left >
						document.body.offsetWidth - Math.max(this.chartTooltip.value.offsetWidth, 320)
				) {
					this.chartTooltip.value.style.removeProperty("left");
					this.chartTooltip.value.style.setProperty(
						"right",
						`${document.body.offsetWidth + tooltipOffset - coOrdinates?.left}px`
					);
				} else {
					this.chartTooltip.value.style.removeProperty("right");
					this.chartTooltip.value.style.setProperty(
						"left",
						`${(coOrdinates?.left ?? 0) + tooltipOffset}px`
					);
				}
				const xDate = new Date();
				xDate.setTime(time);
				render(
					html`<f-div width="100%" direction="column" gap="small">
						<f-text>Date : ${xDate.toLocaleDateString()} ${xDate.toLocaleTimeString()}</f-text>
						${chartData.map(series => {
							const i = bisect(series.points, this.x.invert(d3.pointer(event)[0]).getTime());
							const seriesPoint = series.points[i];
							return html`<f-text>${series.seriesName} : ${seriesPoint?.value}</f-text>`;
						})}
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
				Object.values(yTooltipLine).forEach(lineElement => {
					lineElement.attr("x1", `0`).attr("x2", `0`).attr("y1", `0`).attr("y2", `0`);
				});
				Object.values(tooltipPoint).forEach(circlePoint => {
					circlePoint.attr("cx", `0`).attr("cy", `0`).attr("r", `0`);
				});
			}
		};

		this.plotCustomLines();
		this.svg
			.on("pointerenter pointermove", pointermoved)
			.on("pointerleave", pointerleft)
			.on("touchstart", (event: Event) => event.preventDefault());
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		if (changedProperties.has("config")) {
			const oldConfig = changedProperties.get("config") as FTimeseriesChartConfig | undefined;
			if (oldConfig && oldConfig.data.length === this.config.data.length) {
				const chartData = this.config.data;

				const chartDataFlat = chartData.map(series => series.points).flat();
				this.x.domain(
					d3.extent<TimeseriesPoint, number>(chartDataFlat, d => d.date) as Iterable<NumberValue>
				);
				this.y.domain([0, d3.max(chartDataFlat, d => d.value)] as Iterable<NumberValue>);
				this.svg.call(g => g.selectAll(".grid-line").remove());
				this.xAxisG.call(this.xAxis);
				this.xAxisG.call(this.yGridLines);
				this.yAxisG.call(this.yAxis);
				this.yAxisG.call(this.xGridLines);

				this.path
					.data(chartData, d => d.seriesName)
					.join("path")
					.attr("d", d => this.line(d.points));
				this.plotCustomLines();
			} else {
				this.init();
			}
		}

		// const interval = setInterval(() => {

		// }, 1000);

		// setTimeout(() => {
		// 	clearInterval(interval);
		// }, 15000);
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-timeseries-chart": FTimeseriesChart;
	}
}
