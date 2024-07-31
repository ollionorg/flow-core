import { FText, FTooltip } from "@nonfx/flow-core";
import { DrawLineageParams, LevelLinkGap, LineageLinkElement } from "../lineage-types";

import drawElbow, {
	getHiddenChildLinkId,
	getParentLinkForHiddenChild,
	isDashedLink
} from "./draw-elbow";

export default function drawLinks({
	lineage,
	svg,
	nodeSize,
	childrenNodeSize,
	gap,
	direction,
	element,
	levelsToPlot,
	page,
	filter
}: DrawLineageParams) {
	//console.time("Links duration");

	/**
	 * holds levels links gaps and pointers
	 */
	const levelLinkGap: LevelLinkGap = {};
	const degreeFilter = (l: LineageLinkElement) => {
		if (levelsToPlot.length > 0) {
			if (l.source.level > l.target.level) {
				return levelsToPlot.includes(l.source.level);
			} else {
				return levelsToPlot.includes(l.target.level);
			}
		}
		return true;
	};

	const filteredlinks = lineage.links.filter((l: LineageLinkElement) => {
		return filter ? filter(l) : degreeFilter(l);
	});

	const tooltipElement = element.shadowRoot!.querySelector<FTooltip>("#lineage-tooltip");
	const tooltipTextElement = tooltipElement?.querySelector<FText>("#lineage-tooltip-text");

	const links = svg
		.append("g")
		.attr("class", "links")
		.attr("data-page", page)
		.selectAll("path.link")
		.data(filteredlinks, d => {
			return (d as LineageLinkElement).id;
		})
		.enter();

	links
		.append("path")
		.attr("class", d => {
			const isDistantLink =
				d.source.level - d.target.level > 1 || d.target.level - d.source.level > 1;

			const isBackwardLink = d.target.level <= d.source.level;
			return `link lineage-element ${
				d.source.isChildren || d.target.isChildren || isDashedLink(d) ? "child-link" : ""
			} ${isDistantLink ? "distant-link" : ""} ${
				isBackwardLink ? "backward-link" : "forward-link"
			}`;
		})
		.attr("d", d => {
			return drawElbow({
				d,
				levelLinkGap,
				nodeSize,
				childrenNodeSize,
				gap,
				direction,
				lineage,
				element
			});
		})
		.attr("stroke", "var(--color-border-default)")
		.attr("stroke-width", 2)
		.attr("stroke-dasharray", function (d) {
			return isDashedLink(d) ? "8 4" : 0;
		})
		.attr("id", function (d) {
			return d.id;
		})
		.attr("data-parent-id", function (d) {
			if (isDashedLink(d)) {
				return getHiddenChildLinkId(d);
			}
			return null;
		})
		.attr("fill", "none")
		.on("click", (event: MouseEvent, d) => {
			event.stopPropagation();
			if (d.fClick) {
				d.fClick(event, d);
			}
			if (d.label && d.showLabelOn === "click") {
				const linkLabel = element.shadowRoot!.querySelector<SVGTextElement>(
					`[id="${d.id}-link-text"]`
				);
				console.log(linkLabel!.computedStyleMap().get("visibility"));
				if (linkLabel!.computedStyleMap().get("visibility")?.toString() === "visible") {
					linkLabel!.style.setProperty("visibility", "hidden");
				} else {
					linkLabel!.style.setProperty("visibility", "visible");
				}
			}
		})
		.on("mouseenter", (event: MouseEvent, d) => {
			event.stopPropagation();
			(event.target as HTMLElement).setAttribute("stroke-width", "4");
			if (d.label && d.showLabelOn !== "click") {
				const linkLabel = element.shadowRoot!.querySelector<SVGTextElement>(
					`[id="${d.id}-link-text"]`
				);
				linkLabel!.style.setProperty("visibility", "visible");
			}

			if (d.tooltip) {
				tooltipElement!.open = true;
				tooltipElement!.target = event.target as HTMLElement;
				tooltipTextElement!.innerText = d.tooltip;
			}
		})
		.on("mouseleave", (event: MouseEvent, d) => {
			(event.target as HTMLElement).setAttribute("stroke-width", "2");
			if (d.label && d.showLabelOn !== "click") {
				const linkLabel = element.shadowRoot!.querySelector<SVGTextElement>(
					`[id="${d.id}-link-text"]`
				);
				linkLabel!.style.setProperty("visibility", "hidden");
			}

			event.stopPropagation();
			tooltipElement!.open = false;
			tooltipTextElement!.innerText = "";
		});

	links
		.selectAll("text.link-label")
		.data(filteredlinks)
		.join("text")

		.attr("dy", "-4")
		.attr("class", "link-label lineage-element")
		.attr("id", function (d) {
			return `${d.id}-link-text`;
		})
		.append("textPath")
		.attr("startOffset", "50%")
		.attr("text-anchor", "middle")
		.attr("xlink:href", d => {
			return `#${d.id}`;
		})
		.attr("fill", "var(--color-text-default)")
		.text(d => {
			return `${d.label}`;
		});

	links
		.append("circle")
		.attr("class", "source-dot lineage-element")
		.attr("id", d => {
			return `source-dot-${d.id}`;
		})
		.attr("data-parent-id", function (d) {
			if (isDashedLink(d)) {
				return getHiddenChildLinkId(d);
			}
			return null;
		})
		.attr("r", 6)
		.attr("cx", d => {
			const link = getParentLinkForHiddenChild(d);
			const nodeWidth = link.source.isChildren ? childrenNodeSize.width : nodeSize.width;
			if (direction === "vertical") {
				return link.source.x + nodeWidth / 2;
			}
			return link.source.x + nodeWidth;
		})
		.attr("cy", d => {
			const link = getParentLinkForHiddenChild(d);
			const nodeHeight = link.source.isChildren ? childrenNodeSize.height : nodeSize.height;
			if (direction === "vertical") {
				return link.source.y + nodeHeight;
			}
			return link.source.y + nodeHeight / 2;
		})
		.attr("fill", "var(--color-border-default)")
		.attr("stroke", "var(--color-surface-default)")
		.attr("stroke-width", "2px");

	links
		.append("circle")
		.attr("class", "target-dot lineage-element")
		.attr("id", d => {
			return `${d.id}~target-dot`;
		})
		.attr("data-parent-id", function (d) {
			if (isDashedLink(d)) {
				return getHiddenChildLinkId(d);
			}
			return null;
		})
		.attr("r", 6)
		.attr("cx", d => {
			const link = getParentLinkForHiddenChild(d);
			if (direction === "vertical") {
				return (
					link.target.x + (link.target.isChildren ? childrenNodeSize.width / 2 : nodeSize.width / 2)
				);
			}
			return link.target.x;
		})
		.attr("cy", d => {
			const link = getParentLinkForHiddenChild(d);
			if (direction === "vertical") {
				return link.target.y;
			}
			return (
				link.target.y + (link.target.isChildren ? childrenNodeSize.height / 2 : nodeSize.height / 2)
			);
		})
		.attr("fill", "var(--color-border-default)")
		.attr("stroke", "var(--color-surface-default)")
		.attr("stroke-width", "2px");

	links
		.append("text")
		.attr("class", d => {
			return `link-arrow lineage-element ${
				d.source.isChildren || d.target.isChildren ? "child-link" : ""
			}`;
		})
		.attr("id", function (d) {
			return `${d.id}~arrow`;
		})
		.attr("data-parent-id", function (d) {
			if (isDashedLink(d)) {
				return getHiddenChildLinkId(d);
			}
			return null;
		})
		.attr("stroke", "var(--color-surface-default)")
		.attr("stroke-width", "1px")
		.attr("dy", 6.5)
		.attr("dx", -0.8)
		.append("textPath")
		.attr("text-anchor", "end")

		.attr("xlink:href", function (d) {
			return `#${d.id}`;
		})
		.attr("startOffset", "100%")
		.attr("fill", "var(--color-border-default)")
		.text("▶");

	links
		.filter(l => element.biDirectionalLinks.includes(l.id))
		.append("text")
		.attr("class", "b link-arrow lineage-element")
		.attr("id", function (d) {
			return `${d.id}~arrow-reverse`;
		})
		.attr("stroke", "var(--color-surface-default)")
		.attr("stroke-width", "1px")
		.attr("dy", 6)
		.attr("dx", 0.3)
		.append("textPath")
		.attr("text-anchor", "start")

		.attr("xlink:href", function (d) {
			return `#${d.id}`;
		})
		.attr("startOffset", "0%")
		.attr("fill", "var(--color-border-default)")
		.text("◀");

	/**
	 * Remove duplicate link plotted in multiple pages
	 */
	const linkIds = Array.from(element.shadowRoot!.querySelectorAll(".link")).map(el => {
		return el.id;
	});
	const duplicates = linkIds.filter((item, index) => linkIds.indexOf(item) !== index);
	duplicates.forEach(dupLink => {
		const dupLinkEl = element.shadowRoot!.querySelectorAll(`[id="${dupLink}"]`);

		dupLinkEl[1]?.remove();
	});
	//console.timeEnd("Links duration");
}
