import { html } from "lit-html";

export default {
	title: "@nonfx/flow-core/f-text",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleEdit = (e: CustomEvent) => {
			console.log("story edited", e.detail.value);
		};

		return html`<f-div direction="column" gap="large">
			<f-text
				.variant=${args.variant}
				.size=${args.size}
				.state=${args.state}
				.align=${args.align}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.ellipsis=${args.ellipsis}
				.highlight=${args.highlight}
				?inline=${args.inline}
				>This is ${args.variant} with ${args.size} and "${args.state}" state. Alignment is
				${args.align}
			</f-text>
			<f-div>
				<f-text
					.variant=${args.variant}
					.size=${args.size}
					.state=${args.state}
					.align=${args.align}
					.loading=${args.loading}
					.disabled=${args.disabled}
					.ellipsis=${args.ellipsis}
					.highlight=${args.highlight}
					?inline=${args.inline}
					?editable=${args.editable}
					@input=${handleEdit}
					>${args.text2}
				</f-text>
			</f-div>
			<f-text
				.variant=${args.variant}
				.size=${args.size}
				.state=${args.state}
				.align=${args.align}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.ellipsis=${args.ellipsis}
				.highlight=${args.highlight}
				?inline=${args.inline}
				>${args.text}</f-text
			>
		</f-div> `;
	},

	name: "Playground",

	argTypes: {
		variant: {
			control: "radio",
			options: ["para", "heading", "code"]
		},

		size: {
			control: "select",
			options: ["x-large", "large", "medium", "small", "x-small"]
		},

		state: {
			control: "select",

			options: [
				"default",
				"secondary",
				"subtle",
				"primary",
				"success",
				"warning",
				"danger",
				"inherit",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		},

		align: {
			control: "radio",
			options: ["left", "right", "center"]
		},

		highlight: {
			control: "text"
		},

		inline: {
			control: "boolean"
		},

		loading: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "disabled",
				eq: false
			}
		},

		disabled: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "loading",
				eq: false
			}
		},

		ellipsis: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "loading",
				eq: false
			}
		},

		editable: {
			control: {
				type: "boolean"
			}
		},

		text: {
			control: "text"
		}
	},

	args: {
		variant: "para",
		size: "medium",
		state: "default",
		align: "left",
		inline: false,
		loading: false,
		disabled: false,
		ellipsis: false,
		editable: false,
		highlight: undefined,
		text: undefined,
		text2: `This is text demo for editable-text section`
	}
};

export const Variant = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-text variant="heading">heading</f-text>
			<f-text variant="para">para</f-text>
			<f-text variant="code">code</f-text>
		</f-div>`,

	name: "variant"
};

export const Size = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-text variant="para" size="large" weight="medium">size of variant="heading"</f-text>
			<f-divider></f-divider>
			<f-div gap="medium" padding="medium" align="middle-center">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="heading" size="x-large" weight="medium">x-large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="heading" size="large" weight="medium">large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="heading" size="medium" weight="medium">medium</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="heading" size="small" weight="medium">small</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="heading" size="x-small" weight="medium">x-small</f-text>
				</f-div>
			</f-div>
			<f-text variant="para" size="large" weight="medium">size of variant="para"</f-text>
			<f-divider></f-divider>
			<f-div gap="medium" padding="medium" align="middle-center">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="x-large" weight="medium">x-large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="medium" weight="medium">medium</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="small" weight="medium">small</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="x-small" weight="medium">x-small</f-text>
				</f-div>
			</f-div>
			<f-text variant="para" size="large" weight="medium">size of variant="code"</f-text>
			<f-divider></f-divider>
			<f-div gap="medium" padding="medium" align="middle-center">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="code" size="x-large" weight="medium">x-large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="code" size="large" weight="medium">large</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="code" size="medium" weight="medium">medium</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="code" size="small" weight="medium">small</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="code" size="x-small" weight="medium">x-small</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "size"
};

export const Weight = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-text variant="para" size="large" weight="medium">weight of variant="heading"</f-text>
			<f-divider></f-divider>
			${["regular", "medium", "bold"].map(weight => {
				return html` <f-div gap="medium" padding="medium" align="middle-center">
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="heading" size="x-large" .weight=${weight}>x-large ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="heading" size="large" .weight=${weight}>large ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="heading" size="medium" .weight=${weight}>medium ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="heading" size="small" .weight=${weight}>small ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="heading" size="x-small" .weight=${weight}>x-small ${weight}</f-text>
					</f-div>
				</f-div>`;
			})}

			<f-text variant="para" size="large" weight="medium">weight of variant="para"</f-text>
			<f-divider></f-divider>
			${["regular", "medium", "bold"].map(weight => {
				return html` <f-div gap="medium" padding="medium" align="middle-center">
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="para" size="x-large" .weight=${weight}>x-large ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="para" size="large" .weight=${weight}>large</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="para" size="medium" .weight=${weight}>medium</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="para" size="small" .weight=${weight}>small</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="para" size="x-small" .weight=${weight}>x-small</f-text>
					</f-div>
				</f-div>`;
			})}
			<f-text variant="para" size="large" weight="medium">weight of variant="code"</f-text>
			<f-divider></f-divider>
			${["regular", "medium", "bold"].map(weight => {
				return html`<f-div gap="medium" padding="medium" align="middle-center">
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="code" size="x-large" .weight=${weight}>x-large ${weight}</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="code" size="large" .weight=${weight}>large</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="code" size="medium" .weight=${weight}>medium</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="code" size="small" .weight=${weight}>small</f-text>
					</f-div>
					<f-div height="hug-content" padding="none" align="middle-center">
						<f-text variant="code" size="x-small" .weight=${weight}>x-small</f-text>
					</f-div>
				</f-div>`;
			})}
		</f-div>`,

	name: "weight"
};

export const State = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="column" state="primary">
			<f-text variant="para" size="large" weight="medium" state="default"
				>This is a default state. This is a default state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="secondary"
				>This is a secondary state. This is a secondary state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="subtle"
				>This is a subtle state. This is a subtle state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="primary"
				>This is a primary state. This is a primary state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="success"
				>This is a success state. This is a success state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="danger"
				>This is a danger state. This is a danger state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="warning"
				>This is a warning state. This is a warning state.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="inherit"
				>This is a inherit state. Inherit color from parent f-div.</f-text
			>
			<f-text variant="para" size="large" weight="medium" state="custom,pink"
				>This is a "custom, pink" state. This is a "custom, pink" state.</f-text
			>
		</f-div>`,

	name: "state"
};

export const Align = {
	render: () => html`
		<br />
		<f-text variant="para" size="large" weight="medium" align="left">This is left aligned.</f-text
		><br />
		<f-text variant="para" size="large" weight="medium" align="center"
			>This is center aligned.</f-text
		><br />
		<f-text variant="para" size="large" weight="medium" align="right">This is right aligned.</f-text
		><br />
	`,

	name: "align"
};

export const Highlight = {
	render: () => html`
		<br />
		<f-text variant="para" size="large" weight="medium" align="left" highlight="left"
			>This is left aligned.</f-text
		><br />
	`,

	name: "highlight"
};

export const Flags = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden" height="hug-content">
				<f-text variant="para" weight="regular" ?inline=${false}>Normal Text</f-text>
				<f-text variant="para" weight="regular" ?inline=${true}>Inline Text</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden" height="hug-content">
				<f-div width="hug-content" padding="none">
					<f-text variant="para" weight="regular">Loading</f-text>
				</f-div>
				<f-div width="hug-content" padding="none">
					<f-text variant="para" weight="regular" loading=${true}>Loading</f-text>
				</f-div>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden" height="hug-content">
				<f-div width="hug-content" padding="none">
					<f-text variant="para" weight="regular">Not Disabled</f-text>
				</f-div>
				<f-div width="hug-content" padding="none">
					<f-text variant="para" weight="regular" disabled=${true}>Disabled</f-text>
				</f-div>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden" height="hug-content">
				<f-div width="300px" padding="none">
					<f-text variant="para" weight="regular"
						>We can see the ellipis happening here when ellipsis="true"</f-text
					>
				</f-div>
				<f-div width="200px" padding="none">
					<f-text variant="para" weight="regular" ellipsis=${true}
						>We can see the ellipis happening here when ellipsis="true"</f-text
					>
				</f-div>
			</f-div>
		</f-div>`,

	name: "Flags"
};
