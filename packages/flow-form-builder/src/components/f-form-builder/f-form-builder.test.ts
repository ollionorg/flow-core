import { html, fixture, expect, oneEvent } from "@open-wc/testing";

// import flow-core elements
import "@nonfx/flow-core";
import "@ollion/flow-system-icon";

import { FFormArray, FFormBuilder, FFormObject } from "../../../";
import { FForm, FFormGroup, FIconButton, FInput } from "@nonfx/flow-core";
import { FormBuilderField } from "../../types";

function getSampleFormBuilder() {
	return fixture<FFormBuilder>(
		html` <f-form-builder .field=${
			{
				type: "object",
				direction: "horizontal",
				isCollapsible: false,
				isCollapsed: true,
				label: {
					title: "Object field form",
					description: "showing object field"
				},
				fields: {
					firstname: {
						type: "text",
						validationRules: [
							{
								name: "required"
							}
						]
					},
					lastname: {
						type: "text"
					}
				}
			} as FormBuilderField
		} .values=${{
			firstname: "Tony",
			lastname: "Stark"
		}}></f-checkbox> `
	);
}
function getSampleArrayFieldFormBuilder() {
	return fixture<FFormBuilder>(
		html` <f-form-builder .field=${
			{
				type: "array",
				field: {
					type: "text"
				}
			} as FormBuilderField
		} .values=${["username1", "username2"]}></f-checkbox> `
	);
}
describe("f-form-builder", () => {
	it("is defined", () => {
		const el = document.createElement("f-form-builder");
		expect(el).instanceOf(FFormBuilder);
	});

	it("should render object field with all default properties", async () => {
		const el = await getSampleFormBuilder();

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 1000));
		if (el.shadowRoot) {
			const fForm = el.shadowRoot.querySelector("f-form");
			expect(fForm).instanceOf(FForm);

			const fFormObject = fForm?.querySelector("f-form-object");

			expect(fFormObject).shadowDom.to.equalSnapshot();
			expect(fFormObject).instanceOf(FFormObject);

			const fFormGroup = fFormObject?.shadowRoot?.querySelector("f-form-group");
			expect(fFormGroup).instanceOf(FFormGroup);

			const inputs = fFormGroup?.querySelectorAll("f-input") as NodeListOf<FInput>;

			expect(inputs?.item(0).value).equals("Tony");
			expect(inputs?.item(0).getAttribute("name")).equals("firstname");
			expect(inputs?.item(1).value).equals("Stark");
			expect(inputs?.item(1).getAttribute("name")).equals("lastname");

			inputs.item(0).setAttribute("value", "");
			el.submit();
			const ev = await oneEvent(el, "state-change");

			expect(ev.detail.isValid).equals(false);
		}
	});
	it("should emit state-change with validation messages", async () => {
		const el = await getSampleFormBuilder();

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 1000));
		if (el.shadowRoot) {
			const fForm = el.shadowRoot.querySelector("f-form");

			const fFormObject = fForm?.querySelector("f-form-object");

			expect(fFormObject).shadowDom.to.equalSnapshot();
			const fFormGroup = fFormObject?.shadowRoot?.querySelector("f-form-group");

			const inputs = fFormGroup?.querySelectorAll("f-input") as NodeListOf<FInput>;

			inputs.item(0).setAttribute("value", "");
			el.submit();
			const ev = await oneEvent(el, "state-change");

			expect(ev.detail.isValid).equals(false);
			expect(ev.detail.errors[0].message).equals("firstname is a required field");
		}
	});
	it("should display array fields", async () => {
		const el = await getSampleArrayFieldFormBuilder();

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 1000));
		if (el.shadowRoot) {
			const fForm = el.shadowRoot.querySelector("f-form");

			const fFormArray = fForm?.querySelector("f-form-array");
			expect(fFormArray).shadowDom.to.equalSnapshot();
			const inputs = fFormArray?.shadowRoot?.querySelectorAll("f-input") as NodeListOf<FInput>;

			expect(inputs?.item(0).value).equals("username1");
			expect(inputs?.item(1).value).equals("username2");
		}
	});

	it("should add/delete field in array", async function () {
		const el = await getSampleArrayFieldFormBuilder();

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 500));
		if (el.shadowRoot) {
			const fForm = el.shadowRoot.querySelector("f-form");

			const fFormArray = fForm?.querySelector("f-form-array") as FFormArray;
			expect(fFormArray).shadowDom.to.equalSnapshot();

			const plusButton = fFormArray?.shadowRoot?.querySelector(
				"f-icon-button[icon='i-plus']"
			) as FIconButton;

			plusButton.click();
			await new Promise(resolve => setTimeout(resolve, 500));
			const inputs = fFormArray?.shadowRoot?.querySelectorAll("f-input") as NodeListOf<FInput>;

			inputs.item(2).setAttribute("value", "thirdfield");
			setTimeout(() => {
				inputs.item(2).dispatchEvent(new Event("input"));
			});

			const ev = await oneEvent(el, "input");

			expect(ev.detail[2]).equals("thirdfield");

			const minusButton = fFormArray?.shadowRoot?.querySelector(
				"f-icon-button[icon='i-minus']"
			) as FIconButton;

			minusButton.click();

			el.submit();
			const submitEvent = await oneEvent(el, "submit");

			expect(JSON.stringify(submitEvent.detail)).equals(
				JSON.stringify(["username1", "thirdfield"])
			);
		}
	});
	it("should test snapshot of all fields", async function () {
		const el = await fixture<FFormBuilder>(
			html` <f-form-builder .field=${
				{
					type: "object",
					direction: "vertical",
					fieldSeparator: true,
					label: {
						title: "Object level label",
						description: "following fields are used for demo purpose only"
					},
					fields: {
						selectBox: {
							label: {
								title: "Select multiple option to test"
							},
							selection: "multiple",
							options: ["option 1", "option 2", "option 3"],
							type: "select",
							placeholder: "This is a placeholder",
							iconLeft: "i-app",
							disabled: false,
							clear: true,
							validationRules: [
								{
									name: "required"
								}
							]
						},
						textField: {
							qaId: "testFieldQA",
							type: "text",
							helperText: "This field is a required field",
							suffix: "recommended",
							suffixWhen: (value: string) => {
								return value === "vikas";
							},
							validationRules: [
								{
									name: "required"
								}
							]
						},
						eventTestField: {
							qaId: "eventTestField",
							type: "text",
							helperText: "This field is a required field",
							validationRules: [
								{
									name: "required"
								}
							],
							showWhen: values => {
								return (values as Record<string, string>)?.textField === "vikas";
							},
							onClick: (event: PointerEvent) => {
								console.log("onClick callback triggered", event);
							},
							onInput: (event: Event) => {
								console.log("onInput callback triggered", event);
							},
							onFocus: (event: FocusEvent) => {
								console.log("onFocus callback triggered", event);
							},
							onKeyPress: (event: KeyboardEvent) => {
								console.log("onKeyPress callback triggered", event);
							},
							onKeyDown: (event: KeyboardEvent) => {
								console.log("onKeyDown callback triggered", event);
							},
							onKeyUp: (event: KeyboardEvent) => {
								console.log("onKeyUp callback triggered", event);
							},
							onMouseOver: (event: MouseEvent) => {
								console.log("onMouseOver callback triggered", event);
							}
						},

						switchButton: {
							type: "switchButton",
							validationRules: [
								{
									name: "required"
								}
							]
						},
						radio: {
							type: "radio",
							label: {
								title: "Radios"
							},
							// helperText: "This field is required",
							options: [
								{ id: "or", title: "Orange", iconTooltip: "hello" },
								{
									id: "banannaId",
									iconTooltip: "hello",
									description: "Check if you like Banana"
								}
							],
							validationRules: [
								{
									name: "required"
								}
							]
						},

						checkboxField: {
							type: "checkbox",
							direction: "horizontal",
							label: {
								title: "Check/Uncheck options",
								description: "this my checkbox"
							},
							// helperText: "This field is required",
							options: [
								{
									id: "or",
									title: "Orange",
									iconTooltip: "hello",
									description: "Orange has Vitamin C"
								},
								{
									id: "banannaId",
									iconTooltip: "hello",
									description: "Banana is cheap but rich in fiber"
								}
							],
							validationRules: [
								{
									name: "required"
								}
							]
						},
						textAreaField: {
							type: "textarea",
							placeholder: "This is a placeholder",
							maxLength: 100,
							disabled: false,
							readonly: false,
							clear: true,
							validationRules: [
								{
									name: "required"
								}
							]
						},
						nestedObject: {
							type: "object",
							fields: {
								username: {
									type: "text",
									validationRules: [{ name: "required" }]
								},
								email: {
									type: "text",
									validationRules: [{ name: "required" }, { name: "email" }]
								}
							}
						},
						nestedArray: {
							type: "array",
							label: {
								title: "This is array"
							},
							field: {
								type: "text",
								validationRules: [
									{
										name: "required"
									}
								]
							}
						},
						getButton: {
							type: "button",
							label: "get",
							iconLeft: "i-arrow-rotate"
						}
					}
				} as FormBuilderField
			} .values=${{
				textField: "vikas"
			}}></f-checkbox> `
		);

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 1000));
		if (el.shadowRoot) {
			const fForm = el.shadowRoot.querySelector("f-form");
			expect(fForm).instanceOf(FForm);

			const fFormObject = fForm?.querySelector("f-form-object");

			expect(fFormObject).shadowDom.to.equalSnapshot();
			expect(fFormObject).instanceOf(FFormObject);
		}
	});
});
