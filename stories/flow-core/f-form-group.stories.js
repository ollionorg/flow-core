import { html } from "lit-html";
import FDivAnatomy from "../svg/i-fdiv-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-form-group",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => html`
		<f-form>
			<f-form-group
				data-qa-id="testQaId"
				variant=${args.variant}
				.label=${{
					title: "Test for Variant 1",
					description: "This is a description"
				}}
				direction="horizontal"
				.gap=${args.gap}
				.collapse=${args.collapse}
				?is-collapsed=${args["is-collapsed"]}
				?can-duplicate=${args["can-duplicate"]}
			>
				<f-input aria-label="Sample Input" placeholder="This is an input field"></f-input>
				<f-divider></f-divider>
				<f-button aria-label="Submit Button" label="submit" variant="curved"></f-button>
			</f-form-group>
			<f-divider></f-divider>
			<f-form-group
				variant=${args.variant}
				.label=${{
					title: "Test for Variant 2",
					description: "This is a description"
				}}
				direction="horizontal"
				.gap=${args.gap}
				?can-duplicate=${args["can-duplicate"]}
			>
				<f-select
					aria-label="Sample Select"
					.value=${"+91"}
					.options=${["+91", "+92", "+93"]}
					width="150"
					.clear=${false}
				></f-select>
				<f-divider></f-divider>
				<f-input aria-label="Another Input" placeholder="This is an input field"></f-input>
			</f-form-group>
			<f-divider></f-divider>
			<f-form-group
				.label=${{
					title: "Test for direction (f-input)",
					description: "This is a description"
				}}
				direction=${args.direction}
				.gap=${args.gap}
				.collapse=${args.collapse}
				?is-collapsed=${args["is-collapsed"]}
			>
				<f-input aria-label="Input 2" placeholder="This is an input field"></f-input>
				<f-divider></f-divider>
				<f-input aria-label="Input 3" placeholder="This is an input field"></f-input>
			</f-form-group>
			<f-divider></f-divider>
			<f-form-group
				.label=${{
					title: "Test for direction (f-checkbox)",
					description: "This is a description"
				}}
				direction=${args.direction}
				.gap=${args.gap}
				.collapse=${args.collapse}
				?is-collapsed=${args["is-collapsed"]}
			>
				<f-checkbox aria-label="Apple Checkbox">
					<f-div slot="label">Apple</f-div>
				</f-checkbox>
				<f-checkbox aria-label="Banana Checkbox">
					<f-div slot="label">Banana</f-div>
				</f-checkbox>
				<f-checkbox aria-label="Radio Checkbox">
					<f-div slot="label">Radio</f-div>
				</f-checkbox>
			</f-form-group>
			<f-divider></f-divider>
			<f-form-group
				.label=${{
					title: "Test for direction (f-radio)",
					description: "This is a description"
				}}
				direction=${args.direction}
				.gap=${args.gap}
				.collapse=${args.collapse}
				?is-collapsed=${args["is-collapsed"]}
			>
				<f-radio aria-label="Apple Radio">
					<f-div slot="label">Apple</f-div>
				</f-radio>
				<f-radio aria-label="Banana Radio">
					<f-div slot="label">Banana</f-div>
				</f-radio>
				<f-radio aria-label="Sample Radio">
					<f-div slot="label">Radio</f-div>
				</f-radio>
			</f-form-group>
		</f-form>
	`,

	name: "Playground",

	argTypes: {
		variant: {
			control: "radio",
			options: ["normal", "compact"]
		},

		direction: {
			control: "radio",
			options: ["vertical", "horizontal"]
		},

		gap: {
			control: "select",
			options: ["large", "medium", "small", "x-small"]
		},

		collapse: {
			control: "select",
			options: ["none", "accordion", "text"]
		},

		["is-collapsed"]: {
			control: "boolean"
		},

		["can-duplicate"]: {
			control: {
				type: "boolean"
			}
		}
	},

	args: {
		variant: "block",
		direction: "vertical",
		gap: "small",
		collapse: "none",
		["is-collapsed"]: false,
		["can-duplicate"]: false
	}
};

export const Variant = {
	render: args =>
		html` <f-form>
			<f-form-group
				variant="normal"
				.label=${{
					title: "Test for Variant-Normal",
					description: "This is a description"
				}}
				direction="horizontal"
				gap="small"
			>
				<f-input placeholder="This is an input field"></f-input>
				<f-button label="submit" variant="curved"></f-button>
			</f-form-group>
			<f-divider></f-divider>
			<f-form-group
				variant="compact"
				.label=${{
					title: "Test for Variant-Normal",
					description: "This is a description"
				}}
				direction="horizontal"
				gap="small"
			>
				<f-input placeholder="This is an input field"></f-input>
				<f-button label="submit" variant="curved"></f-button> </f-form-group
		></f-form>`,

	name: "variant"
};

export const Direction = {
	render: args => html`<f-form>
      <f-form-group
        variant="normal"
        .label=${{
					title: "Horizontally aligned",
					description: "This is a description"
				}}
        direction="horizontal"
        gap="large"
      >
        <f-checkbox>
            <f-div slot="label">Apple</f-div>
          </f-checkbox>
          <f-checkbox>
            <f-div slot="label">Banana</f-div>
          </f-checkbox>
          <f-checkbox>
            <f-div slot="label">Radio</f-div>
          </f-checkbox>
      </f-form-group>
      <f-divider></f-divider>
      <f-form-group
        variant="compact"
        .label=${{
					title: "Verically aligned",
					description: "This is a description"
				}}
        direction="vertical"
        gap="large"
      >
         <f-checkbox>
            <f-div slot="label">Apple</f-div>
          </f-checkbox>
          <f-checkbox>
            <f-div slot="label">Banana</f-div>
          </f-checkbox>
          <f-checkbox>
            <f-div slot="label">Radio</f-div>
          </f-checkbox>
    </f-form>`,

	name: "direction"
};

export const Gap = {
	render: args => {
		const gaps = ["x-small", "small", "medium", "large"];

		return html`
			<f-form>
				${gaps.map(
					gap => html`
						<f-form-group
							variant="normal"
							.label=${{
								title: `gap=${gap}`
							}}
							.gap=${gap}
						>
							<f-input placeholder="This is an input field"></f-input>
							<f-input placeholder="This is an input field"></f-input>
						</f-form-group>
						<f-divider></f-divider>
					`
				)}
			</f-form>
		`;
	},

	name: "gap"
};

export const Collapse = {
	render: args => {
		const collapses = ["none", "accordion", "text"];

		return html`
			<f-form>
				${collapses.map(
					item => html`
						<f-form-group
							variant="normal"
							.label=${{
								title: `collapse=${item}`
							}}
							.collapse=${item}
						>
							<f-input placeholder="This is an input field"></f-input>
							<f-input placeholder="This is an input field"></f-input>
						</f-form-group>
						<f-divider></f-divider>
					`
				)}
			</f-form>
		`;
	},

	name: "collapse"
};

export const Flags = {
	render: args =>
		html`<f-form ?separator=${true}>
			<f-form-group
				variant="normal"
				.label=${{
					title: "Group Title (can-duplicate)",
					description: "This is a description"
				}}
				?can-duplicate=${true}
			>
				<f-input placeholder="This is an input field">
					<f-div slot="label">Input title</f-div>
				</f-input>
				<f-input placeholder="This is an input field">
					<f-div slot="label">Input title</f-div>
				</f-input>
			</f-form-group>
			<f-form-group
				variant="normal"
				.label=${{
					title: "Group Title (is-collapsed)",
					description: "This is a description"
				}}
				?is-collapsed=${false}
				collapse="accordion"
			>
				<f-input placeholder="This is an input field">
					<f-div slot="label">is-collpased (false)</f-div>
				</f-input>
				<f-input placeholder="This is an input field">
					<f-div slot="label">Input title</f-div>
				</f-input>
			</f-form-group>
			<f-form> </f-form
		></f-form> `,

	name: "Flags"
};
