import { html } from "lit-html";
import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";

import { ConfigUtil } from "@cldcvr/flow-core-config";
import { changeRoute } from "./utils";
import "@cldcvr/flow-core/src";
import "@cldcvr/flow-log/src";
import "@cldcvr/flow-code-editor/src";
import "@cldcvr/flow-table/src";
import { setCustomElementsManifest, setCustomElements } from "@storybook/web-components";
import "./storybook.css";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	backgrounds: { disable: true },
	// themes: {
	// 	default: "f-dark",
	// 	clearable: false,
	// 	list: [
	// 		{ name: "f-dark", color: "#000" },
	// 		{ name: "f-light", color: "#fff" }
	// 	]
	// },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	options: {
		storySort: {
			order: [
				"Foundation",
				["Introduction", "Design tokens", ["Overview"]],
				["Overview", "Color", "Font", "Icon"],
				"Components",
				["f-div", "f-divider", "f-spacer", "f-button", "f-icon", "f-text", "f-pictogram"]
			]
		}
	},
	previewTabs: {
		"storybook/docs/panel": { index: -1 }
	}
};

export const decorators = [
	story => {
		window.onmessage = function (e) {
			if (e.data && typeof e.data === "string") {
				const message = JSON.parse(e.data);

				if (message.event.type === "storybook-addon-themes/change") {
					ConfigUtil.setConfig({ theme: message.event.args[0] });
				}
			}
		};
		ConfigUtil.setConfig({
			iconPack: {
				...SystemIconPack,
				...ProductIconPack,
				...GcpIconPack,
				...AwsIconPack
			}
		});
		return html`
			<div
				style="background-color:var(--color-surface-default);color:var(--color-text-default);font-family:var(--flow-font);height:inherit;padding: 0px;"
			>
				${story()}
			</div>
		`;
	}
];

async function run() {
	const customElements = await (
		await fetch(new URL("../packages/flow-core/custom-elements.json", import.meta.url))
	).json();

	const loggerCustomElements = await (
		await fetch(new URL("../packages/flow-log/custom-elements.json", import.meta.url))
	).json();

	const editorCustomElements = await (
		await fetch(new URL("../packages/flow-code-editor/custom-elements.json", import.meta.url))
	).json();

	const tableCustomElements = await (
		await fetch(new URL("../packages/flow-table/custom-elements.json", import.meta.url))
	).json();

	setCustomElementsManifest(customElements);
	setCustomElements(customElements);
	setCustomElementsManifest(loggerCustomElements);
	setCustomElements(loggerCustomElements);
	setCustomElementsManifest(editorCustomElements);
	setCustomElements(editorCustomElements);

	setCustomElementsManifest(tableCustomElements);
	setCustomElements(tableCustomElements);
}

run();

// 404 error state --start--
const el = document.body.querySelector(".sb-errordisplay.sb-wrapper");
const errorMessage = el.querySelector("#error-message.sb-heading");
const codeMessage = el.querySelector(".sb-errordisplay_code");
const url = new URL(window.location.href);
const url_id = url.searchParams.get("id");

const errorSnippet = `<f-div direction="column" align="middle-center" gap="large" width="hug-content">
		<f-pictogram source="⛔️" variant="hexagon" size="large" state="default"></f-pictogram>
		<f-div direction="column" gap="small" align="middle-center" width="500px" height="hug-content">
			<f-text variant="heading" size="medium" weight="bold" align="center"
				>404 Page Not Found!!</f-text
			>
			<f-text variant="para" size="medium" weight="regular" align="center"
				>Couldn't find story matching '${url_id}'</f-text
			>
		</f-div>
		<f-div align="middle-center">
			<f-button
			id="home-button"
				label="Home"
				size="small"
				variant="round"
			></f-button>
		</f-div>
	</f-div>`;

if (el) {
	const paraDefine = errorSnippet;
	el?.insertAdjacentHTML("afterbegin", paraDefine);
	codeMessage.style.display = "none";
	errorMessage.style.display = "none";
	const homeButton = el.querySelector("#home-button");
	homeButton.addEventListener("click", changePath);
}

function changePath() {
	changeRoute("ft-time-schedule-popover", "/story/foundation-introduction-about--page");
}
//404 error state --end--
