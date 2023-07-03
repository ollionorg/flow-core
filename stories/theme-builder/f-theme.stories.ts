import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import generateTheme from "./generate-theme-css";

// export default {
// 	title: "Theme Builder"
// } as Meta;

const Template: Story<unknown> = () => {
	const rootStyles = getComputedStyle(document.documentElement);
	const themeTokens: Record<string, string> = {
		["--color-primary-secondary"]: rootStyles.getPropertyValue("--color-primary-secondary"),
		["--color-primary-surface"]: rootStyles.getPropertyValue("--color-primary-surface"),
		["--color-success-default"]: rootStyles.getPropertyValue("--color-success-default"),
		["--color-primary-subtle"]: rootStyles.getPropertyValue("--color-primary-subtle"),
		["--color-warning-text"]: rootStyles.getPropertyValue("--color-warning-text"),
		["--color-success-subtle"]: rootStyles.getPropertyValue("--color-success-subtle"),
		["--color-highlight-secondary"]: rootStyles.getPropertyValue("--color-highlight-secondary"),
		["--color-success-secondary"]: rootStyles.getPropertyValue("--color-success-secondary"),
		["--color-success-surface"]: rootStyles.getPropertyValue("--color-success-surface"),
		["--color-highlight-default"]: rootStyles.getPropertyValue("--color-highlight-default"),
		["--color-primary-text"]: rootStyles.getPropertyValue("--color-primary-text"),
		["--color-highlight-text"]: rootStyles.getPropertyValue("--color-highlight-text"),
		["--color-highlight-subtle"]: rootStyles.getPropertyValue("--color-highlight-subtle"),
		["--color-danger-text"]: rootStyles.getPropertyValue("--color-danger-text"),
		["--color-danger-subtle"]: rootStyles.getPropertyValue("--color-danger-subtle"),
		["--color-danger-secondary"]: rootStyles.getPropertyValue("--color-danger-secondary"),
		["--color-warning-secondary"]: rootStyles.getPropertyValue("--color-warning-secondary"),
		["--color-warning-surface"]: rootStyles.getPropertyValue("--color-warning-surface"),
		["--color-warning-default"]: rootStyles.getPropertyValue("--color-warning-default"),
		["--color-warning-subtle"]: rootStyles.getPropertyValue("--color-warning-subtle"),
		["--color-danger-surface"]: rootStyles.getPropertyValue("--color-danger-surface"),
		["--color-danger-default"]: rootStyles.getPropertyValue("--color-danger-default"),
		["--color-highlight-surface"]: rootStyles.getPropertyValue("--color-highlight-surface"),
		["--color-primary-default"]: rootStyles.getPropertyValue("--color-primary-default"),
		["--color-success-text"]: rootStyles.getPropertyValue("--color-success-text"),
		["--color-hover"]: rootStyles.getPropertyValue("--color-hover"),
		["--color-selected"]: rootStyles.getPropertyValue("--color-selected"),
		["--color-icon-default"]: rootStyles.getPropertyValue("--color-icon-default"),
		["--color-icon-secondary"]: rootStyles.getPropertyValue("--color-icon-secondary"),
		["--color-text-subtle"]: rootStyles.getPropertyValue("--color-text-subtle"),
		["--color-text-default"]: rootStyles.getPropertyValue("--color-text-default"),
		["--color-icon-subtle"]: rootStyles.getPropertyValue("--color-icon-subtle"),
		["--color-text-secondary"]: rootStyles.getPropertyValue("--color-text-secondary"),
		["--color-neutral-subtle"]: rootStyles.getPropertyValue("--color-neutral-subtle"),
		["--color-neutral-text"]: rootStyles.getPropertyValue("--color-neutral-text"),
		["--color-neutral-default"]: rootStyles.getPropertyValue("--color-neutral-default"),
		["--color-surface-subtle"]: rootStyles.getPropertyValue("--color-surface-subtle"),
		["--color-surface-tertiary"]: rootStyles.getPropertyValue("--color-surface-tertiary"),
		["--color-neutral-surface"]: rootStyles.getPropertyValue("--color-neutral-surface"),
		["--color-neutral-secondary"]: rootStyles.getPropertyValue("--color-neutral-secondary"),
		["--color-surface-secondary"]: rootStyles.getPropertyValue("--color-surface-secondary"),
		["--color-surface-default"]: rootStyles.getPropertyValue("--color-surface-default"),
		["--color-border-subtle"]: rootStyles.getPropertyValue("--color-border-subtle"),
		["--color-border-secondary"]: rootStyles.getPropertyValue("--color-border-secondary"),
		["--color-border-default"]: rootStyles.getPropertyValue("--color-border-default")
	};

	const onColorSelect = (token: string, event: InputEvent) => {
		themeTokens[token] = (event?.target as HTMLInputElement)?.value;
		document.documentElement.style.setProperty(token, themeTokens[token]);
	};
	const downloadTheme = () => {
		generateTheme("custom-theme", themeTokens);
	};
	return html`
		<f-div
			id="customTheme"
			width="100%"
			height="100%"
			border="small"
			state="default"
			padding="medium"
			gap="small"
			data-theme="custom-theme"
		>
			<f-div width="320px" direction="column" gap="small" overflow="scroll">
				${Object.keys(themeTokens)
					.sort()
					.map(token => {
						const value = themeTokens[token];
						return html`
							<f-div gap="x-small" height="hug-content" padding="small" align="middle-left">
								<f-text>${token}</f-text>
								<input
									type="color"
									@input=${(event: InputEvent) => onColorSelect(token, event)}
									.value=${value}
									style="width:36px"
								/>
							</f-div>
						`;
					})}
			</f-div>
			<f-divider></f-divider>
			<f-div direction="column">
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
			</f-div>
			<f-button label="download" @click=${downloadTheme}></f-button>
		</f-div>
	`;
};

export const basic = Template.bind({});
