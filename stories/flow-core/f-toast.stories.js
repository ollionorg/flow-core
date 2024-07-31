import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fToastAnatomy from "../svg/i-ftoast-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-toast",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleInput = e => {
			updateArgs({
				value: e.detail.value
			});
		};

		const [toastList, setToastList] = useState([]);

		const add = () => {
			let tempToast = [...toastList];
			tempToast.push(tempToast.length + 1);
			setToastList(tempToast);
		};

		const handleRemove = e => {
			console.log("removed uid - ", e.detail.value);
		};

		return html`
			<f-div width="100%" padding="large">
				<f-div>
					<f-button label="add toast" icon-right="i-plus" @click=${() => add()}></f-button>
				</f-div>
				${toastList?.length > 0
					? toastList?.map((item, index) => {
							return html`<f-toast
								.state=${args.state}
								.duration=${args.duration}
								.type=${args.type}
								?close-button=${args["close-button"]}
								@remove=${handleRemove}
							>
								<f-div direction="column" gap="medium">
									<f-div direction="column" gap="medium">
										<f-div direction="column" gap="x-small">
											<f-text variant="heading" size="small" weight="bold"
												>Toast Message Header ${item}</f-text
											>
											<f-text variant="para" size="small" weight="regular"
												>Detailed description of the activity goes here</f-text
											>
										</f-div>
										<f-text variant="para" size="small" weight="regular" state="secondary"
											>Just now</f-text
										>
									</f-div>
									${item % 2 === 0
										? html` <f-div direction="row" gap="medium">
												<f-button
													label="button 1"
													state="neutral"
													category="outline"
													variant="round"
												></f-button>
												<f-button
													label="button 2"
													state="neutral"
													category="outline"
													variant="round"
												></f-button>
										  </f-div>`
										: ""}
								</f-div>
							</f-toast>`;
					  })
					: ""}
			</f-div>
		`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	},

	argTypes: {
		type: {
			control: "radio",
			options: ["auto-hide", "persists"]
		},

		duration: {
			control: "number"
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		["close-button"]: {
			control: "boolean"
		}
	},

	args: {
		type: "auto-hide",
		duration: 5000,
		state: "default",
		["close-button"]: true
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fToastAnatomy)}</div>`,
	name: "Anatomy"
};

export const Type = {
	render: args => {
		const [values, setValues] = useState([]);

		const add = () => {
			let tempValues = [...values];
			tempValues.push(tempValues.length === 0 ? "persists" : "auto-hide");
			setValues(tempValues);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-button label="add toast" icon-right="i-plus" @click=${() => add()}></f-button>
				</f-div>
				${values.map(
					item =>
						html`<f-div>
							<f-toast .type=${item} .close-button=${true}
								><f-div direction="column" gap="medium">
									<f-div direction="column" gap="x-small">
										<f-text variant="heading" size="small" weight="bold"
											>Toast Message Header ${item}</f-text
										>
										<f-text variant="para" size="small" weight="regular"
											>Detailed description of the activity goes here</f-text
										>
									</f-div>
									<f-text variant="para" size="small" weight="regular" state="secondary"
										>Just now</f-text
									>
								</f-div></f-toast
							>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "type",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};

export const Duration = {
	render: args => {
		const [values, setValues] = useState([]);

		const add = () => {
			let tempValues = [...values];
			tempValues.push("auto-hide");
			setValues(tempValues);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-button
						label="add toast (auto hide 2000ms)"
						icon-right="i-plus"
						@click=${() => add()}
					></f-button>
				</f-div>
				${values.map(
					item =>
						html`<f-div>
							<f-toast .type=${item} .close-button=${true} .duration=${2000}
								><f-div direction="column" gap="medium">
									<f-div direction="column" gap="x-small">
										<f-text variant="heading" size="small" weight="bold"
											>Toast Message Header ${item}</f-text
										>
										<f-text variant="para" size="small" weight="regular"
											>Detailed description of the activity goes here</f-text
										>
									</f-div>
									<f-text variant="para" size="small" weight="regular" state="secondary"
										>Just now</f-text
									>
								</f-div></f-toast
							>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "duration",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};

export const State = {
	render: args => {
		const [values, setValues] = useState([]);

		const add = () => {
			let tempValues = [];
			tempValues = ["default", "primary", "success", "danger", "warning"];
			setValues(tempValues);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-button
						label="add toast (auto hide 2000ms)"
						icon-right="i-plus"
						@click=${() => add()}
					></f-button>
				</f-div>
				${values.map(
					item =>
						html`<f-div>
							<f-toast .type=${item} .close-button=${true} .duration=${5000} .state=${item}
								><f-div direction="column" gap="medium">
									<f-div direction="column" gap="x-small">
										<f-text variant="heading" size="small" weight="bold"
											>Toast Message Header ${item}</f-text
										>
										<f-text variant="para" size="small" weight="regular"
											>Detailed description of the activity goes here</f-text
										>
									</f-div>
									<f-text variant="para" size="small" weight="regular" state="secondary"
										>Just now</f-text
									>
								</f-div></f-toast
							>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};

export const Flags = {
	render: args => {
		const [values, setValues] = useState([]);

		const add = () => {
			let tempValues = [];
			tempValues = [true, false];
			setValues(tempValues);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-button
						label="add toast (auto hide 2000ms)"
						icon-right="i-plus"
						@click=${() => add()}
					></f-button>
				</f-div>
				${values.map(
					item =>
						html`<f-div>
							<f-toast .close-button=${item} .duration=${5000} state="primary" type="persists"
								><f-div direction="column" gap="medium">
									<f-div direction="column" gap="x-small">
										<f-text variant="heading" size="small" weight="bold"
											>Toast Message Header (close-button=${item})</f-text
										>
										<f-text variant="para" size="small" weight="regular"
											>Detailed description of the activity goes here</f-text
										>
									</f-div>
									<f-text variant="para" size="small" weight="regular" state="secondary"
										>Just now</f-text
									>
								</f-div></f-toast
							>
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "Flags",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};
