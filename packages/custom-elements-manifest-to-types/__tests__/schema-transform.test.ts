import { transformSchema } from "../index";
import { customElements } from "./custom-elements1";

describe("custom-elements-manifest-to-types", () => {
	it("transforms custom-elemenets-1.json schema", async () => {
		expect(await transformSchema(customElements, "vue2")).toMatchInlineSnapshot(`
"/* eslint-disable */
import type { VueConstructor } from "vue";

declare module "vue" {
	export interface GlobalComponents {
		"f-icon": VueConstructor<
			{
				$props: {
					state?: "primary" | "success" | "warning";
				};
			} & Vue
		>;
	}
}
"
`);
	});
});
