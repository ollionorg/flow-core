import { html } from "lit-html";

export default {
	title: "@nonfx/flow-core/f-countdown",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: any) => {
		return html` <f-div padding="small">
			<f-countdown
				.state=${args.state}
				.size=${args.size}
				.category=${args.category}
				label-placement=${args["label-placement"]}
				.duration=${args.duration}
			></f-countdown>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		duration: {
			control: "text"
		},
		size: {
			control: "radio",
			options: ["large", "medium", "small", "x-small"]
		},

		category: {
			control: "radio",
			options: ["fill", "outline"]
		},

		state: {
			control: "select",
			options: [
				"default",
				"primary",
				"success",
				"warning",
				"danger",
				"custom, pink",
				"custom, blue"
			]
		},

		["label-placement"]: {
			control: "radio",
			options: ["left", "right", "bottom", "top", "none"]
		}
	},

	args: {
		duration: "30",
		size: "medium",
		category: "fill",
		state: "default",
		["label-placement"]: "left"
	}
};

export const Duration = {
	render: () => html`
		<f-div gap="large">
			<f-div direction="column" gap="medium" align="middle-center">
				<f-text inline>duration="30"</f-text>
				<f-countdown label-placement="top" duration="30"></f-countdown>
			</f-div>
			<f-div direction="column" gap="medium" align="middle-center">
				<f-text inline>duration="2:30"</f-text>
				<f-countdown label-placement="top" duration="2:30"></f-countdown>
			</f-div>
		</f-div>
	`,

	name: "duration"
};

export const Category = {
	render: () => html`
		<f-div gap="large">
			<f-div direction="column" gap="medium" align="middle-center">
				<f-text inline>category="fill"</f-text>
				<f-countdown label-placement="top" category="fill" duration="20"></f-countdown>
			</f-div>
			<f-div direction="column" gap="medium" align="middle-center">
				<f-text inline>category="outline"</f-text>
				<f-countdown label-placement="top" category="outline" duration="20"></f-countdown>
			</f-div>
		</f-div>
	`,

	name: "category"
};

export const Size = {
	render: () => {
		const sizes = ["large", "medium", "small", "x-small"];
		return html`
			<f-div gap="large">
				${sizes.map(
					item =>
						html` <f-div direction="column" gap="medium" align="middle-center">
							<f-text inline>size="${item}"</f-text>
							<f-countdown
								label-placement="top"
								category="fill"
								duration="20"
								.size=${item}
							></f-countdown>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: () => {
		const states = ["default", "primary", "success", "warning", "danger", "custom,pink"];
		return html`
			<f-div gap="large">
				${states.map(
					item =>
						html` <f-div direction="column" gap="medium" align="middle-center">
							<f-text inline>state="${item}"</f-text>
							<f-countdown
								label-placement="top"
								category="fill"
								duration="20"
								.state=${item}
							></f-countdown>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Label = {
	render: () => {
		const states = ["left", "top", "right", "bottom", "none"];
		return html`
			<f-div gap="large">
				${states.map(
					item =>
						html` <f-div direction="column" gap="medium" align="middle-center">
							<f-text inline>label-placement="${item}"</f-text>
							<f-countdown
								label-placement="top"
								category="fill"
								duration="20"
								state="success"
								label-placement=${item}
							></f-countdown>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "label-placement"
};
