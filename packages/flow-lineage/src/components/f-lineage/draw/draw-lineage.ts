import { DrawLineageParams } from "../lineage-types";
import drawLinks from "./draw-links";
import drawNodes from "./draw-nodes";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function drawLineage(params: DrawLineageParams) {
	if (params.lineage) {
		drawLinks(params);
		drawNodes(params);
	}
}
