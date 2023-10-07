import { LineageNodeChildren } from "src/components/f-lineage/lineage-types";
import getComputedHTML from "./get-computed-html";

function isEmpty(obj: Object) {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
}

function getChildrenArray(
  children: Record<string, LineageNodeChildren> | undefined
): (LineageNodeChildren & { id: string })[] {
  if (children) {
    return Object.entries(children).map(([nodeid, CNode]) => {
      return {
        ...CNode,
        id: nodeid,
      };
    });
  }
  return [];
}

function getChildCount(
  children: Record<string, LineageNodeChildren> | undefined
) {
  if (children) {
    return Object.keys(children).length;
  }
  return 0;
}

function debounce(func: Function) {
  let timer: number;
  return function (event: Event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 300, event);
  };
}
export { getComputedHTML, isEmpty, getChildrenArray, getChildCount, debounce };
