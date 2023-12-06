import { html } from "lit-html";
import samplelogs from "./logs/logs.js";

export default {
	title: "@cldcvr/flow-log/f-log",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		return html`<f-div direction="column" height="100%"
			><f-log
				.logs=${args.logs}
				?show-search=${args["show-search"]}
				?wrap-text=${args["wrap-text"]}
			></f-log
		></f-div>`;
	},

	name: "Playground",

	argTypes: {
		logs: {
			control: "text"
		},

		["show-search"]: {
			control: "boolean"
		},

		["wrap-text"]: {
			control: "boolean"
		}
	},

	args: {
		logs: samplelogs,
		["show-search"]: false,
		["wrap-text"]: false
	}
};

export const Logs = {
	render: () => {
		return html`
			<f-div direction="column" height="100%"><f-log .logs=${samplelogs}></f-log></f-div>
		`;
	},

	name: "logs"
};

export const ShowSearch = {
	render: () => {
		return html`
			<f-div direction="column" padding="x-large" height="100%"
				><f-log ?show-search=${true} .logs=${samplelogs}></f-log
			></f-div>
		`;
	},

	name: "show-search"
};
