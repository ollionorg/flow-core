import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

// export default {
//   title: "Sandbox",
// } as Meta;

const Template: Story<unknown> = () => {
	return html`
		<f-div width="500px" border="small" padding="medium" gap="small">
			<f-div width="hug-content"> <f-icon source="i-info-fill"></f-icon></f-div>
			<f-div>
				<f-text variant="para" size="small"
					>Automa. Automa. Automa. Automa.Automa. Automa. Automa. Automa. Automa. Automa. Automa.
					Automa.Automa. Automa. Automa.Automa.Automa. Automa. Automa.
				</f-text>
			</f-div>

			<f-div width="hug-content">
				<f-icon source="i-close" size="x-small"></f-icon>
			</f-div>
		</f-div>

		<br /><br /><br /><br />

		<f-div direction="row" width="500px" border="small" padding="small">
			<f-icon source="i-info-fill"></f-icon>

			<f-text variant="para" size="small">Automa. </f-text>

			<f-icon source="i-close" size="x-small"></f-icon>
		</f-div>
	`;
};

export const basic = Template.bind({});

export default {
	title: "F Sandbox"
	// argTypes: {
	// 	field: {
	// 		control: false
	// 	}
	// }
} as Meta;
