import {
  LineageNode,
  LineageNodeSize,
  LineageNodeElement,
  LineageDirection,
  LineageBaseNode,
  LineageNodeChildren,
  LineageLevelGaps,
  LevelPointer,
} from "./../lineage-types";

import { getChildrenArray, isEmpty } from "./../../../utils";

export default function createNodeElements(
  data: LineageNode[],
  nodeSize: LineageNodeSize,
  childrenNodeSize: LineageNodeSize,
  padding: number,
  gap: number,
  direction: LineageDirection,
  maxChildrenHeight: number
) {
  //   console.time("Co-ordinate Algo duration");
  /**
   * sub class to hold current pointers
   */
  class Pointer {
    x: number;
    y: number;
    maxY?: number; // maxY due to childrens

    static levelPointers: Record<number, Pointer> = {}; // holds level pointers

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    next(level: number) {
      // return if exisiting pointer found
      if (Pointer.levelPointers[level]) {
        return Pointer.levelPointers[level];
      }
      if (direction === "horizontal") {
        /**
         * for horizontal direction calculate appropriate gap
         */
        Pointer.levelPointers[level] = new Pointer(
          this.x + nodeSize.width + gap,
          padding
        );
      } else {
        /**
         * for vertical direction calculate appropriate gap
         */
        const y = this.maxY ? this.maxY + gap : this.y + nodeSize.height + gap;
        Pointer.levelPointers[level] = new Pointer(padding, y);
      }

      return Pointer.levelPointers[level];
    }
  }
  /**
   * starting point of plotting
   */
  Pointer.levelPointers[1] = new Pointer(padding, padding);

  const nodeElements: LineageNodeElement[] = [];
  const nodeElementsMap: Record<string, LineageNodeElement> = {};

  const levelGaps: LineageLevelGaps = {};

  /**
   *
   * @param node : of which x,y calculated
   * @param levelPointer : level pointer which x,y of last node
   */
  const getComputedElement = (
    node: LineageNode,
    level: number,
    levelPointer: Pointer
  ): LineageNodeElement => {
    const nodeElement: LineageNodeElement = {
      id: node.id,
      fData: node.fData,
      fNodeMeta: node.fNodeMeta,
      links: node.links,
      fChildren: node.fChildren,
      fHideChildren:
        node.fHideChildren === true || node.fHideChildren === undefined
          ? true
          : false,
      level,
      x: levelPointer.x,
      y: levelPointer.y,
      offset: 0,
      fNodeTemplate: node.fNodeTemplate,
      fClick: node.fClick,
      fRightClick: node.fRightClick,
    };

    /**
     * Check if node has childrens
     */
    if (node.fChildren && !isEmpty(node.fChildren)) {
      levelPointer.y += nodeSize.height;
      const children = getChildrenArray(node.fChildren);
      const totalChildNodeHeight = childrenNodeSize.height * children.length;

      if (totalChildNodeHeight > maxChildrenHeight) {
        nodeElement.hasScrollbaleChildren = true;
      }
      /**
       * compute child node elements
       */
      computeElements(children, levelPointer, level, true, nodeElement).catch(
        (error) => {
          console.error(error);
        }
      );

      /**
       * storing last child co-ordinates
       */
      nodeElement.childrenYMax = levelPointer.y;
      nodeElement.childrenXMax = levelPointer.x + childrenNodeSize.width / 2;
      if (direction === "vertical") {
        /**
         * checking level max Y
         */
        const maxYWhenScrollBar =
          nodeElement.y + nodeSize.height + maxChildrenHeight;
        if (
          nodeElement.hasScrollbaleChildren &&
          levelPointer.y > maxYWhenScrollBar
        ) {
          levelPointer.maxY = maxYWhenScrollBar;
          nodeElement.childrenYMax = maxYWhenScrollBar;
        } else if (levelPointer.y > (levelPointer.maxY ?? 0)) {
          levelPointer.maxY = levelPointer.y;
        }

        levelPointer.y = nodeElement.y;
      } else {
        levelPointer.y -= nodeSize.height;

        if (nodeElement.hasScrollbaleChildren) {
          levelPointer.y = nodeElement.y + maxChildrenHeight;
        }
      }

      if (nodeElement.childrenYMax && nodeElement.fHideChildren) {
        levelPointer.y = nodeElement.y;
      }
    }

    /**
     * Increment pointer for next node
     */
    if (direction === "horizontal") {
      levelPointer.y += nodeSize.height + gap;
      /**
       * adding gap co-ordinates
       */
      if (!levelGaps[level]) {
        levelGaps[level] = [];
      }
      levelGaps[level].push({
        x: levelPointer.x,
        y: levelPointer.y - gap,
      });
    } else {
      levelPointer.x += nodeSize.width + gap;
      /**
       * adding gap co-ordinates
       */
      if (!levelGaps[level]) {
        levelGaps[level] = [];
      }
      levelGaps[level].push({
        x: levelPointer.x - gap,
        y: levelPointer.y,
      });
    }

    return nodeElement;
  };

  /**
   *
   * @param node : of which x,y calculated
   * @param levelPointer : level pointer which x,y of last node
   */
  const getComputedChildrenElement = (
    node: LineageNodeChildren,
    level: number,
    levelPointer: Pointer,
    parent: LineageNodeElement | undefined
  ): LineageNodeElement => {
    /**
     * add child node co-ordinates based on current pointer
     */
    const nodeElement: LineageNodeElement = {
      id: node.id,
      fData: node.fData,
      fNodeMeta: node.fNodeMeta,
      links: node.links,
      level,
      x: levelPointer.x,
      y: levelPointer.y,
      isChildren: true,
      parentId: parent?.id,
      parent,
      fNodeTemplate: node.fNodeTemplate,
      fClick: node.fClick,
      fRightClick: node.fRightClick,
    };
    /**
     * Increment child node pointer
     */
    levelPointer.y += childrenNodeSize.height;

    return nodeElement;
  };

  /**
   * compute node elements with their respective co-ordib=nates based on heirarchy and relation
   * @param nodes :  list nodes given by user
   * @param levelPointer : pointer from where to start calculation
   * @param level :  level or heirarhcy in lineage
   */
  const computeElements = async (
    nodes: LineageBaseNode[],
    levelPointer: Pointer,
    level: number,
    isChildren?: boolean,
    parent?: LineageNodeElement
  ) => {
    /**
     * Interate through nodes and calculate co-ordinates
     */
    nodes.forEach((node) => {
      if (isChildren) {
        const nodeElement = getComputedChildrenElement(
          node,
          level,
          levelPointer,
          parent
        );
        nodeElements.push(nodeElement);

        nodeElementsMap[nodeElement.id as string] = nodeElement;
      } else {
        const nodeElement = getComputedElement(node, level, levelPointer);
        nodeElements.push(nodeElement);
        nodeElementsMap[nodeElement.id as string] = nodeElement;
      }

      const parentNode = node as LineageNode;
      if (parentNode.to && parentNode.to.length > 0) {
        computeElements(
          parentNode.to,
          levelPointer.next(level + 1),
          level + 1
        ).catch((error) => {
          console.error(error);
        });
      }
    });
  };
  const pointer = Pointer.levelPointers[1];
  computeElements(data, pointer, 1).catch((error) => {
    console.error(error);
  });

  /**
   * Adjusting vertical gaps
   */
  if (direction === "vertical") {
    Object.keys(Pointer.levelPointers).forEach((key) => {
      const level = Number(key);
      /**
       * check if any level has maxY
       */
      const maxY = Pointer.levelPointers[level].maxY;
      if (maxY !== undefined) {
        /**
         * check if any node has inconsistent gap
         */
        const nodeToCompare = nodeElements.find((node) => {
          return (
            node.level === level + 1 &&
            node.y - maxY !== gap &&
            !node.isChildren
          );
        });
        /**
         * Inconsistent node found , now update y for those nodes
         */
        if (nodeToCompare) {
          const diff = maxY + gap - nodeToCompare?.y;
          nodeElements
            .filter((node) => node.level >= level + 1)
            .forEach((node) => {
              node.y += diff;
            });
        }
      }
    });
  }

  const levelPointers: LevelPointer = {};
  Object.entries(Pointer.levelPointers).forEach((p) => {
    const level = +p[0];
    const pointer = p[1];
    levelPointers[level] = {
      x: pointer.x,
      y: pointer.y,
    };
  });

  //   console.timeEnd("Co-ordinate Algo duration");

  return { nodeElements, levelGaps, levelPointers, nodeElementsMap };
}
