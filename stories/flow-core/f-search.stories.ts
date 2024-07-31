import { html } from "lit-html";
import { FSearchResultWhen } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-search",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleInput = (e: CustomEvent) => {
			console.log(e.detail);
		};

		const handleSearch = (event: CustomEvent) => {
			console.log(event.detail);
		};

		return html`
			<f-div padding="large">
				<f-search
					aria-label="Search Input"
					.value=${args.value}
					.selectedScope=${args["selected-scope"]}
					.variant=${args.variant}
					.category=${args.category}
					.placeholder=${args.placeholder}
					.result=${args.result}
					.scope=${args.scope}
					@input=${handleInput}
					.state=${args.state}
					?disabled=${args.disabled}
					?clear=${args.clear}
					?search-button=${args["search-button"]}
					.size=${args.size}
					.resultMaxHeight=${args["result-max-height"]}
					@search=${handleSearch}
				>
					<f-div slot="label" padding="none" gap="none">Label</f-div>
					<f-div width="100%" slot="help"
						><f-text variant="para" size="small">This is a Subtext</f-text></f-div
					>
					<f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
					<f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>
				</f-search>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		["selected-scope"]: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		disabled: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		["search-button"]: {
			control: "boolean"
		},

		["result-max-height"]: {
			control: "text"
		}
	},

	args: {
		value: "",
		["selected-scope"]: "",
		placeholder: undefined,
		variant: "curved",
		category: "fill",
		state: "default",
		size: "medium",

		disabled: false,
		clear: false,
		["search-button"]: false,

		result: {
			Category1: ["option 1", "option2"],
			Category2: ["option3", "option 4"],
			Category3: ["option5", "option6"]
		},

		scope: [
			"Scope 2",
			"Scope 3",
			"Scope 4",
			"Scope 5",
			"Scope 6",
			"Scope 7",
			"Scope 8",
			"Scope 9",
			"Scope 10",
			"Scope 11",
			"Scope 12",
			"Scope 13",
			"Scope 14",
			"Scope 15",
			"Scope 16",
			"Scope 17",
			"Scope 18"
		]
	}
};

export const Variant = {
	render: () => {
		const variants = ["curved", "round", "block"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Search"
            @input=${handleValue}
            .variant=${item}
            size="medium"
      .result=${[
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis porta dignissim. Etiam a aliquam elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam hendrerit quis lorem cursus consectetur. Donec sem ipsum, scelerisque at nulla vel, rutrum efficitur tortor. Praesent eu tincidunt mauris. Nam eu aliquam turpis. Curabitur placerat maximus tempor. Donec non ante in nunc eleifend elementum eu quis lorem",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18",
				"<f-text state='success'>Using markup</f-text>"
			]}
          >
             <f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: () => {
		const categories = ["fill", "outline", "transparent"];

		const value = "";
		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Search"
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
      .result=${[
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18",
				"<f-text state='success'>Using markup</f-text>"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (category="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: () => {
		const value = "Suggestion 2";
		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Search"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						@input=${handleValue}
						placeholder="Search Here"
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: () => {
		const sizes = ["small", "medium"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-search
            value=${value}
            @input=${handleValue}
            size=${item}
      .result=${[
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: () => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div
										><f-search
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
											.result=${[
												"Suggestion 2",
												"Suggestion 3",
												"Suggestion 4",
												"Suggestion 5",
												"Suggestion 6",
												"Suggestion 7",
												"Suggestion 8",
												"Suggestion 9",
												"Suggestion 10",
												"Suggestion 11",
												"Suggestion 12",
												"Suggestion 13",
												"Suggestion 14",
												"Suggestion 15",
												"Suggestion 16",
												"Suggestion 17",
												"Suggestion 18"
											]}
										>
											<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-search></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Result = {
	render: () => {
		const value = "jane";

		const handleValue = (e: CustomEvent) => {
			console.log("in input", e);
		};

		const handleSelected = (e: CustomEvent) => {
			console.log("in selected", e);
		};

		const template = [
			{
				value: {
					firstname: "henry",
					lastname: "jane"
				},

				template: function (value: string) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}
							>${this.value.firstname} ${this.value.lastname}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return this.value.firstname + " " + this.value.lastname;
				}
			},
			{
				value: {
					firstname: "tony",
					lastname: "stark"
				},

				template: function (value: string) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}
							>${this.value.firstname} ${this.value.lastname}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return this.value.firstname + " " + this.value.lastname;
				}
			}
		];

		const resultWhen = (result: string | Record<string, unknown>, value: string) => {
			console.log("in result when");

			if (value === "*" || value === "$") {
				return true;
			} else if (typeof result === "object") {
				return result
					.toString()
					.toLocaleLowerCase()
					.includes(value?.toLocaleLowerCase() ?? "");
			}

			return (result as string).toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.resultMaxHeight=${"150px"}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for array search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
						<f-div slot="no-data" padding="medium">
							<f-text variant="para" size="small">This is no-data slot.</f-text>
						</f-div>
					</f-search></f-div
				>
				<f-div align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${{
							Category1: ["option 1", "option2"],
							Category2: ["option3", "option 4"],
							Category3: ["option5", "option6"]
						}}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for categorized search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				>
				<f-div align="middle-center">
					<f-search
						value=${value}
						.resultWhen=${resultWhen}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${template}
						@selected=${handleSelected}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for custom template search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				>
			</f-div>
		`;
	},

	name: "result"
};

export const Scope = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.scope=${["scope 1", "scope 2", "scope 3"]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for scope</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "scope"
};

export const selectedScope = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.scope=${["scope 1", "scope 2", "scope 3"]}
						.selectedScope=${"scope 2"}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">'scope 2' is selected</f-div>
						<f-text slot="help" variant="para" size="small"
							>These 3 scopes are used above ["scope 1", "scope 2", "scope 3"]</f-text
						>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "selected-scope"
};

export const resultMaxHeight = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.resultMaxHeight=${"150px"}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>'result-max-height' set to 150px</f-div
						>
						<f-text slot="help" variant="para" size="small"
							>Click in search box to see results/suggestions</f-text
						>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "result-max-height"
};

export const resultWhen = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		const resWhen: FSearchResultWhen = (suggestion, value) => {
			if (value === "*") {
				return true;
			}
			return (suggestion as string).toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.resultWhen=${resWhen}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>'result-when' is used to customised behavior of showing results. (By default, it will
							employ the '.includes' method on each result for filtering and display.)</f-div
						>
						<f-div slot="help" width="100%" direction="column" gap="small">
							<f-text variant="code" size="small"
								>E.g. type '*' in search box to see all result
							</f-text>
							<f-div width="100%" state="subtle">
								<pre style="outline:none !important;">
							const resWhen: FSearchResultWhen = (suggestion, value) => {
								if (value === "*") {
									return true;
								}
								return (suggestion as string).toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
							};
							</pre
								>
							</f-div>
						</f-div>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "result-when"
};

export const Flags = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0, 1, 2, 3].map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size="medium"
            ?search-button=${item === 0 ? true : false}
            ?disabled=${item === 1 ? true : false}
            ?clear=${item === 2 ? true : false}
      ?loading=${item === 3 ? true : false}
          >
            <f-div slot="label" padding="none" gap="none">${
							item === 0 ? "search-button" : item === 1 ? "Disabled" : "Clear Icon on Type"
						}</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
