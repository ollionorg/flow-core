import { html } from "lit-html";
import fCounterAnatomy from "../svg/i-fcounter-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-counter",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => html`
		<f-counter
			.label=${args.label}
			.size=${args.size}
			.state=${args.state}
			.loading=${args.loading}
			.category=${args.category}
			.disabled=${args.disabled}
		></f-counter>
	`,

	name: "Playground",

	argTypes: {
		category: {
			control: "radio",
			options: ["fill", "outline", "transparent"]
		},

		label: {
			control: "number"
		},

		size: {
			control: "select",
			options: ["large", "medium", "small"]
		},

		state: {
			control: "select",

			options: [
				"neutral",
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
		}
	},

	args: {
		category: "fill",
		label: 88,
		size: "medium",
		state: "neutral",
		loading: false,
		disabled: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fCounterAnatomy)}</div>`,
	name: "Anatomy"
};

export const Category = {
	render: args => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">fill<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" category="fill" state="primary"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">outline</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" category="outline" state="primary"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">transparent<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" category="transparent" state="primary"></f-counter>
        </f-div>
      </f-div>
    </f-div>`,

	name: "category"
};

export const Label = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="row" align="middle-center">
			<f-counter label="8" size="large"></f-counter>
			<f-counter label="88" size="large"></f-counter>
			<f-counter label="8888" size="large"></f-counter>
			<f-counter label="88888" size="large"></f-counter>
			<f-counter label="888888" size="large"></f-counter>
			<f-counter label="8888888" size="large"></f-counter>
			<f-counter label="88888888" size="large"></f-counter>
		</f-div> `,

	name: "label"
};

export const Size = {
	render: args => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">large<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">medium</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="medium"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">small<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="small"></f-counter>
        </f-div>
      </f-div>
    </f-div>`,

	name: "size"
};

export const State = {
	render: args => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">neutral</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="neutral"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">primary<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="primary"></f-counter>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">success</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="success"></f-counter>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">danger</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="danger"></f-counter>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">warning</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="warning"></f-counter>
        </f-div>
      </f-div>
       <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">inherit</f-text>
        </f-div>
                      <f-div height="hug-content" padding="none" align="middle-center" state="warning">
      <f-counter label="888888" size="large" state="inherit"></f-counter>
        </f-div>
        </f-div>
                  <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">custom</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
      <f-counter label="888888" size="large" state="custom,pink"></f-counter>
        </f-div>
      </f-div>
    </f-div>`,

	name: "state"
};

export const Flags = {
	render: args =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Loading</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden">
				<f-counter label="888888" size="large" state="neutral"></f-counter>
				<f-counter label="888888" size="large" state="neutral" loading=${true}></f-counter>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden">
				<f-counter label="888888" size="large" state="custom,deepskyblue"></f-counter>
				<f-counter
					label="888888"
					size="large"
					state="custom,deepskyblue"
					loading=${true}
				></f-counter>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-counter label="888888" size="large" state="neutral"></f-counter>
				<f-counter label="888888" size="large" state="neutral" disabled=${true}></f-counter>
			</f-div>
		</f-div>`,

	name: "Flags"
};
