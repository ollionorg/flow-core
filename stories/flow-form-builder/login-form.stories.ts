import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { FFormInputElements, validateField } from "@cldcvr/flow-form-builder";

export default {
	title: "@cldcvr/flow-form-builder",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<unknown>;

export const LoginForm = {
	render: () => {
		const formRef = createRef<HTMLFormElement>();

		const login = () => {
			if (formRef.value) {
				const formData = new FormData(formRef.value);
				// output as an object
				console.log(Object.fromEntries(formData));
				const usernameElement = formRef.value.querySelector(
					"[name='username']"
				) as FFormInputElements;
				validateField(
					{
						type: "text",
						label: {
							title: "Username"
						},
						validationRules: [
							{
								name: "required"
							}
						]
					},
					usernameElement,
					false
				);

				const passwordElement = formRef.value.querySelector(
					"[name='password']"
				) as FFormInputElements;
				validateField(
					{
						type: "password",
						label: {
							title: "Password"
						},
						validationRules: [
							{
								name: "required"
							},
							{
								name: "min",
								params: {
									length: 6
								}
							}
						]
					},
					passwordElement,
					false
				);
			}
		};
		const checkSubmit = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				login();
			}
		};
		return html`
			<f-div align="middle-center" height="100%">
				<form ${ref(formRef)} @keyup=${checkSubmit}>
					<f-div
						direction="column"
						variant="curved"
						padding="x-large"
						gap="small"
						state="secondary"
						width="500px"
						height="hug-content"
					>
						<f-div align="middle-center" padding="none none large none">
							<f-text variant="heading" inline weight="bold" size="large">Log In</f-text>
						</f-div>
						<f-form-field>
							<f-div slot="label" padding="none" gap="none">Email</f-div>
							<f-input-light
								placeholder="Username"
								data-qa-element-id="username"
								autofocus
								name="username"
								autocomplete="on"
								clear
							></f-input-light>
						</f-form-field>
						<f-form-field>
							<f-div slot="label" padding="none" gap="none">Password</f-div>
							<f-div slot="subtitle" padding="none" gap="none"
								><f-text size="small">
									<a href="#">Forgot password?</a>
								</f-text></f-div
							>
							<f-input-light
								placeholder="Password"
								type="password"
								data-qa-element-id="userPassword"
								name="password"
								autocomplete="on"
								clear
							></f-input-light>
						</f-form-field>
						<f-div padding="small" align="middle-center" gap="medium">
							<f-button @click=${login} style="width:150px" label="log in"></f-button>
							<f-button
								style="width:150px"
								label="sign up"
								category="outline"
								state="neutral"
							></f-button>
						</f-div>
						<f-div direction="column" gap="medium" padding="small" align="middle-center">
							<f-text size="small">Or, log in with</f-text>
							<f-div align="middle-center" gap="medium" height="28px">
								<f-icon source="p-google" size="large"></f-icon>
								<f-divider></f-divider>
								<f-icon source="p-azure" size="large"></f-icon>
								<f-divider></f-divider>
								<f-icon source="p-github" size="large"></f-icon>
							</f-div>
						</f-div>
					</f-div>
				</form>
			</f-div>
		`;
	},

	name: "Login Form"
};
