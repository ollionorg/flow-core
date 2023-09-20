/* eslint-disable no-mixed-spaces-and-tabs */
import {
	FSelect,
	FSelectArray,
	FSelectOptionObject,
	FSelectOptionsGroup,
	FSelectOptionsProp,
	FSelectSingleOption
} from "./f-select";
import { html } from "lit";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

export default function render(this: FSelect) {
	this.validateProperties();

	/**
	 * apply width according to the prop
	 */
	if (this.width === "fill-container") {
		this.style.width = "100%";
	} else {
		this.style.width = `${this.width}px` ?? "100%";
	}
	/**
	 * concaticated array from groups
	 */
	const concatinatedSelectedOptions = !Array.isArray(this.selectedOptions)
		? this.getConcaticateGroupOptions(this.selectedOptions)
		: [];

	/**
	 * create iconlLeft if available
	 */
	const iconLeft = this.iconLeft
		? html`
				<f-icon
					data-qa-icon-left=${this.iconLeft}
					.source=${this.iconLeft}
					.size=${this.iconSize}
					class=${!this.size ? "f-input-icons-size" : ""}
				></f-icon>
		  `
		: "";

	/**
	 * create caret-up/caret-down icon for open/close option-menu
	 */
	const iconRight = !this.openDropdown
		? html`<f-icon
				data-qa-caret="i-chevron-down"
				source="i-chevron-down"
				.size=${"x-small"}
				clickable
				@click=${this.handleDropDownOpen}
		  ></f-icon>`
		: html`<f-icon
				data-qa-caret="i-chevron-up"
				source="i-chevron-up"
				.size=${"x-small"}
				clickable
				@click=${this.handleDropDownClose}
		  ></f-icon>`;

	/**
	 * input text area with alternate f-text placeholder when not searchable
	 */
	const inputAppend = html`
		${this.selectedOptions?.length === 0 &&
		concatinatedSelectedOptions?.length === 0 &&
		!this.searchable
			? html`<f-text
					data-qa-placeholder
					class="placeholder-text"
					variant="para"
					size="small"
					weight="regular"
					state="subtle"
					>${this.placeholder}</f-text
			  >`
			: ""}
		<input
			tabindex="0"
			class=${classMap({ "f-select": true })}
			id="f-select"
			data-qa-input
			variant=${this.variant}
			category=${this.category}
			state=${this.state}
			placeholder=${this.selectedOptions?.length > 0 || concatinatedSelectedOptions?.length > 0
				? this.searchable && this.openDropdown
					? this.placeholder
					: ""
				: this.placeholder}
			size=${this.size}
			?readonly=${!this.searchable}
			.value=${this.searchValue}
			@input=${this.handleInput}
			@blur=${this.handleBlur}
			style="${this.applyInputStyle()}"
		/>
	`;

	/**
	 * append prefix consisting of f-tags, iiconLeft and search string
	 */
	const prefixAppend = html`<div class="f-select-prefix">
		${this.iconLeft ? html` ${iconLeft}` : ""}
		${Array.isArray(this.selectedOptions) && this.selectedOptions?.length > 0
			? html` <div class="f-select-searchable">
					${this.type === "single"
						? (this.selectedOptions as FSelectOptionsProp).map(option =>
								this.renderSingleSelection(option)
						  )
						: html`${(this.selectedOptions as FSelectOptionsProp)
								.slice(0, this.getSlicedSelections(this.selectedOptions))
								.map(option => this.renderMultipleSelectionTag(option))}
						  ${this.selectedOptions.length > this.selectionLimit
								? !this.viewMoreTags
									? html` <f-div height="hug-content" width="hug-content" padding="none">
											<f-text
												data-qa-more
												variant="para"
												size="small"
												weight="regular"
												state="primary"
												@click=${this.handleViewMoreTags}
												><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
													>+${this.selectedOptions.length - this.selectionLimit} more</a
												></f-text
											></f-div
									  >`
									: html`<f-div height="hug-content" width="hug-content" padding="none"
											><f-text
												data-qa-less
												variant="para"
												size="small"
												weight="regular"
												state="primary"
												@click=${this.handleViewMoreTags}
												><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
													>show less</a
												></f-text
											></f-div
									  >`
								: ""} `}
					${inputAppend}
			  </div>`
			: html`<div class="f-select-searchable">
					${this.type === "single"
						? (concatinatedSelectedOptions as FSelectOptionsProp).map(option =>
								this.renderSingleSelection(option)
						  )
						: html` ${(concatinatedSelectedOptions as FSelectOptionsProp)
								.slice(0, this.getSlicedSelections(concatinatedSelectedOptions))
								.map(option => this.renderMultipleSelectionTag(option))}
						  ${concatinatedSelectedOptions.length > this.selectionLimit
								? !this.viewMoreTags
									? html`<f-div height="hug-content" width="hug-content" padding="none"
											><f-text
												data-qa-more
												variant="para"
												size="small"
												weight="regular"
												state="primary"
												@click=${this.handleViewMoreTags}
												><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
													>+${concatinatedSelectedOptions.length - this.selectionLimit} more</a
												></f-text
											></f-div
									  >`
									: html`<f-div height="hug-content" width="hug-content" padding="none"
											><f-text
												data-qa-less
												variant="para"
												size="small"
												weight="regular"
												state="primary"
												@click=${this.handleViewMoreTags}
												><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
													>show less</a
												></f-text
											></f-div
									  >`
								: ""}`}
					${inputAppend}
			  </div> `}
	</div>`;

	/**
	 * append suffix consisting of clear icon caret-up/caret-down icon and loader
	 */
	const suffixAppend = !this.loading
		? html`<div class="f-select-suffix">
				${(this.selectedOptions?.length > 0 || concatinatedSelectedOptions?.length > 0) &&
				this.clear
					? html`
							<f-icon
								data-qa-clear
								?clickable=${true}
								source="i-close"
								size="x-small"
								@click=${(e: MouseEvent) =>
									Array.isArray(this.selectedOptions)
										? this.clearInputValue(e)
										: this.clearSelectionInGroups(e)}
								class=${!this.size ? "f-input-icons-size" : ""}
							></f-icon>
					  `
					: ""}
				${iconRight}
		  </div>`
		: html`<div class="loader-suffix" data-qa-loader>${unsafeSVG(loader)}</div>`;

	/**
	 * empty filtered options
	 */
	const emptyMenu = html`<f-div
		id=${`option-0`}
		padding="medium"
		height="hug-content"
		width="fill-container"
		direction="row"
		align="middle-left"
		gap="auto"
		tabindex=${0}
		@mouseup=${(e: MouseEvent) => {
			e.stopImmediatePropagation();
			e.stopPropagation();
		}}
	>
		<f-div width="fill-container" height="hug-content" padding="none"
			><f-text data-qa-empty variant="para" size="small" weight="regular"
				>No Options found.</f-text
			></f-div
		>
		${this.createOption && this.searchValue && this.searchable
			? html`
					<f-div
						width="hug-content"
						height="hug-content"
						padding="none"
						@click=${(e: MouseEvent) => this.createNewOption(e)}
					>
						${this.offsetWidth > 200
							? html` <f-button
									data-qa-create
									size="small"
									category="transparent"
									label="CREATE"
							  ></f-button>`
							: html`<f-icon-button
									data-qa-create
									icon="i-plus"
									state="primary"
									size="x-small"
							  ></f-icon-button>`}
					</f-div>
			  `
			: ""}
	</f-div>`;

	/**
	 * Final html to render
	 */
	return html`
		<div
			class="f-select-field"
			?disabled=${this.disabled}
			?allow-gap=${this._hasLabel && this._hasHelperText ? true : false}
		>
			<f-div
				padding="none"
				gap="none"
				align="bottom-left"
				id="f-field-label"
				@click=${(e: MouseEvent) => {
					this.handleDropDownClose(e);
				}}
			>
				<f-div padding="none" direction="column" width="fill-container">
					<f-div padding="none" gap="auto" direction="row" height="hug-content">
						<f-div
							padding="none"
							gap="small"
							direction="row"
							width="hug-content"
							height="hug-content"
						>
							<slot name="label" @slotchange=${this._onLabelSlotChange}></slot>
							<slot name="icon-tooltip"></slot>
						</f-div>
						<f-div width="hug-content">
							<slot name="subtitle"></slot>
						</f-div>
					</f-div>
					<slot name="description"></slot>
				</f-div>
			</f-div>
			<div
				class="f-select-wrapper"
				id="f-select-wrapper"
				variant=${this.variant}
				category=${this.category}
				state=${this.state}
				?searchable=${this.searchable}
				size=${this.size}
				type=${this.type}
				?allow-gap=${this._hasLabel && !this._hasHelperText ? true : false}
				data-qa-id=${this.getAttribute("data-qa-element-id")}
				@click=${this.handleDropDownOpen}
			>
				${prefixAppend} ${suffixAppend}
				<div
					class="f-select-options"
					id="f-select-options"
					style="${this.applyOptionsStyle(this.offsetWidth)}"
					size=${this.size}
				>
					<f-div padding="none" gap="none" direction="column">
						${Array.isArray(this.options)
							? this.filteredOptions.length > 0
								? (this.filteredOptions as FSelectArray)?.map(
										(option, index) =>
											html`<f-div
												class="f-select-options-clickable"
												padding="medium"
												data-qa-option=${this.getOptionQaId(option)}
												height="hug-content"
												width="fill-container"
												direction="row"
												?clickable=${true}
												align="middle-left"
												gap="small"
												.selected=${this.isSelected(option) || this.currentCursor === index
													? "background"
													: undefined}
												@click=${(e: MouseEvent) => {
													this.handleOptionSelection(option, e);
												}}
												.disabled=${typeof option === "object" && option.disabled}
											>
												${this.checkbox
													? html` <f-checkbox
															state=${this.state}
															size=${this.size}
															value=${this.isSelected(option) ? "checked" : "unchecked"}
															@input=${(e: MouseEvent) => {
																this.handleCheckboxInput(option, e);
															}}
													  ></f-checkbox>`
													: ""}
												${(option as FSelectOptionObject)?.icon && !this.optionTemplate
													? html` <f-div
															padding="none"
															gap="none"
															height="hug-content"
															width="hug-content"
															><f-icon
																size="medium"
																source=${(option as FSelectOptionObject)?.icon}
															></f-icon
													  ></f-div>`
													: ""}
												${this.optionTemplate ? this.optionTemplate(option) : ""}
												${!this.optionTemplate
													? html` <f-div
															padding="none"
															gap="none"
															height="hug-content"
															width="fill-container"
															><f-text variant="para" size="small" weight="regular"
																>${(option as FSelectOptionObject)?.title ?? option}</f-text
															></f-div
													  >`
													: ""}
												${this.isSelected(option) && !this.checkbox
													? html` <f-div
															padding="none"
															gap="none"
															height="hug-content"
															width="hug-content"
															><f-icon size="small" source="i-tick"></f-icon
													  ></f-div>`
													: ""}
											</f-div>`
								  )
								: emptyMenu
							: Object.keys(this.filteredOptions)?.length > 0 &&
							  Object.keys(this.filteredOptions)?.every(
									groupName => (this.filteredOptions as FSelectOptionsGroup)[groupName].length > 0
							  )
							? Object.keys(this.filteredOptions)?.map((group, groupIndex) =>
									(this.filteredOptions as FSelectOptionsGroup)[group].length > 0
										? html`<f-div
				padding="none"
				height="hug-content"
				width="fill-container"
				direction="column"
				align="middle-left"
				border="small solid default bottom"
			  >
				<f-div
				  class="f-select-options-clickable"
				  data-qa-group=${group}
				  padding="medium"
				  height="hug-content"
				  width="fill-container"
				  align="middle-left"
				  direction="row"
				  ?clickable=${true}
				  .selected=${this.getCheckedValue(group) === "checked" ? "background" : undefined}
				  @click=${(e: MouseEvent) => this.handleSelectAll(e, group)}
				>
				   ${
							this.checkbox
								? html` <f-checkbox
										state=${this.state}
										size=${this.size}
										.value="${this.getCheckedValue(group)}"
										@input=${(e: MouseEvent) => this.handleSelectAll(e, group)}
								  ></f-checkbox>`
								: ""
						}
				  <f-text variant="para" size="small" weight="regular" state="secondary"
							  >${group}</f-text
							>
				  </f-div>
				  ${(this.filteredOptions as FSelectOptionsGroup)[group].map(
						(option, optionIndex) =>
							html`
								<f-div
									class="f-select-options-clickable"
									data-qa-option=${this.getOptionQaId(option)}
									padding="medium x-large"
									height="hug-content"
									width="fill-container"
									direction="row"
									?clickable=${true}
									align="middle-left"
									gap="small"
									.selected=${this.isGroupSelection(option, group) ||
									(this.currentGroupOptionCursor === optionIndex &&
										this.currentGroupCursor === groupIndex)
										? "background"
										: undefined}
									@click=${(e: MouseEvent) => {
										this.handleSelectionGroup(option, group, e);
									}}
									.disabled=${typeof option === "object" && option.disabled}
								>
									${this.checkbox
										? html` <f-checkbox
												state=${this.state}
												size=${this.size}
												value=${this.isGroupSelection(option, group) ? "checked" : "unchecked"}
												@input=${(e: MouseEvent) => {
													this.handleCheckboxGroup(option, group, e);
												}}
										  ></f-checkbox>`
										: ""}
									${(option as FSelectOptionObject)?.icon && !this.optionTemplate
										? html` <f-div
												padding="none"
												gap="none"
												height="hug-content"
												width="hug-content"
												><f-icon
													size="medium"
													source=${(option as FSelectOptionObject)?.icon}
												></f-icon
										  ></f-div>`
										: ""}
									${this.optionTemplate ? this.optionTemplate(option) : ""}
									${!this.optionTemplate
										? html` <f-div
												padding="none"
												gap="none"
												height="hug-content"
												width="fill-container"
												><f-text variant="para" size="small" weight="regular"
													>${(option as FSelectOptionObject)?.title ?? option}</f-text
												></f-div
										  >`
										: ""}
									${this.isGroupSelection(option, group) && !this.checkbox
										? html` <f-div
												padding="none"
												gap="none"
												height="hug-content"
												width="hug-content"
												><f-icon size="small" source="i-tick"></f-icon
										  ></f-div>`
										: ""}
								</f-div>
							`
					)}
				</f-div></f-div
			  >`
										: ""
							  )
							: emptyMenu}
					</f-div>
				</div>
			</div>
			<f-div .padding=${this._hasHelperText && !this._hasLabel ? "x-small none none none" : "none"}>
				<slot name="help" @slotchange=${this._onHelpSlotChange}></slot>
			</f-div>
		</div>
	`;
}

export function renderSingleSelection(this: FSelect, option: FSelectSingleOption) {
	const withoutTemplate = () => {
		return html` <f-text
			data-qa-selected-option=${option}
			variant="para"
			size="small"
			weight="regular"
			class="word-break"
			?ellipsis=${true}
			>${(option as FSelectOptionObject)?.title ?? option}</f-text
		>`;
	};

	const getTemplate = () => {
		return this.optionTemplate ? this.optionTemplate(option, true) : withoutTemplate();
	};
	return html`<f-div padding="none" style=${this.singleSelectionStyle}> ${getTemplate()} </f-div>`;
}

export function renderMultipleSelectionTag(this: FSelect, option: FSelectSingleOption) {
	const withoutTemplate = () => {
		return html`<f-tag
			data-qa-selected-tag=${option}
			class="f-tag-system-icon"
			icon-right="i-close"
			size="small"
			style="max-width:${this.offsetWidth - this.rightOffset}px"
			label=${(option as FSelectOptionObject)?.title ?? option}
			state="neutral"
			@click=${(e: MouseEvent) => {
				this.handleOptionSelection(option, e);
			}}
		></f-tag> `;
	};

	const getTemplate = () => {
		return this.optionTemplate
			? html`<f-div
					variant="curved"
					style="max-width:${this.offsetWidth - this.rightOffset}px"
					gap="small"
					state="secondary"
					padding="small"
					>${this.optionTemplate(option, true)}
					<f-icon-button
						icon="i-close"
						state="inherit"
						size="x-small"
						@click=${(e: MouseEvent) => {
							this.handleOptionSelection(option, e);
						}}
						category="packed"
					></f-icon-button>
			  </f-div>`
			: withoutTemplate();
	};
	return getTemplate();
}
