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
				?show-toolbar=${args["show-toolbar"]}
				?wrap-text=${args["wrap-text"]}
			></f-log
		></f-div>`;
	},

	name: "Playground",

	argTypes: {
		logs: {
			control: "text"
		},

		["show-toolbar"]: {
			control: "boolean"
		},

		["wrap-text"]: {
			control: "boolean"
		}
	},

	args: {
		logs: samplelogs,
		["show-toolbar"]: true,
		["wrap-text"]: false
	}
};

export const Logs = {
	render: () => {
		return html`
			<f-div direction="column" height="100%">
				<f-div height="hug-content">
					<f-text>logs are passed using 'logs' attribute</f-text>
				</f-div>
				<f-div><f-log .logs=${samplelogs}></f-log></f-div>
			</f-div>
		`;
	},

	name: "logs"
};

export const ShowToolbar = {
	render: () => {
		return html`
			<f-div direction="column" gap="medium" height="100%">
				<f-div height="hug-content">
					<f-text>if show-toolbar="true" then Search, Filter and Jump to Line is shown</f-text>
				</f-div>
				<f-div><f-log ?show-toolbar=${true} .logs=${samplelogs}></f-log></f-div>
			</f-div>
		`;
	},

	name: "show-toolbar"
};

export const LogLevels = {
	render: () => {
		return html`
			<f-div direction="column" gap="medium" height="100%">
				<f-div height="hug-content">
					<f-text>Only "Error", "Warn", "Debug" log level is shown in drodown</f-text>
				</f-div>
				<f-div>
					<f-log
						?show-toolbar=${true}
						.logs=${samplelogs}
						.logLevels=${["Error", "Warn", "Debug"]}
						.selectedLogLevel=${"Debug"}
					></f-log>
				</f-div>
			</f-div>
		`;
	},

	name: "log-levels"
};

export const SelectedLogLevel = {
	render: () => {
		return html`
			<f-div direction="column" gap="medium" height="100%">
				<f-div height="hug-content">
					<f-text>Only "Error" log level is selected</f-text>
				</f-div>
				<f-div>
					<f-log
						?show-toolbar=${true}
						.logs=${samplelogs}
						.logLevels=${["Error", "Warn", "Debug"]}
						.selectedLogLevel=${"Error"}
					></f-log>
				</f-div>
			</f-div>
		`;
	},

	name: "selected-log-level"
};
export const WrapText = {
	render: () => {
		return html`
			<f-div direction="column" gap="medium" height="100%">
				<f-div height="hug-content">
					<f-text>Set wrap-text="true" if you want to wrap log lines</f-text>
				</f-div>
				<f-div>
					<f-log wrap-text .logs=${samplelogs}></f-log>
				</f-div>
			</f-div>
		`;
	},

	name: "wrap-text"
};
