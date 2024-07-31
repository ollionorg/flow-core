import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-emoji-picker.scss?inline";
import globalStyle from "./f-emoji-picker-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import data, { Category, EmojiMartData } from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { FIcon } from "../f-icon/f-icon";
import { FPopover } from "../f-popover/f-popover";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-emoji-picker", globalStyle);

export type FEmojiPickerState = "primary" | "default" | "success" | "warning" | "danger";

export type FEmojiPickerCategories =
	| "activity"
	| "flags"
	| "foods"
	| "frequent"
	| "nature"
	| "objects"
	| "people"
	| "places"
	| "symbols";

export type FEmojiPickerIncludesCategories = FEmojiPickerCategories[];
export type FEmojiPickerExcludesCategories = FEmojiPickerCategories[];

export type EmojiSkins = {
	src: string;
};

export type Emoji = {
	emoticons?: string[];
	id: string;
	keywords?: string[];
	name: string;
	native?: string | undefined;
	shortcodes?: string;
	unified?: string;
	skins?: EmojiSkins[];
	src?: string;
};

export type FEmojiPickerCustomEmoji = {
	id: string;
	name?: string;
	emojis: string[];
};

export type FEmojiPickerCustomEmojiData = FEmojiPickerCustomEmoji[];

export type RecentEmojis = string[];
export type ExcludeEmojis = string[];

@flowElement("f-emoji-picker")
export class FEmojiPicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FPopover.styles,
		...FIcon.styles
	];

	/**
	 * @attribute Variants are various visual representations of emoji picker.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of emoji picker.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute Defines the value of f-emoji-picker
	 */
	@property({ reflect: true, type: String })
	value?: string;

	/**
	 * @attribute Defines the placeholder of f-emoji-picker
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Defines the size of f-emoji-picker. size can be two types - `medium` | `small`
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FEmojiPickerState = "default";

	/**
	 * @attribute recent decides the emojis that are frequenlt added inside emoji picker.
	 */
	@property({ reflect: true, type: Array })
	recent?: RecentEmojis = [];

	/**
	 * @attribute Only load included categories.
	 */
	@property({ reflect: true, type: Array })
	include?: FEmojiPickerIncludesCategories = [];

	/**
	 * @attribute remove excluded categories
	 */
	@property({ reflect: true, type: Array })
	exclude?: FEmojiPickerExcludesCategories = [];

	/**
	 * @attribute List of emoji IDs that will be excluded from the picker
	 */
	@property({ reflect: true, type: Array })
	["exclude-emojis"]?: ExcludeEmojis = [];

	/**
	 * @attribute add custom emojis array
	 */
	@property({ reflect: true, type: Array })
	custom?: FEmojiPickerCustomEmojiData = [];

	/**
	 * @attribute if true close picker popover on value select
	 */
	@property({ reflect: true, type: Boolean })
	["close-on-select"]?: boolean = false;

	/**
	 * @attribute show/remove clear icon
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = true;

	/**
	 * @attribute Sets the f-emoji-picker to disabled state.
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

	@query(".f-emoji-picker")
	emojiPicker!: FDiv;

	@query(".f-emoji-picker-popover")
	emojiPickerPopover!: FPopover;

	picker?: Picker;

	categories = [
		"frequent",
		"people",
		"nature",
		"foods",
		"activity",
		"places",
		"objects",
		"symbols",
		"flags"
	];

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

	/**
	 * icon size
	 */
	get iconSize() {
		if (this.size === "medium") return "small";
		else if (this.size === "small") return "x-small";
		else return undefined;
	}

	/**
	 * exclude categories
	 */
	get excludeCategories() {
		if (this.exclude && this.exclude.length > 0) {
			const excludeSet = new Set(this.exclude);
			const displayCategories = this.categories.filter(category => {
				return !excludeSet.has(category as FEmojiPickerCategories);
			});
			return displayCategories;
		} else {
			return [];
		}
	}

	/**
	 * categories to be displayed for picker according to inclide amd exclude
	 */
	get categroiesToDisplay() {
		return this.include && this.include.length > 0
			? this.include
			: this.excludeCategories.length > 0
			? this.excludeCategories
			: this.categories;
	}

	/**
	 * header slot display
	 */
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

	/**
	 * help section display
	 */
	helpSectionDisplay() {
		if (!this.hasHelperText) {
			this.emojiPickerError.style.display = "none";
		} else {
			this.emojiPickerError.style.display = "";
		}
	}

	/**
	 * open/close picker
	 * @param value boolean
	 */
	toggleEmojiPicker(value: boolean) {
		this.emojiPickerPopover.target = this.emojiPicker;
		this.emojiPickerPopover.open = value;
	}

	/**
	 *
	 * @param valuePicked emoji as value
	 */
	handleSelectEmoji(valuePicked?: Emoji) {
		// e.stopPropagation();
		/**
		 * @event input
		 */
		const event = new CustomEvent("input", {
			detail: {
				value: valuePicked ? valuePicked.native ?? valuePicked.src : ""
			},
			bubbles: true,
			composed: true
		});
		this.value = valuePicked ? valuePicked.native ?? valuePicked.src : "";
		this.dispatchEvent(event);
		if (this["close-on-select"]) {
			this.toggleEmojiPicker(false);
		}
	}

	/**
	 * clear emoji value
	 * @param e MouseEvent
	 */
	clearValue(e: MouseEvent) {
		e.stopPropagation();
		this.handleSelectEmoji();
	}

	/**
	 * add recently used emojis
	 */
	handleFrequentEmojiCategory() {
		if (this.recent && this.recent?.length > 0) {
			(data as EmojiMartData).categories.forEach((item: Category) => {
				if (item.id === "frequent") {
					item.emojis = this.recent as string[];
				}
			});
		}
	}

	/**
	 * handle custom emoji insertion
	 */
	handleCustomEmoji() {
		if (this.custom && this.custom?.length > 0) {
			this.custom?.forEach(item => {
				(data as EmojiMartData).categories.push(item);
			});
		}
	}

	/**
	 * validation for placeolder
	 */
	validateProperties() {
		const emojiRegex = /\p{Extended_Pictographic}/u;
		if (this.placeholder) {
			if (!emojiRegex.test(this.placeholder)) {
				throw new Error("f-emoji-picker : placeholder should be an emoji");
			}
		}
	}

	/**
	 *
	 * @param e mMouseEvent
	 * @param element emoji-picker component
	 */
	closeEmojiPicker(e: MouseEvent, element: FEmojiPicker) {
		if (!element.contains(e.target as HTMLInputElement) && element.emojiPickerPopover.open) {
			element.emojiPickerPopover.open = false;
		}
	}

	outsideClick = (e: MouseEvent) => {
		this.closeEmojiPicker(e, this);
	};

	connectedCallback(): void {
		super.connectedCallback();
		/**
		 * click outside the f-select wrapper area
		 */
		window.addEventListener("mouseup", this.outsideClick);
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();

		window.removeEventListener("mouseup", this.outsideClick);
	}
	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "textbox";
		if (this.placeholder) this.setAttribute("aria-placeholder", this.placeholder);
		if (!changedProperties.has("value") || !this.picker) {
			/**
			 * initiate picker component
			 */

			this.picker = new Picker({
				data,
				onEmojiSelect: (e: Emoji) => {
					this.handleSelectEmoji(e);
				},
				icons: "solid",
				skinTonePosition: "none",
				categories: this.categroiesToDisplay,
				custom: this.custom,
				autoFocus: true,
				exceptEmojis: this["exclude-emojis"]
			});

			/**
			 * assign styling to picker component
			 */
			this.picker?.injectStyles(unsafeCSS(eleStyle));
		}
	}

	render() {
		this.validateProperties();

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
				<f-div padding="none" gap="x-small" align="bottom-left" id="f-emoji-picker-header">
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
					class="f-emoji-picker"
					id="openEmojiPicker"
					size=${this.size}
					state=${this.state}
					category=${this.category}
					variant=${this.variant}
					clear=${this.value && this.clear ? true : false}
					tabindex="0"
					?disabled=${this.disabled}
					@keyup=${(e: KeyboardEvent) => {
						if (e.key === "Enter") this.toggleEmojiPicker(true);
					}}
					@click=${(e: MouseEvent) => {
						e.stopPropagation();
						this.toggleEmojiPicker(true);
					}}
				>
					<f-div
						class="emoji-value"
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
				<f-div direction="column" id="f-emoji-picker-error"><slot name="help"></slot> </f-div>
			</f-div>
			<f-popover
				data-qa-emoji-popover=${this.getAttribute("data-qa-element-id")}
				class="f-emoji-picker-popover"
				.overlay=${false}
				><f-div>${this.picker}</f-div></f-popover
			>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		// header section-slot display
		this.headerSectionDisplay();

		// help section-slot display
		this.helpSectionDisplay();

		// insert recent emojis
		this.handleFrequentEmojiCategory();

		// custom emoji insertion
		this.handleCustomEmoji();
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
