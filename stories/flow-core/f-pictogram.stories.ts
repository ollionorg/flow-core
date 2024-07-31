import { html } from "lit-html";
import fPictogramAnatomy from "../svg/i-fpictogram-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import {
	FPictogramVariant,
	FPictogramCategory,
	FPictogramSize,
	FPictogramState
} from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-pictogram",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export type PictogramArgs = {
	source: string;
	variant: FPictogramVariant;
	category: FPictogramCategory;
	size: FPictogramSize;
	state: FPictogramState;
	"auto-bg": boolean;
	disabled: boolean;
	clickable: boolean;
	loading: boolean;
};

export const Playground = {
	render: (args: PictogramArgs) =>
		html`<f-div direction="column" padding="x-large">
			<f-pictogram
				.variant=${args.variant}
				source=${args.source}
				.size=${args.size}
				.state=${args.state}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.clickable=${args.clickable}
				?auto-bg=${args["auto-bg"]}
				.category=${args.category}
			></f-pictogram>
		</f-div>`,

	name: "Playground",

	argTypes: {
		variant: {
			control: "select",
			options: ["squircle", "sqaure", "circle", "hexagon"]
		},

		category: {
			control: "radio",
			options: ["fill", "outline"]
		},

		size: {
			control: "select",
			options: ["x-large", "large", "medium", "small"]
		},

		state: {
			control: "select",
			options: ["default", "primary", "success", "danger", "warning", "inherit"]
		},

		["auto-bg"]: {
			control: {
				type: "boolean"
			}
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
		variant: "squircle",
		category: "fill",
		source: "i-app",
		size: "medium",
		state: "default",
		["auto-bg"]: false,
		loading: false,
		disabled: false,
		clickable: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fPictogramAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="row" align="middle-center">
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">squircle</f-text>
				<f-pictogram source="💬"></f-pictogram>
			</f-div>
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">square</f-text>
				<f-pictogram source="🎲" variant="square"></f-pictogram>
			</f-div>
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">hexagon</f-text>
				<f-pictogram source="🚀" variant="hexagon"></f-pictogram>
			</f-div>
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">circle</f-text>
				<f-pictogram source="🚗" variant="circle"></f-pictogram>
			</f-div>
		</f-div>`,

	name: "variant",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Category = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="row" align="middle-center">
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">outline</f-text>
				<f-pictogram
					source="i-tick"
					size="x-large"
					state="success"
					category="outline"
				></f-pictogram>
			</f-div>
			<f-div
				height="hug-content"
				align="middle-center"
				padding="none"
				gap="large"
				direction="column"
			>
				<f-text variant="para" size="large" weight="medium">fill</f-text>
				<f-pictogram source="i-tick" size="x-large" state="success" category="fill"></f-pictogram>
			</f-div>
		</f-div>`,

	name: "category",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Source = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="row" align="middle-center">
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Icon from library</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-pictogram source="i-app"></f-pictogram>
				</f-div>
			</f-div>
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Emoji as a source</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center" overflow="hidden">
					<f-pictogram source="💬"></f-pictogram>
				</f-div>
			</f-div>
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Text as a source</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center" overflow="hidden">
					<f-pictogram source="A1"></f-pictogram>
				</f-div>
			</f-div>
			<f-div padding="large" gap="medium" direction="column" width="hug-content">
				<f-div height="hug-content" padding="none" align="middle-center">
					<f-text variant="para" size="large" weight="medium">Image from URL</f-text>
				</f-div>
				<f-div height="hug-content" padding="none" align="middle-center" overflow="hidden">
					<f-pictogram
						source="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
					></f-pictogram>
				</f-div>
			</f-div>
		</f-div>`,

	name: "source",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Size = {
	render: () => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">x-large</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" size="x-large"></f-pictogram>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">large<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" size="large"></f-pictogram>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">medium</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" size="medium"></f-pictogram>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">small<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" size="small"></f-pictogram>
        </f-div>
      </f-div>
    </f-div>`,

	name: "size",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const State = {
	render: () => html`<f-div gap="medium" padding="x-large" align="middle-center">
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">default</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" state="default"></f-pictogram>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">primary<f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" state="primary"></f-pictogram>
        </f-div>
      </f-div>
      <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">success</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" state="success"></f-pictogram>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">danger</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" state="danger"></f-pictogram>
        </f-div>
      </f-div>
            <f-div padding="large" gap="medium" direction="column" width="hug-content">
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-text variant="para" size="large" weight="medium">warning</f-text>
        </f-div>
        <f-div height="hug-content" padding="none" align="middle-center">
          <f-pictogram source="💬" state="warning"></f-pictogram>
        </f-div>
      </f-div>
    </f-div>`,

	name: "state",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Flags = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Loading</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden">
				<f-pictogram source="💬" size="x-large"></f-pictogram>
				<f-pictogram source="💬" size="x-large" ?loading=${true}></f-pictogram>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-pictogram source="💬" size="x-large"></f-pictogram>
				<f-pictogram source="💬" size="x-large" ?disabled=${true}></f-pictogram>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Clickable</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-pictogram source="💬" size="x-large" ?clickable=${true}></f-pictogram>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">auto-bg</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-pictogram variant="circle" source="AN" size="x-large" auto-bg=${true}></f-pictogram>
			</f-div>
		</f-div>`,

	name: "Flags",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};
