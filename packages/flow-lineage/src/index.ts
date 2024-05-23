export * from "./components/f-lineage/f-lineage";
export * from "./components/f-lineage/lineage-types";
export * from "./components/f-dag/f-dag";

import { version } from "./../package.json";

console.log(
	`%c@ollion/flow-lineage%cv${version}`,
	"background:#161616;color:white;padding:4px 6px 4px 6px;border-radius:4px 0px 0px 4px",
	"background:#FC6600;color:white;padding:4px 6px 4px 6px;border-radius:0px 4px 4px 0px;"
);
