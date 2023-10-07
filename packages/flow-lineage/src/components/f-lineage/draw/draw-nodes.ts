import { getChildCount, isEmpty } from "../../../utils";
import { DrawLineageParams, LineageNodeElement } from "../lineage-types";
import highlightPath from "../highlight/highlight-path";
import removeLinks, { removeDistantLinks } from "./remove-links";
import drawLinks from "./draw-links";
// import * as d3 from "d3";

export default function drawNodes(params: DrawLineageParams) {
  //console.time("Nodes duration");

  const {
    lineage,
    svg,
    nodeSize,
    childrenNodeSize,
    maxChildrenHeight,
    element,
    levelsToPlot,
    page,
    popoverRef,
  } = params;

  const scrollBarWidth = 8;
  const maxChildrens = maxChildrenHeight / childrenNodeSize.height;
  const degreeFilter = (n: LineageNodeElement) => {
    if (levelsToPlot.length > 0) {
      return levelsToPlot.includes(n.level);
    }
    return true;
  };

  const openPopover = (d: LineageNodeElement, isChildNode = false) => {
    const lineage = document.body.querySelector("f-lineage");
    const nodeEl = lineage?.shadowRoot?.querySelector(
      `#${d?.id}-foreign-object`
    ) as HTMLElement;
    const popoverElement = popoverRef?.value;
    if (popoverElement && nodeEl) {
      const closeIcon = popoverElement?.querySelector<HTMLElement>(
        ".f-lineage-popover-close"
      );
      popoverElement.target = nodeEl;
      popoverElement.open = true;
      element.nodeMetaDispatchEvent(d, isChildNode);
      popoverElement?.addEventListener("overlay-click", () => {
        popoverElement.open = false;
        if (popoverElement.cleanup) {
          popoverElement.cleanup();
        }
      });
      if (closeIcon) {
        closeIcon.onclick = () => {
          popoverElement.open = false;
          if (popoverElement.cleanup) {
            popoverElement.cleanup();
          }
        };
      }
    }
  };

  const parentNodesMeta = lineage.nodes.filter(
    (n) => !n.isChildren && degreeFilter(n)
  );
  element.foreignObjects = svg
    .append("g")
    .attr("class", "nodes")
    .attr("data-page", page)
    .selectAll("g.node")
    .data(parentNodesMeta)
    .enter()
    .append("g")
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y})`;
    })
    .attr("id", (d) => {
      return d.id as string;
    })
    .attr("class", "lineage-node lineage-element")
    .on("click", (event: MouseEvent, d) => {
      event.stopPropagation();
      highlightPath(d, element);
      if (d.fClick) {
        d.fClick(event, d);
      }
    })
    .on("contextmenu", (event: MouseEvent, d) => {
      if (element._hasMetaNodes && d.fNodeMeta) {
        event.stopPropagation();
        event.preventDefault();
        openPopover(d, true);
      }
      if (d.fRightClick) {
        event.stopPropagation();
        event.preventDefault();
        d.fRightClick(event, d);
      }
    })
    .append("foreignObject")
    .attr("id", (d) => {
      return d.id + "-foreign-object";
    })
    .attr("class", (d) => {
      if (element.centerNodeElement && d.id === element.centerNodeElement.id) {
        return "center-node";
      }
      return "";
    })
    .attr("width", nodeSize.width)
    .attr("height", nodeSize.height)
    .on("click", function (event: MouseEvent, d) {
      const toggleElement = event
        .composedPath()
        .find((el) =>
          (el as HTMLElement).classList?.contains("children-toggle")
        );

      if (toggleElement) {
        event.stopPropagation();
        d.fHideChildren = !d.fHideChildren;
        const allChildNodes = lineage.nodes.filter((n) => n.parentId === d.id);
        const childIds = allChildNodes.map((c) => c.id);
        if (d.childrenYMax) {
          let childHeight = d.childrenYMax - (d.y + nodeSize.height);

          // finding all nodes below children
          const nodesToUpdate = lineage.nodes.filter(
            (n) => n.level === d.level && n.y > d.y && !childIds.includes(n.id)
          );

          // compare height and apply max height with  scroll bar if required
          if (childHeight > maxChildrenHeight) {
            childHeight = maxChildrenHeight;
          }
          nodesToUpdate.forEach((n) => {
            if (!d.fHideChildren) {
              n.y += childHeight;
              if (n.childrenYMax) {
                n.childrenYMax += childHeight;
              }
            } else {
              n.y -= childHeight;
              if (n.childrenYMax) {
                n.childrenYMax -= childHeight;
              }
            }
          });
          if (!d.fHideChildren) {
            lineage.levelPointers[d.level].y += childHeight;
          } else {
            lineage.levelPointers[d.level].y -= childHeight;
          }

          const gapsToUpdate = lineage.gaps[d.level].filter((n) => n.y > d.y);

          gapsToUpdate.forEach((n) => {
            if (!d.fHideChildren) {
              n.y += childHeight;
            } else {
              n.y -= childHeight;
            }
          });
          removeLinks(nodesToUpdate, element);
        }

        allChildNodes.forEach((cn) => {
          cn.isVisible = false;
        });
        removeDistantLinks(element);
        removeLinks(allChildNodes, element);
        const pageNo = this.parentElement?.parentElement?.dataset.page ?? 0;
        element.reDrawChunk(+pageNo, d.level);
      }
    })
    .html((node) => {
      return element.doTemplateHotUpdate(node);
    });

  /**
   * Adding scrollable containers with rect
   *  */
  svg
    .append("g")
    .attr("class", "scrollable-children")
    .attr("data-page", page)
    .selectAll("g")
    .data(
      lineage.nodes.filter(
        (n) =>
          n.fChildren &&
          !n.fHideChildren &&
          !isEmpty(n.fChildren) &&
          degreeFilter(n)
      )
    )
    .enter()
    .append("g")
    .attr("class", "children-container")
    .attr("data-parent-id", (d) => {
      return d.id as string;
    })
    .attr("data-offset", 0)
    .attr("data-max", maxChildrens)
    .attr("data-parent-id", (d) => {
      return d.id as string;
    })
    .attr("id", (d) => {
      return "scrollable-" + d.id;
    })

    .on("wheel", (e, d) => {
      if (d.hasScrollbaleChildren) {
        const event = e as WheelEvent;
        /**
         * stop progation to avoid zoom
         */
        event.stopPropagation();
        /**
         * get scrollbar associated with this block
         */
        const scrollbar = svg.select("#scrollbar-" + d.id);
        /**
         * get current position
         */
        const tranform = scrollbar.attr("transform");
        /**
         * split values
         */
        const translate = tranform
          .substring(tranform.indexOf("(") + 1, tranform.indexOf(")"))
          .split(",");
        /**
         * calculate minY of scrollbar
         */
        const minY = d.y + nodeSize.height;
        /**
         * calculate maxY of scrollbar
         */
        const maxY = minY + maxChildrenHeight - +scrollbar.attr("height");
        /**
         * calculate currentY of scrollbar after addiong delta
         */
        const noOdChildren = getChildCount(d.fChildren);
        const childHeight = noOdChildren * childrenNodeSize.height;
        let scrollbarOffset =
          (childrenNodeSize.height * maxChildrenHeight) / childHeight;
        if (event.deltaY < 0) {
          scrollbarOffset *= -1;
        }
        /**
         * to know if delta has to apply on nodes
         */
        let applyDelta = true;
        let currentY = +translate[1] + scrollbarOffset;
        if (currentY < minY) {
          currentY = minY;
          applyDelta = false;
        }
        if (currentY > maxY) {
          currentY = maxY;
          applyDelta = false;
        }
        scrollbar.attr("transform", () => {
          return `translate(${translate[0]},${currentY})`;
        });

        if (applyDelta) {
          if (!d.offset) {
            d.offset = 0;
          }
          if (event.deltaY < 0) {
            d.offset -= 1;
          } else {
            d.offset += 1;
          }
          if (d.offset < 0) {
            d.offset = 0;
          }

          let start = d.offset;
          let end = d.offset + maxChildrens;

          if (d.fChildren && end > noOdChildren) {
            start -= -1;
            end -= -1;
          }

          paginateChildrens(d, start, end);
        }
      }
    })
    .append("rect")
    .attr("class", "scrollable-container")
    .attr("opacity", 0)
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y + nodeSize.height})`;
    })
    .attr("height", (d) => {
      const noOdChildren = getChildCount(d.fChildren);
      const childHeight = noOdChildren * childrenNodeSize.height;
      if (childHeight > maxChildrenHeight) {
        return maxChildrenHeight;
      }
      return childHeight;
    })
    .attr("width", childrenNodeSize.width);

  const paginateChildrens = (
    nData: LineageNodeElement,
    start: number,
    end: number
  ) => {
    // console.log("In paginateChildrens");
    const allChildNodes = lineage.nodes.filter((n) => n.parentId === nData.id);
    allChildNodes.forEach((cn) => {
      cn.isVisible = false;
    });
    const childNodes = allChildNodes.slice(start, end);
    childNodes.forEach((cn) => {
      cn.isVisible = true;
    });

    svg.select(`.children-container[data-parent-id="${nData.id}"]`).html("");
    removeLinks(allChildNodes, element);
    const startX = nData.x;
    let startY = nData.y + nodeSize.height;
    svg
      .select(`.children-container[data-parent-id="${nData.id}"]`)
      .selectAll("g.node")
      .data(childNodes)
      .enter()
      .append("g")
      .attr("class", (d) => {
        return `child-node lineage-node lineage-element child-node-${d.parentId}`;
      })
      .attr("data-page", page)
      .attr("id", (d) => {
        return d.id as string;
      })
      .attr("transform", (d) => {
        d.x = startX;
        d.y = startY;
        const translate = `translate(${startX},${startY})`;
        startY += childrenNodeSize.height;
        return translate;
      })
      .attr("data-parent-id", (d) => {
        return d.parentId ?? "";
      })
      .append("foreignObject")
      .attr("id", (d) => {
        return d.id + "-foreign-object";
      })
      .attr("width", childrenNodeSize.width)
      .attr("height", childrenNodeSize.height)
      .on("click", (event: MouseEvent, d) => {
        event.stopPropagation();
        highlightPath(d, element);
        if (d.fClick) {
          d.fClick(event, d);
        }
      })
      .on("contextmenu", (event: MouseEvent, d) => {
        if (element._hasMetaNodes && d.fNodeMeta) {
          event.stopPropagation();
          event.preventDefault();
          openPopover(d, true);
        }
        if (d.fRightClick) {
          event.stopPropagation();
          event.preventDefault();
          d.fRightClick(event, d);
        }
      })
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      //@ts-ignore
      .html((node) => {
        return element.doTemplateHotUpdate(node, true);
      });

    drawLinks({
      ...params,
      filter: (link) => {
        const sourceLink = allChildNodes.find((c) => {
          return c.id === link.source.id;
        });

        const targetLink = allChildNodes.find((c) => {
          return c.id === link.target.id;
        });

        return sourceLink !== undefined || targetLink !== undefined;
      },
      levelsToPlot: [nData.level],
    });
  };
  /**
   * Adding child nodes
   */
  svg.selectAll(".scrollable-container").each((d) => {
    const nData = d as LineageNodeElement;
    paginateChildrens(nData, 0, maxChildrens);
  });

  /**
   * adding scrollbar
   */
  svg
    .append("g")
    .attr("class", "scrollbars lineage-element")
    .attr("data-page", page)
    .selectAll("g")
    .data(
      lineage.nodes.filter(
        (n) => n.hasScrollbaleChildren && !n.fHideChildren && degreeFilter(n)
      )
    )
    .enter()
    .append("rect")
    .attr("id", (d) => {
      return "scrollbar-" + d.id;
    })
    .attr("width", scrollBarWidth)
    .attr("height", (d) => {
      const noOdChildren = getChildCount(d.fChildren);
      const childHeight = noOdChildren * childrenNodeSize.height;
      return (maxChildrenHeight / childHeight) * maxChildrenHeight;
    })
    .attr("rx", scrollBarWidth / 2)
    .attr("ry", scrollBarWidth / 2)
    .attr("transform", (d) => {
      return `translate(${d.x + nodeSize.width - scrollBarWidth},${
        d.y + nodeSize.height
      })`;
    });

  //console.timeEnd("Nodes duration");
}
