import { html } from "lit-html";
import samplelogs from "./logs/logs.js";
import { createRef, ref } from "lit/directives/ref.js";
import { FLog } from "@nonfx/flow-log";
import { FPopover } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-log/f-log",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const logElement = createRef<FLog>();
		const popoverElement = createRef<FPopover>();
		const handleExternalSearch = (event: CustomEvent<{ value: string }>) => {
			if (logElement.value) {
				logElement.value.searchKeyword = event.detail.value;
			}
		};
		const toggleOptions = () => {
			if (popoverElement.value) {
				popoverElement.value.open = !popoverElement.value.open;
			}
		};
		return html`<f-div direction="column" height="100%" overflow="scroll">
			<f-div height="hug-content" style="display:none"
				><f-search @input=${handleExternalSearch}></f-search
			></f-div>

			<f-popover
				${ref(popoverElement)}
				target="#log-actions"
				.overlay=${false}
				@overlay-click=${toggleOptions}
				size="hug-content"
				placement="bottom"
			>
				<f-div width="220px" direction="column">
					${[
						{ icon: "i-download", text: "Download" },
						{
							icon: "i-indent",
							text: "Indent"
						},
						{
							icon: "i-expand-3",
							text: "Expand"
						}
					].map(op => {
						return html`<f-div
							state="secondary"
							padding="medium"
							gap="medium"
							clickable
							align="middle-left"
						>
							<f-icon size="small" .source=${op.icon}></f-icon>
							<f-text variant="para" size="medium" weight="regular">${op.text}</f-text>
						</f-div>`;
					})}
				</f-div>
			</f-popover>
			<f-div>
				<f-log
					${ref(logElement)}
					.label=${args.label}
					.logs=${args.logs}
					?show-toolbar=${args["show-toolbar"]}
					?wrap-text=${args["wrap-text"]}
					.logLevels=${args["log-levels"]}
					.selectedLogLevel=${args["selected-log-level"]}
					.searchKeyword=${args["search-keyword"]}
				>
					<f-div gap="small" slot="header" width="100%" align="middle-left">
						<f-text inline>Status:</f-text>
						<f-icon source="i-tick" loading></f-icon>
						<f-text>Running since 2 mins...</f-text>
					</f-div>
					<f-icon-button
						@click=${toggleOptions}
						slot="actions"
						icon="i-more"
						state="neutral"
						category="packed"
						id="log-actions"
					></f-icon-button>
				</f-log> </f-div
		></f-div>`;
	},

	name: "Playground",

	argTypes: {
		label: {
			control: "text"
		},
		logs: {
			control: "text"
		},

		["show-toolbar"]: {
			control: "boolean"
		},

		["wrap-text"]: {
			control: "boolean"
		},
		["highlight-keywords"]: {
			control: "object"
		},
		["log-levels"]: {
			control: "object"
		},
		["selected-log-level"]: {
			control: "text"
		},
		["search-keyword"]: {
			control: "text"
		}
	},

	args: {
		label: "Logs",
		logs: samplelogs,
		["show-toolbar"]: true,
		["wrap-text"]: false,
		["log-levels"]: ["ALL", "ERROR", "WARN", "DEBUG", "INFO", "TRACE", "FATAL"],
		["selected-log-level"]: "ALL",
		["highlight-keywords"]: { terraform: "#BF40BF", ReferenceTransformer: "#00E2B5" }
	}
};

export const Logs = {
	render: () => {
		return html`
			<f-div direction="column" height="100%">
				<f-div height="hug-content">
					<f-text state="warning" size="large">logs are passed using 'logs' attribute</f-text>
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
					<f-text state="warning" size="large"
						>if show-toolbar="true" then Search, Filter and Jump to Line is shown</f-text
					>
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
					<f-text state="warning" size="large"
						>Only "Error", "Warn", "Debug" log level is shown in drodown</f-text
					>
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
					<f-text state="warning" size="large">Only "Error" log level is selected</f-text>
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
					<f-text state="warning" size="large"
						>Set wrap-text="true" if you want to wrap log lines</f-text
					>
				</f-div>
				<f-div>
					<f-log wrap-text .logs=${samplelogs}></f-log>
				</f-div>
			</f-div>
		`;
	},

	name: "wrap-text"
};

export const HighlightKeywords = {
	render: () => {
		return html`
			<f-div direction="column" gap="medium" height="100%">
				<f-div height="hug-content">
					<f-text state="warning" size="large"
						>'terraform' and '' are highlighted with "#BF40BF" and "#00E2B5" respectively by using
						object : '{ terraform: "#BF40BF", ReferenceTransformer: "#00E2B5" }'</f-text
					>
				</f-div>
				<f-div>
					<f-log
						.highlightKeywords=${{ terraform: "#BF40BF", ReferenceTransformer: "#00E2B5" }}
						.logs=${samplelogs}
					></f-log>
				</f-div>
			</f-div>
		`;
	},

	name: "highlight-keywords"
};
