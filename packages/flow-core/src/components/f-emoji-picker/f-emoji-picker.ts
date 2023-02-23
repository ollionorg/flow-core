import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-emoji-picker.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { FPopover } from "../f-popover/f-popover";

export type FEmojiPickerState = "primary" | "default" | "success" | "warning" | "danger";

@customElement("f-emoji-picker")
export class FEmojiPicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles, ...FPopover.styles];

	/**
	 * @attribute Variants are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
	 */
	@property({ reflect: true, type: String })
	value?: string;

	@property({ reflect: true, type: String })
	placeholder?: string;

	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	@property({ reflect: true, type: String })
	state?: FEmojiPickerState = "default";

	/**
	 * @attribute Sets the file-upload to disabled state.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute Sets the file-upload to loading state
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

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

	@query(".f-emoji-picker")
	emojiPicker!: FDiv;

	@query(".f-emoji-picker-popover")
	emojiPickerPopover!: FPopover;

	/**
	 * has label slot
	 */
	get hasLabel() {
		return this._labelNodes.length > 0;
	}

	/**
	 * has description slot
	 */
	get hasDescription() {
		return this._descriptionNodes.length > 0;
	}

	/**
	 * has help slot
	 */
	get hasHelperText() {
		return this._helpNodes.length > 0;
	}

	headerSectionDisplay() {
		if (!this.hasLabel && !this.hasDescription) {
			this.emojiPickerHeader.style.display = "none";
		} else {
			this.emojiPickerHeader.style.display = "";
		}
		if (!this.hasLabel) {
			this.labelSlot.style.display = "none";
		}
	}

	helpSectionDisplay() {
		if (!this.hasHelperText) {
			this.emojiPickerError.style.display = "none";
		} else {
			this.emojiPickerError.style.display = "";
		}
	}

	toggleEmojiPicker(value: boolean) {
		this.emojiPickerPopover.target = this.emojiPicker;
		this.emojiPickerPopover.open = value;
	}

	handleSelectEmoji(valuePicked: any) {
		// e.stopPropagation();
		/**
		 * @event input
		 */
		const event = new CustomEvent("input", {
			detail: {
				value: valuePicked.native
			},
			bubbles: true,
			composed: true
		});
		this.value = valuePicked.native;
		this.dispatchEvent(event);
		this.toggleEmojiPicker(false);
	}

	clearValue(e: MouseEvent) {
		e.stopPropagation();
		this.handleSelectEmoji("");
	}

	/**
	 * icon size
	 */
	get iconSize() {
		if (this.size === "medium") return "small";
		else if (this.size === "small") return "x-small";
		else return undefined;
	}

	render() {
		/**
		 * click outside the f-select wrapper area
		 */
		window.addEventListener("click", (e: MouseEvent) => {
			if (!this.contains(e.target as HTMLInputElement) && this.emojiPickerPopover.open) {
				this.emojiPickerPopover.open = false;
			}
		});
		const temp = new Picker({
			data: data,
			onEmojiSelect: (e: any) => {
				this.handleSelectEmoji(e);
			},
			dynamicWidth: true
			// theme: "dark"
		});
		// render empty string, since there no need of any child element
		return html`
			<f-div direction="column" gap="x-small">
				<f-div padding="none" gap="x-small" align="bottom-left" id="f-emoji-picker-header">
					<f-div padding="none" direction="column" width="fill-container" gap="x-small">
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
					class="f-emoji-picker"
					id="openEmojiPicker"
					size=${this.size}
					state=${this.state}
					category=${this.category}
					variant=${this.variant}
					tabindex="1"
					@click=${() => this.toggleEmojiPicker(true)}
				>
					<f-div
						width="80%"
						height="100%"
						?placeholder=${this.value ? false : true}
						size=${this.size}
						align="middle-left"
					>
						${this.value ??
						html`<f-text
							variant="para"
							size="small"
							weight="regular"
							state="subtle"
							?ellipsis=${true}
							>${this.placeholder}</f-text
						>`}
					</f-div>
					<!-- <div>${this.value ?? this.placeholder}</div> -->
					<f-div>
						${this.value
							? html` <f-icon
									source="i-close"
									.size=${this.iconSize}
									clickable
									@click=${this.clearValue}
							  ></f-icon>`
							: ""}
					</f-div>
				</div>
				<f-div direction="column" id="f-emoji-picker-error"><slot name="help"></slot> </f-div>
			</f-div>
			<f-popover class="f-emoji-picker-popover" .overlay=${false}> ${temp} </f-popover>
		`;
	}
	updated() {
		this.headerSectionDisplay();
		this.helpSectionDisplay();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-emoji-picker": FEmojiPicker;
	}
}
