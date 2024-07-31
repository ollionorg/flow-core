import { html } from "lit-html";
import fIconAnatomy from "../svg/i-ficon-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-icon",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const handleClick = event => {
			console.log(event);
		};

		return html`<f-div direction="column" padding="x-large">
			<f-icon
				source=${args.source}
				.size=${args.size}
				.state=${args.state}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.clickable=${args.clickable}
				tooltip="Icon tooltip"
				@click=${handleClick}
			></f-icon>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
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
				"danger",
				"warning",
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
		},

		clickable: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "disabled",
				eq: false
			}
		}
	},

	args: {
		source: "i-plus",
		size: "medium",
		state: "primary",
		loading: false,
		disabled: false,
		clickable: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fIconAnatomy)}</div>`,
	name: "Anatomy"
};

export const Source = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="row" align="middle-center">
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Icon from library</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-icon source="i-plus"></f-icon>
				</f-div>
			</f-div>
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Emoji as a source</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center" overflow="hidden">
					<f-icon source="😃"></f-icon>
				</f-div>
			</f-div>
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Icon from URL</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center" overflow="hidden">
					<f-icon
						source="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Information_icon.svg/1024px-Information_icon.svg.png"
					></f-icon>
				</f-div>
			</f-div>
		</f-div>`,

	name: "source"
};

export const Size = {
	render: args => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">x-large</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">large<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="large"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">medium</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="medium"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">small<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="small"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">x-small</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-small"></f-icon>
        </f-div>
      </f-div>
    </f-div>`,

	name: "size"
};

export const State = {
	render: args => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">default</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="default"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">secondary<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="secondary"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">subtle</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="subtle"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">primary<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="primary"></f-icon>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">success</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="success"></f-icon>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">danger</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="danger"></f-icon>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">warning</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="warning"></f-icon>
        </f-div>
      </f-div>
                  <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">inherit</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center" state="success">
          <f-icon source="i-plus" size="x-large" state="inhherit"></f-icon>
        </f-div>
      </f-div>
                  <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">custom, pink</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-icon source="i-plus" size="x-large" state="custom,pink"></f-icon>
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
				<f-icon source="i-plus" state="primary" size="x-large"></f-icon>
				<f-icon source="i-plus" state="primary" size="x-large" loading=${true}></f-icon>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon source="i-plus" state="primary" size="x-large"></f-icon>
				<f-icon source="i-plus" state="primary" size="x-large" disabled=${true}></f-icon>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Clickable</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon source="i-plus" state="primary" size="x-large" clickable=${true}></f-icon>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Focused</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon source="i-plus" state="primary" size="x-large"></f-icon>
				<f-icon source="i-plus" state="primary" size="x-large" focused=${true}></f-icon>
			</f-div>
		</f-div>`,

	name: "Flags"
};
