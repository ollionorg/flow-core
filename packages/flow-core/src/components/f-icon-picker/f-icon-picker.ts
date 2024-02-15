import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import globalStyle from "./f-icon-picker-global.scss?inline";
import { injectCss } from "@ollion/flow-core-config";
import { FDiv } from "../f-div/f-div";
import { FPopover } from "../f-popover/f-popover";
import eleStyle from "./f-icon-picker.scss?inline";
import { FText } from "../f-text/f-text";
import { FIcon } from "../f-icon/f-icon";
import { FIconButton } from "../f-icon-button/f-icon-button";
injectCss("f-icon-picker", globalStyle);

export type FIconPickerState = "primary" | "default" | "success" | "warning" | "danger";

import SystemIconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@ollion/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@ollion/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@ollion/flow-aws-icon/dist/types/icon-pack";
import { FSearch } from "../f-search/f-search";

const defaultIconPacks = {
	System: SystemIconPack,
	Product: ProductIconPack,
	GCP: GcpIconPack,
	AWS: AwsIconPack
};

@customElement("f-icon-picker")
export class FIconPicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(globalStyle),
		unsafeCSS(eleStyle),
		...FDiv.styles,
		...FText.styles,
		...FPopover.styles,
		...FIcon.styles,
		...FIconButton.styles,
		...FSearch.styles
	];

	/**
	 * @attribute Defines the value of f-icon-picker
	 */
	@property({ reflect: true, type: String })
	value?: string;

	/**
	 * @attribute show/remove clear icon
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = true;

	/**
	 * @attribute Defines the size of f-icon-picker. size can be two types - `medium` | `small`
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute Defines the placeholder of f-icon-picker
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Variants are various visual representations of icon picker.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of icon picker.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FIconPickerState = "default";

	/**
	 * @attribute Sets the f-icon-picker to disabled state.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute assigned elements inside slot label
	 */
	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot description
	 */
	@queryAssignedElements({ slot: "description" })
	_descriptionNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot help
	 */
	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	@query("#f-emoji-picker-header")
	emojiPickerHeader!: FDiv;

	@query("#f-emoji-picker-error")
	emojiPickerError!: FDiv;

	@query("#label-slot")
	labelSlot!: HTMLElement;

	@query("slot[name='description']")
	descriptionSlot!: HTMLElement;

	@query("slot[name='help']")
	helpSlot!: HTMLElement;

	@query(".f-icon-picker")
	iconPicker!: HTMLDivElement;

	@query(".f-icon-picker-popover")
	iconPickerPopover!: FPopover;

	clearValue() {
		/**
		 * @event input
		 */
		const event = new CustomEvent("input", {
			detail: {
				name: undefined,
				value: undefined
			},
			bubbles: true,
			composed: true
		});
		this.value = undefined;
		this.dispatchEvent(event);
	}
	handleIconSeletion(name: string, value: string) {
		/**
		 * @event input
		 */
		const event = new CustomEvent("input", {
			detail: {
				name,
				value
			},
			bubbles: true,
			composed: true
		});
		this.value = name;
		this.dispatchEvent(event);
	}
	render() {
		/**
		 * clear conditional display
		 */
		const clearIcon = this.clear
			? html`
					${this.value
						? html`<f-div align="middle-center" overflow="hidden">
								<f-icon
									source="i-close"
									data-qa-remove-emoji=${this.getAttribute("data-qa-element-id")}
									size="x-small"
									clickable
									@click=${this.clearValue}
								></f-icon
						  ></f-div>`
						: ""}
			  `
			: "";

		/**
		 * conditional display of inpu value or plcaeholder
		 */
		const inputValue = this.value
			? html`<f-icon .source=${this.value} .size=${this.size}></f-icon>`
			: html`<f-icon
					.source=${this.placeholder ?? "i-icon"}
					state="secondary"
					.size=${this.size}
			  ></f-icon>`;

		// render empty string, since there no need of any child element
		return html`
			<f-div direction="column" gap="x-small">
				<f-div padding="none" gap="x-small" align="bottom-left" id="f-icon-picker-header">
					<f-div padding="none" direction="column" width="fill-container">
						<f-div
							padding="none"
							gap="small"
							direction="row"
							width="hug-content"
							height="hug-content"
							id="label-slot"
						>
							<f-div padding="none" direction="row" width="hug-content" height="hug-content">
								<slot name="label"></slot>
							</f-div>
							<slot name="icon-tooltip"></slot>
						</f-div>
						<slot name="description"></slot>
					</f-div>
				</f-div>
				<div
					class="f-icon-picker"
					id="iconPickerElement"
					size=${this.size}
					state=${this.state}
					category=${this.category}
					variant=${this.variant}
					clear=${this.value && this.clear ? true : false}
					tabindex="1"
					?disabled=${this.disabled}
					@click=${(e: MouseEvent) => {
						e.stopPropagation();
						this.toggleIconPicker(true);
					}}
				>
					<f-div
						height="100%"
						?placeholder=${this.value ? false : true}
						size=${this.size}
						align="middle-left"
						gap="small"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
					>
						${inputValue}
					</f-div>
					${clearIcon}
				</div>
				<f-div direction="column" id="f-icon-picker-error"><slot name="help"></slot> </f-div>
			</f-div>
			<f-popover
				class="f-icon-picker-popover"
				data-qa-icon-popover=${this.getAttribute("data-qa-element-id")}
				.overlay=${false}
			>
				<f-div direction="column" overflow="scroll" max-height="500px">
					<f-div border="small solid default bottom" height="hug-content" overflow="scroll">
						<f-div padding="medium" selected="notch-bottom" width="hug-content">
							<f-icon-button
								size="large"
								icon="i-home"
								state="neutral"
								category="packed"
							></f-icon-button>
						</f-div>
						<f-div padding="medium" width="hug-content">
							<f-icon-button
								size="large"
								icon="i-flag"
								state="neutral"
								category="packed"
							></f-icon-button>
						</f-div>
						<f-div padding="medium" width="hug-content">
							<f-icon-button
								size="large"
								icon="p-aws"
								state="neutral"
								category="packed"
							></f-icon-button>
						</f-div>
						<f-div padding="medium" width="hug-content">
							<f-icon-button
								size="large"
								icon="p-gcp"
								state="neutral"
								category="packed"
							></f-icon-button>
						</f-div>
					</f-div>
					<f-div padding="medium medium none medium" height="hug-content">
						<f-search></f-search>
					</f-div>
					<f-div direction="column" overflow="scroll">
						${Object.entries(defaultIconPacks).map(([name, icons]) => {
							return html`<f-div
									sticky="top"
									state="tertiary"
									padding="medium"
									height="hug-content"
								>
									<f-text size="large" weight="medium">${name}</f-text>
								</f-div>
								<f-div height="hug-content" padding="none medium">
									${Object.entries(icons).map(([name, svg]) => {
										return html`<f-div
											width="hug-content"
											align="middle-center"
											clickable
											@click=${() => this.handleIconSeletion(name, svg)}
											padding="small"
											height="hug-content"
											><f-icon size="large" .source=${name}></f-icon
										></f-div>`;
									})}
								</f-div>`;
						})}
					</f-div>
				</f-div>
			</f-popover>
		`;
	}

	/**
	 * open/close picker
	 * @param value boolean
	 */
	toggleIconPicker(value: boolean) {
		this.iconPickerPopover.target = this.iconPicker;
		this.iconPickerPopover.open = value;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-icon-picker": FIconPicker;
	}
}
