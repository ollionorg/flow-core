import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
	FormBuilderField,
	FFormInputElements,
	FormBuilderValues,
	FormBuilderValidationPromise,
	ValidationResults,
	FormBuilderState,
	FormBuilderLabel,
	FormBuilderCategory,
	FormBuilderGap,
	FormBuilderSize,
	FormBuilderVariant,
	CanValidateFields,
	FormBuilderBaseField
} from "../../types";
import eleStyle from "./f-form-builder.scss?inline";
import globalStyle from "./f-form-builder-global.scss?inline";

import { FDiv, FRoot } from "@nonfx/flow-core";
import { Ref, createRef } from "lit/directives/ref.js";
import fieldRenderer from "./fields";
import { extractValidationState, validateField } from "../../modules/validation/validator";
import { debounce } from "lodash-es";
import { Subject } from "rxjs";
import { getEssentialFlowCoreStyles, propogateProperties } from "../../modules/helpers";
import { cloneDeep, isEqual } from "lodash-es";
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";
import formArrayGlobalStyles from "./../f-form-array/f-form-array-global.scss?inline";

injectCss("f-form-builder", globalStyle);

@customElement("f-form-builder")
export class FFormBuilder extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(formArrayGlobalStyles),
		unsafeCSS(globalStyle),
		...getEssentialFlowCoreStyles()
	];

	/**
	 * @attribute formbuilder name
	 */
	@property({ type: String, reflect: true })
	name!: string;

	/**
	 * @attribute formbuilder config
	 */
	@property({ type: Object, reflect: false })
	label?: FormBuilderLabel;
	/**
	 * @attribute formbuilder config
	 */
	@property({ type: Object, reflect: false })
	field?: FormBuilderField;

	/**
	 * @attribute key value pair of values
	 */
	@property({
		type: Object,
		reflect: false,
		hasChanged(newVal: FormBuilderValues, oldVal: FormBuilderValues) {
			return !isEqual(newVal, oldVal);
		}
	})
	values?: FormBuilderValues;

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	size?: FormBuilderSize = "medium";

	/**
	 * @attribute Variants are various visual representations of all elements inside form.
	 */
	@property({ reflect: true, type: String })
	variant?: FormBuilderVariant = "curved";

	/**
	 * @attribute Categories are various visual representations of all elements inside form.
	 */
	@property({ reflect: true, type: String })
	category?: FormBuilderCategory = "fill";

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: FormBuilderGap = "medium";

	/**
	 * @attribute group separator
	 */
	@property({ reflect: true, type: Boolean })
	separator?: boolean = false;

	fieldRef: Ref<FFormInputElements> = createRef();

	state: FormBuilderState = {
		get isValid() {
			return this.errors?.length === 0;
		},
		isChanged: false
	};

	lastState?: FormBuilderState;

	showWhenSubject!: Subject<FormBuilderValues>;
	inputTimeout!: ReturnType<typeof setTimeout>;

	/**
	 * responsible for rendering form
	 */
	render() {
		return html`
			<!--debounce added to reduce multiple calls while multiple showWhen executed
			It will not affect functionality as such we are just updating silent validation state in single call
			-->
			<f-form
				name=${this.name}
				@submit=${this.onSubmit}
				@show-when=${this.onShowWhen}
				@show-when-exe=${debounce(this.onShowWhenExecution, 1000)}
				?separator=${this.separator}
				gap=${ifDefined(this.gap)}
				@keyup=${this.handleKeyUp}
			>
				${this.label
					? html`<f-div gap="x-small" direction="column" width="fill-container">
							<f-div gap="small" direction="row">
								<f-div height="hug-content" width="hug-content">
									<f-text variant="heading" size="medium" weight="medium" state="default">
										${this.label?.title}
									</f-text>
								</f-div>
								${this.label?.iconTooltip
									? html` <f-icon
											source="i-question-filled"
											size="small"
											state="subtle"
											.tooltip="${this.label?.iconTooltip}"
											clickable
									  ></f-icon>`
									: ""}
							</f-div>
							${this.label?.description
								? html` <f-div height="hug-content" width="hug-content">
										<f-text variant="para" size="small" weight="regular">
											${this.label.description}
										</f-text>
								  </f-div>`
								: ""}
					  </f-div>`
					: ``}
				${this.field
					? fieldRenderer[this.field.type](this.name, this.field, this.fieldRef, this.values)
					: nothing}
				<slot @click=${this.checkSubmit}></slot>
			</f-form>
		`;
	}
	/**
	 * Check if submit is triggerred by external element
	 * @param event
	 */
	checkSubmit(event: MouseEvent) {
		if ((event.target as HTMLElement).getAttribute("type") === "submit") {
			this.submit();
		}
	}

	handleKeyUp(event: KeyboardEvent) {
		if (event.code === "Enter" || event.key === "Enter") {
			this.submit();
		}
	}
	/**
	 * Form's submit event handler
	 * @param event
	 */
	onSubmit(event: SubmitEvent) {
		event.stopPropagation();
		event.preventDefault();
		this.submit();
	}
	/**
	 * Emit submit event with data if validaiton is successful
	 */
	submit() {
		this.validateForm()
			.then(all => {
				this.updateValidationState(all);
				if (this.state.errors?.length === 0) {
					const event = new CustomEvent("submit", {
						detail: this.values,
						bubbles: true,
						composed: true
					});
					this.dispatchEvent(event);
				}
			})
			.catch(error => {
				console.error("Error validating form", error);
			});
	}

	updateValidationState(all: ValidationResults) {
		this.state.errors = extractValidationState(all);
		this.dispatchStateChangeEvent();
	}

	/**
	 * updated hook of lit element
	 * @param _changedProperties
	 */
	protected async updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(_changedProperties);

		await this.updateComplete;

		/**
		 * this subject is created for `showWhen` implementation
		 */
		this.showWhenSubject = new Subject<FormBuilderValues>();
		const ref = this.fieldRef;

		if (ref.value) {
			/**
			 * this subject is propogated for `showWhen` implementation
			 */
			ref.value.showWhenSubject = this.showWhenSubject;
			const fieldValidation = async (event: Event) => {
				event.stopPropagation();

				/**
				 * update values
				 */
				if (this.values && this.field && this.field.type === "array") {
					(this.values as []).splice(
						0,
						(this.values as []).length,
						...((ref.value as FFormInputElements).value as [])
					);
				} else if (this.values && this.field && this.field.type === "object") {
					Object.assign(
						this.values,
						(ref.value as FFormInputElements).value as Record<string, unknown>
					);
				} else {
					this.values = ref.value?.value as FormBuilderValues;
				}

				/**
				 * update isChanged prop in state to let user know that form is changed
				 */
				this.state.isChanged = true;

				/**
				 * dispatch input event for consumer
				 * FLOW-903 moving up to avoid race condition
				 */
				if (event.type !== "blur") {
					this.dispatchInputEvent();
				}
				/**
				 * validate current field
				 */
				await validateField(
					this.field as CanValidateFields,
					ref.value as FFormInputElements,
					false
				);
				/**
				 * if current field is of type array or object then then also validate form anyway
				 */
				await this.validateForm(true).then(all => {
					this.updateValidationState(all);
				});
			};
			ref.value.oninput = fieldValidation;
			ref.value.onblur = fieldValidation;
			if (this.field && this.field.showWhen) {
				/**
				 * subsscribe to show when subject, whenever new values are there in formbuilder then show when will execute
				 */
				this.showWhenSubject.subscribe(values => {
					if (this.field && this.field.showWhen && ref.value) {
						const showField = this.field.showWhen(values);
						if (!showField) {
							ref.value.dataset.hidden = "true";
							if ((this.field as FormBuilderBaseField).layout === "label-left") {
								const wrapper = ref.value.closest<FDiv>(".label-left-layout");
								if (wrapper) {
									wrapper.dataset.hidden = "true";
								}
							}
						} else {
							ref.value.dataset.hidden = "false";
							if ((this.field as FormBuilderBaseField).layout === "label-left") {
								const wrapper = ref.value.closest<FDiv>(".label-left-layout");
								if (wrapper) {
									wrapper.dataset.hidden = "false";
								}
							}
						}
						this.onShowWhenExecution();
					}
				});
				/**
				 * execute showWhen for values given by consumer
				 */
				this.dispatchShowWhenEvent();
			}
		}
		/**
		 * silent validation and store in state
		 */
		void this.validateForm(true).then(all => {
			this.updateValidationState(all);
		});

		await propogateProperties(this);
	}

	/**
	 * showWhen handler
	 */
	onShowWhen() {
		this.showWhenSubject.next(this.values ?? {});
	}

	onShowWhenExecution() {
		this.validateForm(true)
			.then(all => {
				this.updateValidationState(all);
			})
			.catch(error => {
				console.error("Error validating form", error);
			});
	}
	/**
	 * Validation of whole form
	 * @param silent whether to display validaiton message or not
	 */
	async validateForm(silent = false) {
		const allValidations: FormBuilderValidationPromise[] = [];
		if (
			this.field &&
			(this.field.type === "object" || this.field.type === "array") &&
			this.fieldRef.value
		) {
			allValidations.push(this.fieldRef.value.validate(silent));
			allValidations.push(
				validateField(this.field as CanValidateFields, this.fieldRef.value, silent)
			);
		} else if (this.field) {
			allValidations.push(
				validateField(
					this.field as CanValidateFields,
					this.fieldRef.value as FFormInputElements,
					silent
				)
			);
		}

		return Promise.all(allValidations);
	}

	/**
	 * dispatching form-builder input event
	 */
	dispatchInputEvent() {
		this.showWhenSubject.next(this.values ?? {});
		const input = new CustomEvent("input", {
			detail: cloneDeep(this.values),
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(input);
	}
	/**
	 * dispatching `state-change` event for consumer
	 */
	dispatchStateChangeEvent() {
		if ((this.lastState && !isEqual(this.lastState, this.state)) || this.lastState === undefined) {
			this.lastState = cloneDeep(this.state);
			const stateChange = new CustomEvent("state-change", {
				detail: this.lastState,
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(stateChange);
		}
	}
	/**
	 * dispatch showWhen event so that root will publish new form values
	 */
	dispatchShowWhenEvent() {
		const showWhen = new CustomEvent("show-when", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
	}
	/**
	 * Whenever form removed from DOM
	 */
	disconnectedCallback(): void {
		try {
			super.disconnectedCallback();
		} catch (e) {
			/**
			 * Nothing to worry!
			 * catching weird lit error while disconnected hook in storybook stories
			 */
		}
	}
}
