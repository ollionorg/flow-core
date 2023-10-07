import createNodeElements from "./create-node-elements";
import { CreateLineageParams, Lineage } from "./../lineage-types";
import createLinks from "./create-links";

export default function createLineage({
  data,
  nodeSize,
  childrenNodeSize,
  padding,
  gap,
  direction,
  maxChildrenHeight,
  links,
  biDirectionalLinks,
}: CreateLineageParams): Lineage {
  /**
   * create node elements with their cordinates
   */
  const { nodeElements, levelGaps, levelPointers, nodeElementsMap } =
    createNodeElements(
      data,
      nodeSize,
      childrenNodeSize,
      padding,
      gap,
      direction,
      maxChildrenHeight
    );
  /**
   * create links with their repsepctive co-ordinates
   */
  //   console.time("Creating links");
  const nodeLinks = createLinks(links, nodeElementsMap, biDirectionalLinks);
  //   console.timeEnd("Creating links");
  return {
    nodes: nodeElements,
    links: nodeLinks,
    gaps: levelGaps,
    levelPointers,
  };
}
