import { html, PropertyValueMap, unsafeCSS, svg, render, nothing } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement, FDiv } from "@nonfx/flow-core";
import globalStyle from "./f-timeseries-chart-global.scss?inline";
import { injectCss } from "@nonfx/flow-core-config";
import * as d3 from "d3";
import { NumberValue } from "d3";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import {
	FTimeseriesChartConfig,
	TimeseriesData,
	TimeseriesPoint,
	TooltipPoints
} from "./f-timeseries-chart-types";
import {
	defaultTooltipTemplate,
	escapeSeriesName,
	getTickInterval,
	TOOLTIP_SYNC
} from "./f-timeseries-chart-utils";

import type { Subscription } from "rxjs";

injectCss("f-timeseries-chart", globalStyle);

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
	chartLegends: Ref<FDiv> = createRef<FDiv>();

	chartTooltip: Ref<FDiv> = createRef<FDiv>();

	x!: d3.ScaleTime<number, number, never>;
	y!: d3.ScaleLinear<number, number, never>;
	svg!: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
	xAxisG!: d3.Selection<SVGGElement, unknown, null, undefined>;
	yAxisG!: d3.Selection<SVGGElement, unknown, null, undefined>;
	path!: d3.Selection<SVGPathElement, TimeseriesData, SVGSVGElement | null, unknown>;
	bars!: d3.Selection<SVGGElement, TimeseriesData, SVGSVGElement | null, unknown>;
	seriesBars!: d3.ValueFn<SVGGElement, TimeseriesData, void>;
	xGridLines!: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
	yGridLines!: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
	line!: d3.Line<TimeseriesPoint>;
	xAxis!: d3.Axis<Date>;
	yAxis!: d3.Axis<number>;
	area!: d3.Area<TimeseriesPoint>;
	tooltipSub?: Subscription;
	/**
	 * mention required fields here for generating vue types
	 */
	readonly required = ["config"];
	/**
	 * Resize observer to detect if container is resized
	 */
	resizeObserver: ResizeObserver | undefined;
	/**
	 * activate when this element is connected to DOM
	 */
	activateResizeObserver: boolean = false;

	get chartWidth() {
		if (this.config.size?.width) {
			return this.config.size?.width;
		}
		return this.chartContainer.value?.offsetWidth ?? 300;
	}
	get chartHeight() {
		if (this.config.size?.height) {
			return this.config.size?.height;
		}
		return this.chartContainer.value?.offsetHeight ?? 300;
	}

	get chartMargin() {
		const margin = this.config.size?.margin;
		return [margin?.top ?? 16, margin?.right ?? 16, margin?.bottom ?? 30, margin?.left ?? 35];
	}

	checkTickOverlapping = () => {
		if (
			this.config.xAxis &&
			this.config.xAxis.tickConfig &&
			this.config.xAxis.tickConfig.type !== "auto"
		) {
			const allTicks = this.querySelectorAll<SVGTextElement>(".x-axis .tick text");
			const allTicksArray = Array.from(allTicks);
			let lastVisibleTickIdx = 0;

			allTicksArray.forEach((tick, idx) => {
				if (idx > 0 && tick.getBoundingClientRect().x > 0) {
					const lastTick = allTicksArray[lastVisibleTickIdx];
					if (
						tick.getBoundingClientRect().x - lastTick.getBoundingClientRect().x <
						lastTick.getBoundingClientRect().width + 24
					) {
						tick.style.display = "none";
					} else {
						lastVisibleTickIdx = idx;
					}
				}
			});
		}
	};

	connectedCallback() {
		super.connectedCallback();
		/**
		 * Creating ResizeObserver Instance
		 */
		this.resizeObserver = new ResizeObserver(() => {
			//avoid first call , since it is not required
			if (this.activateResizeObserver) {
				this.init();
			}
			this.activateResizeObserver = true;
		});

		this.resizeObserver.observe(this);
	}
	disconnectedCallback() {
		/**
		 * disconnecting resize observer
		 */
		this.resizeObserver?.disconnect();

		if (this.tooltipSub) {
			this.tooltipSub.unsubscribe();
		}
		super.disconnectedCallback();
	}

	plotCustomLines = () => {
		this.svg.call(g => g.selectAll(".custom-lines").remove());
		this.config.yAxis?.lines?.forEach(line => {
			const y = this.y(line.value);
			if (!isNaN(y)) {
				this.svg
					.append("line")
					.attr("class", "y-lines custom-lines")
					.attr("x1", `${this.chartMargin[3]}`)
					.attr("x2", `${this.chartWidth - this.chartMargin[1]}`)
					.attr("y1", `${y}`)
					.attr("y2", `${y}`)
					.attr("stroke", `${line.color}`);
			}
		});
		this.config.xAxis?.lines?.forEach(line => {
			const x = this.x(line.value);
			if (!isNaN(x)) {
				this.svg
					.append("line")
					.attr("class", "x-lines custom-lines")
					.attr("x1", `${x}`)
					.attr("x2", `${x}`)
					.attr("y1", `${this.chartMargin[0]}`)
					.attr("y2", `${this.chartHeight - this.chartMargin[2]}`)
					.attr("stroke", `${line.color}`);
			}
		});
	};

	createRenderRoot() {
		return this;
	}

	get isLegendsHorizontal() {
		return this.config.legends?.position === "left" || this.config.legends?.position == "right";
	}

	getDefualtLegendTemplate() {
		if (!this.config.legends?.disabled) {
			return html`<f-div
				${ref(this.chartLegends)}
				.height=${this.isLegendsHorizontal ? "100%" : "hug-content"}
				.maxHeight=${this.isLegendsHorizontal ? "100%" : "60px"}
				.maxWidth=${this.isLegendsHorizontal ? "120px" : "100%"}
				gap="medium"
				class="f-timeseries-legends"
				.direction=${this.isLegendsHorizontal ? "column" : "row"}
				.overflow=${this.isLegendsHorizontal ? "scroll" : "wrap"}
				align="middle-center"
			>
				${this.config.data.map(series => {
					return html`<f-div
						.id=${"legend-" + series.seriesName}
						class="timeseries-legend"
						width="hug-content"
						height="hug-content"
						@click=${(event: PointerEvent) => this.handleLegendClick(event, series)}
						@mouseenter=${() => this.handleMouseEnter(series)}
						@mouseleave=${() => this.handleMouseLeave()}
						clickable
						align="middle-left"
						gap="small"
						><f-div
							width="16px"
							height="16px"
							variant="round"
							.state=${"custom," + series.color}
						></f-div
						><f-text state="secondary">${series.seriesName}</f-text></f-div
					>`;
				})}
			</f-div>`;
		}

		return nothing;
	}

	getLegendTemplate() {
		if (!this.config.legends?.disabled) {
			if (this.config.legends?.template) {
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				const element = this;
				const click = (seriesName: string) => {
					element.legendClick(element, seriesName);
				};
				const mouseEnter = (seriesName: string) => {
					element.legendMouseEnter(element, seriesName);
				};
				const mouseLeave = () => {
					element.legendMouseLeave(element);
				};
				return this.config.legends?.template({
					click,
					mouseEnter,
					mouseLeave
				});
			}
			return this.getDefualtLegendTemplate();
		}
		return nothing;
	}

	render() {
		return html`<f-div
			.direction=${this.isLegendsHorizontal ? "row" : "column"}
			class="f-timeseries-wrapper"
			data-legends-position="${this.config.legends?.position ?? "bottom"}"
			height="100%"
		>
			<f-div class="f-timeseries-container" ${ref(this.chartContainer)}
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
			</f-div>
			${this.getLegendTemplate()}
		</f-div>`;
	}

	legendClick(element: FTimeseriesChart, seriesName: string) {
		const series = element.config.data.find(s => s.seriesName === seriesName);
		if (series) {
			series.disable = !series.disable;
			element.init();
		}
	}
	legendMouseLeave(element: FTimeseriesChart) {
		element.querySelectorAll<SVGPathElement>(".series-path,.custom-lines").forEach(path => {
			path.classList.remove("disable");
			path.classList.remove("active");
		});
	}
	legendMouseEnter(element: FTimeseriesChart, seriesName: string) {
		const series = element.config.data.find(s => s.seriesName === seriesName);
		if (series && !series.disable) {
			element.querySelectorAll<SVGPathElement>(".series-path,.custom-lines").forEach(path => {
				if (!path.classList.contains(`series-${escapeSeriesName(series.seriesName)}-path`)) {
					path.classList.add("disable");
				} else {
					path.classList.add("active");
				}
			});
		}
	}
	handleLegendClick(e: PointerEvent, series: TimeseriesData) {
		const legend = e.currentTarget as FDiv;
		legend.classList.toggle("disable-legend");
		this.legendClick(this, series.seriesName);
	}
	handleMouseEnter(series: TimeseriesData) {
		this.legendMouseEnter(this, series.seriesName);
	}
	handleMouseLeave() {
		this.legendMouseLeave(this);
	}

	init() {
		this.chartContainer.value!.querySelector<SVGSVGElement>("svg")!.innerHTML = ``;
		const chartData = this.config.data.filter(s => !s.disable);
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

		this.area = d3
			.area<TimeseriesPoint>()
			.curve(d3.curveMonotoneX)
			.x(d => {
				return this.x(d.date);
			})
			.y0(this.y(0))
			.y1(d => {
				return this.y(d.value);
			});

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
			.axisBottom<Date>(this.x)
			.ticks(width / 80)
			.tickSizeOuter(0);

		if (this.config.xAxis?.tickConfig) {
			const tickConfig = this.config.xAxis.tickConfig;
			if (tickConfig.type === "auto") {
				this.xAxis.ticks(Math.max(width / 80, 2));
			} else if (tickConfig.type === "interval") {
				this.xAxis.ticks(getTickInterval(tickConfig.interval));
			} else if (tickConfig.type === "values") {
				this.xAxis.tickValues(tickConfig.values);
			}

			if (tickConfig.format) {
				this.xAxis.tickFormat(tickConfig.format);
			}
		}
		this.xAxisG = this.svg
			.append("g")
			.attr("class", "x-axis")
			.attr("transform", `translate(0,${height - marginBottom})`)
			.call(this.xAxis)
			.call(this.yGridLines);

		// Add the y-axis, remove the domain line, add grid lines and a label.
		this.yAxis = d3.axisLeft<number>(this.y).ticks(height / 40); //

		if (this.config.yAxis?.tickConfig) {
			const tickConfig = this.config.yAxis.tickConfig;
			if (tickConfig.type === "auto") {
				this.yAxis.ticks(Math.max(height / 40, 2));
			} else if (tickConfig.type === "values") {
				this.yAxis.tickValues(tickConfig.values);
			}

			if (tickConfig.format) {
				this.yAxis.tickFormat(tickConfig.format);
			}
		}

		this.yAxisG = this.svg
			.append("g")
			.attr("transform", `translate(${marginLeft},0)`)
			.call(this.yAxis)
			.call(this.xGridLines);

		// Append a path for the line.

		this.path = this.svg
			.selectAll<SVGPathElement, TimeseriesData>("path.chart-path")
			.data(
				chartData.filter(td => td.type === "line" || td.type === "area"),
				d => d.seriesName
			)
			.join("path")
			.attr("fill", "none")
			.attr("class", d => {
				let pathClass = "chart-path ";
				if (d.type === "line") {
					pathClass += " line-path";
				} else if (d.type === "area") {
					pathClass += " area-path";
				}

				pathClass += " series-path series-" + escapeSeriesName(d.seriesName) + "-path";
				return pathClass;
			})
			.attr("stroke", d => d.color)
			.attr("stroke-width", 1.2)
			.attr("fill", d => {
				if (d.type === "area") {
					return d.color;
				}
				return "none";
			})
			.attr("d", d => {
				if (d.type === "line") {
					return this.line(d.points);
				} else if (d.type === "area") {
					return this.area(d.points);
				}
				return "none";
			});

		this.bars = this.svg
			.selectAll<SVGGElement, TimeseriesData>("g.bar-g")
			.data(
				chartData.filter(td => td.type === "bar"),
				d => d.seriesName
			)
			.join("g")
			.attr("class", d => {
				return `bar-g series-path series-${escapeSeriesName(d.seriesName)}-path`;
			})
			.attr("transform", (d, i) => `translate(${i * (width / d.points.length)},0)`);
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const element = this;
		this.seriesBars = function (d) {
			let rectWidth = width / d.points.length - 2;
			if (rectWidth < 0) {
				rectWidth = 1;
			}
			d3.select(this)
				.selectAll<SVGRectElement, TimeseriesPoint>("rect.bars")
				.data(d.points, d => d.date)
				.join("rect")
				.attr("class", "bars")
				.attr("y", d => element.y(d.value))
				.attr("x", d => element.x(d.date))
				.attr("fill", d.color)
				.attr("width", rectWidth)
				.attr("height", d => height - marginBottom - element.y(d.value));
		};
		this.bars.each(this.seriesBars);

		const tooltipPoint: Record<
			string,
			d3.Selection<SVGCircleElement, unknown, null, undefined>
		> = {};

		chartData.forEach(series => {
			tooltipPoint[series.seriesName] = this.svg
				.append<SVGCircleElement>("circle")
				.attr("fill", series.color)
				.attr("cx", `0`)
				.attr("cy", `0`)
				.attr("r", `0`);
		});
		const pointermoved = (event: PointerEvent | number) => {
			const time =
				event instanceof PointerEvent ? this.x.invert(d3.pointer(event)[0]).getTime() : event;

			xTooltipLine
				.attr("x1", `${this.x(time)}`)
				.attr("x2", `${this.x(time)}`)
				.attr("y1", `${marginTop}`)
				.attr("y2", `${height - marginBottom}`);

			chartData.forEach(series => {
				const i = bisect(series.points, time);
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

				const tooltipPoints: TooltipPoints = chartData.map(series => {
					const i = bisect(series.points, time);
					const seriesPoint = series.points[i];
					return {
						seriesName: series.seriesName,
						value: seriesPoint?.value,
						color: series.color,
						type: series.type,
						date: seriesPoint.date
					};
				});
				const xDate = new Date();
				xDate.setTime(tooltipPoints[0].date ?? time);
				if (event instanceof PointerEvent) {
					TOOLTIP_SYNC.next(xDate.getTime());
				}
				render(
					this.config.tooltipTemplate
						? this.config.tooltipTemplate(xDate, tooltipPoints)
						: defaultTooltipTemplate(xDate, tooltipPoints),
					this.chartTooltip.value
				);
			}
		};

		const pointerleft = (event: PointerEvent | number) => {
			if (
				(event instanceof PointerEvent && event.relatedTarget !== this.chartTooltip.value) ||
				event === 0
			) {
				if (this.chartTooltip.value) {
					this.chartTooltip.value.classList.add("hide");
					this.chartTooltip.value.classList.remove("show");
				}
				if (event instanceof PointerEvent) {
					TOOLTIP_SYNC.next(0);
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

		if (this.tooltipSub) {
			this.tooltipSub.unsubscribe();
		}
		this.tooltipSub = TOOLTIP_SYNC.subscribe({
			next: (date: number) => {
				if (date === 0) {
					pointerleft(0);
				} else {
					pointermoved(date);
				}
			}
		});

		this.plotCustomLines();
		this.svg
			.on("pointerenter pointermove", pointermoved)
			.on("pointerleave", pointerleft)
			.on("touchstart", (event: Event) => event.preventDefault());
		this.checkTickOverlapping();
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		void this.updateComplete.then(() => {
			if (changedProperties.has("config")) {
				const oldConfig = changedProperties.get("config") as FTimeseriesChartConfig | undefined;
				if (oldConfig && oldConfig.data.length === this.config.data.length) {
					const chartData = this.config.data.filter(s => !s.disable);

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
						.data(
							chartData.filter(td => td.type === "line" || td.type === "area"),
							d => d.seriesName
						)
						.join("path")
						.attr("d", d => {
							if (d.type === "line") {
								return this.line(d.points);
							}
							if (d.type === "area") {
								return this.area(d.points);
							}
							return "none";
						});

					this.bars
						.data(
							chartData.filter(td => td.type === "bar"),
							d => d.seriesName
						)
						.join("g")
						.each(this.seriesBars);

					this.plotCustomLines();
				} else {
					this.init();
				}

				this.checkTickOverlapping();
			}
		});
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
