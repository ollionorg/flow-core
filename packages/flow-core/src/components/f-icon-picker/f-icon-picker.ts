import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import globalStyle from "./f-icon-picker-global.scss?inline";
import { injectCss } from "@ollion/flow-core-config";
import { FDiv } from "../f-div/f-div";
import { FPopover } from "../f-popover/f-popover";
import eleStyle from "./f-icon-picker.scss?inline";
import { FText } from "../f-text/f-text";
import { FIcon, FIconCustomSource } from "../f-icon/f-icon";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { FSearch } from "../f-search/f-search";
import Fuse from "fuse.js";

injectCss("f-icon-picker", globalStyle);

export type FIconPickerState = "primary" | "default" | "success" | "warning" | "danger";

export type FIconPickerCategories = {
	name: string;
	categoryIcon: string | URL;
	icons: FIconCustomSource[];
}[];
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
	@property({ reflect: true, type: Object })
	value?: FIconCustomSource;

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
	 * @attribute Specify icon set.
	 */
	@property({ type: Object })
	categories!: FIconPickerCategories;

	readonly required = ["categories"];

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

	@state()
	searchKeyword?: string;

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
	handleIconSeletion(value: FIconCustomSource) {
		/**
		 * @event input
		 */
		const event = new CustomEvent("input", {
			detail: value,
			bubbles: true,
			composed: true
		});
		this.value = value;
		this.dispatchEvent(event);
	}

	getIconPickerPopover() {
		const noIconFound =
			this.filteredCategories.length === 0
				? html`<f-div align="middle-center">
						<f-text align="center" state="secondary"
							>Sorry, no matching icon found for your search. Please try a different search term or
							refine your query</f-text
						>
				  </f-div>`
				: html`<f-div height="320px"></f-div>`;
		return html`<f-popover
			class="f-icon-picker-popover"
			data-qa-icon-popover=${this.getAttribute("data-qa-element-id")}
			.overlay=${false}
		>
			<f-div direction="column" overflow="scroll" max-height="500px">
				<f-div border="small solid default bottom" height="hug-content" overflow="scroll">
					${this.categories.map((category, i) => {
						return html`<f-div
							clickable
							.selected=${i === 0 ? "notch-bottom" : "none"}
							padding="medium"
							data-category="${category.name}"
							width="hug-content"
							class="category-tab"
							@click=${() => this.selectCategory(category.name)}
						>
							<f-icon
								.tooltip=${category.name}
								size="medium"
								.source=${{ name: category.name, source: category.categoryIcon }}
							></f-icon>
						</f-div>`;
					})}
				</f-div>
				<f-div padding="medium medium none medium" height="hug-content">
					<f-search @input=${this.handleSearch}></f-search>
				</f-div>
				<f-div
					direction="column"
					style="min-height:300px"
					overflow="scroll"
					class="icon-container"
					@scroll=${this.handleCategorySelection}
				>
					${this.filteredCategories.map(category => {
						return html`<f-div
								class="category-label"
								data-category="${category.name}"
								sticky="top"
								state="tertiary"
								padding="medium"
								height="hug-content"
							>
								<f-text size="large" weight="medium">${category.name}</f-text>
							</f-div>
							<f-div
								class="category-icons"
								data-category="${category.name}"
								height="hug-content"
								padding="none medium medium medium"
							>
								${category.icons.map(icon => {
									return html`<f-div
										width="hug-content"
										align="middle-center"
										clickable
										@click=${() => this.handleIconSeletion(icon)}
										padding="small"
										height="hug-content"
										gap="x-small"
										direction="column"
										><f-icon .tooltip=${icon.name} size="medium" .source=${icon}></f-icon>
									</f-div>`;
								})}
							</f-div>`;
					})}
					${noIconFound}
				</f-div>
			</f-div>
		</f-popover>`;
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
			${this.getIconPickerPopover()}
		`;
	}

	selectCategory(category: string) {
		const iconContainer = this.shadowRoot?.querySelector(".icon-container");
		const categorylabel = this.shadowRoot?.querySelector<FDiv>(
			`.category-label[data-category="${category}"]`
		);

		if (iconContainer?.getBoundingClientRect().y === categorylabel?.getBoundingClientRect().y) {
			const categoryIcons = this.shadowRoot?.querySelector<FDiv>(
				`.category-icons[data-category="${category}"]`
			);

			if (categoryIcons) {
				categoryIcons.scrollIntoView({
					block: "start"
				});

				if (iconContainer) {
					iconContainer.scrollBy({
						top: -46,
						behavior: "smooth"
					});
				}
			}
		} else {
			if (categorylabel) {
				categorylabel.scrollIntoView({
					block: "start",
					behavior: "smooth"
				});
			}
		}
	}

	handleCategorySelection(event: Event) {
		const container = event.target as HTMLElement;
		const allLabels = container.querySelectorAll<FDiv>(".category-label");
		let lastStickylabel: FDiv | undefined = undefined;
		allLabels.forEach(labelElement => {
			if (labelElement.getBoundingClientRect().top === container.getBoundingClientRect().top) {
				lastStickylabel = labelElement;
			}
		});

		if (lastStickylabel) {
			const allCatTabs = this.shadowRoot?.querySelectorAll<FDiv>(".category-tab");

			allCatTabs?.forEach(tab => {
				if (tab.dataset.category === lastStickylabel?.dataset.category) {
					tab.selected = "notch-bottom";
				} else {
					tab.selected = "none";
				}
			});
		}
	}

	get filteredCategories() {
		if (this.searchKeyword && this.searchKeyword.length > 0) {
			const filtered = this.categories.map(category => {
				const fuse = new Fuse(category.icons, {
					keys: ["name", "keywords"],
					findAllMatches: true,
					distance: 3
				});
				return {
					...category,
					icons: fuse.search(this.searchKeyword as string).map(r => r.item)
				};
			});
			return filtered.filter(cat => cat.icons.length > 0);
		}

		return this.categories;
	}

	handleSearch(e: CustomEvent) {
		this.searchKeyword = e.detail.value as string;
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
