import { html } from "lit-html";
import fDividerAnatomy from "../svg/i-fdivider-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import samplelogs from "../logs/logs.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";

export default {
	title: "@cldcvr/flow-log/@cldcvr/flow-core/f-log",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleClose = e => {
			console.log(e.detail.value);

			const handleInput = e => {
				updateArgs({
					["show-search"]: e.detail.value
				});
			};
		};

		return html`<f-div direction="column" padding="x-large" height="100%"
			><f-log
				.logs=${args.logs}
				?show-search=${args["show-search"]}
				?show-scrollbar=${args["show-scrollbar"]}
				@close=${handleClose}
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

		["show-scrollbar"]: {
			control: "boolean"
		}
	},

	args: {
		logs: samplelogs,
		["show-search"]: false,
		["show-scrollbar"]: false
	}
};

export const Logs = {
	render: args => {
		return html`
			<f-div direction="column" padding="x-large" height="100%"
				><f-log .logs=${samplelogs}></f-log
			></f-div>
		`;
	},

	name: "logs"
};

export const ShowSearch = {
	render: args => {
		return html`
			<f-div direction="column" padding="x-large" height="100%"
				><f-log ?show-search=${true} .logs=${samplelogs}></f-log
			></f-div>
		`;
	},

	name: "show-search"
};

export const ShowScrollbar = {
	render: args => {
		return html`
			<f-div direction="column" padding="x-large" height="100%"
				><f-log ?show-scrollbar=${true} .logs=${samplelogs}></f-log
			></f-div>
		`;
	},

	name: "show-scrollbar"
};
