import {
	FSelect,
	FSelectArrayOfObjects,
	FSelectCustomEvent,
	FSelectOptionObject,
	FSelectOptionsGroup,
	FSelectSingleOption
} from "./f-select";
import { cloneDeep } from "lodash-es";

/**
 * open options menu
 */
export function handleDropDownOpen(this: FSelect, e: MouseEvent | KeyboardEvent) {
	if (!this.loading) {
		this.openDropdown = true;
		this?.inputElement?.focus();
		this.updateDimentions();
	}
	e.stopPropagation();
}

/**
 * close options menu
 */
export function handleDropDownClose(
	this: FSelect,
	e: MouseEvent | KeyboardEvent,
	clearSearch = true
) {
	this.openDropdown = false;
	if (clearSearch) {
		this.clearFilterSearchString();
	}
	this.requestUpdate();
	e.stopPropagation();

	const event = new CustomEvent("blur", {
		detail: {
			value: this.value
		},
		bubbles: true,
		composed: true
	});
	this.dispatchEvent(event);
}

/**
 * action for selection of options if the options is in the form of array
 */
export function handleOptionSelection(this: FSelect, option: FSelectSingleOption, e: MouseEvent) {
	e.preventDefault();
	e.stopPropagation();

	if (Array.isArray(this.options)) {
		if (this.type === "single") {
			if (!this.isSelected(option)) {
				(this.selectedOptions as FSelectArrayOfObjects) = [option as FSelectOptionObject];
			} else if (this.clear) {
				(this.selectedOptions as FSelectArrayOfObjects).splice(this.getIndex(option), 1);
			}
			this.handleDropDownClose(e);
		} else {
			!this.isSelected(option)
				? (this.selectedOptions as FSelectArrayOfObjects).push(option as FSelectOptionObject)
				: (this.selectedOptions as FSelectArrayOfObjects).splice(this.getIndex(option), 1);
		}
	}
	const event = new CustomEvent<FSelectCustomEvent>("input", {
		detail: {
			value:
				this.type === "multiple"
					? this.selectedOptions
					: (this.selectedOptions as FSelectArrayOfObjects)[0]
		},
		bubbles: true,
		composed: true
	});
	(this.value as unknown) =
		this.type === "multiple"
			? this.selectedOptions
			: (this.selectedOptions as FSelectArrayOfObjects)[0];
	this.dispatchEvent(event);
	this.requestUpdate();
}

/**
 * action for selection of options if the options is in the form of groups
 */
export function handleSelectionGroup(
	this: FSelect,
	option: FSelectSingleOption,
	group: string,
	e: MouseEvent
) {
	e.stopPropagation();
	e.preventDefault();
	const selectedOptionsInGroup = (this.selectedOptions as FSelectOptionsGroup)[group];
	if (this.type === "single") {
		this.selectedOptions = {
			...this.selectedOptions,
			[group]: [option as FSelectOptionObject]
		};
		this.handleDropDownClose(e);
	} else {
		!this.isGroupSelection(option, group)
			? !selectedOptionsInGroup
				? (this.selectedOptions = {
						...this.selectedOptions,
						[group]: [option as FSelectOptionObject]
				  })
				: (selectedOptionsInGroup as FSelectArrayOfObjects).push(option as FSelectOptionObject)
			: selectedOptionsInGroup.splice(this.getIndexInGroup(option, group), 1);
	}
	const event = new CustomEvent<FSelectCustomEvent>("input", {
		detail: {
			value:
				this.type === "multiple"
					? this.selectedOptions
					: (this.selectedOptions as FSelectOptionsGroup)[group][0]
		},
		bubbles: true,
		composed: true
	});
	(this.value as unknown) =
		this.type === "multiple"
			? this.selectedOptions
			: (this.selectedOptions as FSelectOptionsGroup)[group][0];
	this.dispatchEvent(event);
	this.requestUpdate();
}

/**
 * remove selection option (in group) when f-tag is clicked
 */
export function handleRemoveGroupSelection(
	this: FSelect,
	option: FSelectSingleOption,
	e: MouseEvent
) {
	e.stopPropagation();
	Object.keys(this.selectedOptions).forEach(group => {
		const index = (this.selectedOptions as FSelectOptionsGroup)[group].findIndex(
			item => JSON.stringify(item) === JSON.stringify(option)
		);
		if (index !== -1) {
			const selectedOptionsInGroup = (this.selectedOptions as FSelectOptionsGroup)[group];
			selectedOptionsInGroup.splice(index, 1);
			this.selectedOptions = {
				...this.selectedOptions,
				[group]: selectedOptionsInGroup
			};
			e.stopPropagation();
			const event = new CustomEvent<FSelectCustomEvent>("input", {
				detail: {
					value:
						this.type === "multiple"
							? this.selectedOptions
							: (this.selectedOptions as FSelectOptionsGroup)[group][0]
				},
				bubbles: true,
				composed: true
			});
			(this.value as unknown) =
				this.type === "multiple"
					? this.selectedOptions
					: (this.selectedOptions as FSelectOptionsGroup)[group][0];
			this.dispatchEvent(event);
		}
	});
	this.requestUpdate();
}

/**
 * handle click on checkbox
 */
export function handleCheckboxInput(this: FSelect, option: FSelectSingleOption, e: MouseEvent) {
	e.stopPropagation();
	this.handleOptionSelection(option, e);
}

/**
 * handle click on checkbox in group
 */
export function handleCheckboxGroup(
	this: FSelect,
	option: FSelectSingleOption,
	group: string,
	e: MouseEvent
) {
	e.stopPropagation();
	this.handleSelectionGroup(option, group, e);
}

/**
 * select all options inside a particular group
 */
export function handleSelectAll(this: FSelect, e: MouseEvent, group: string) {
	if (this.type === "multiple") {
		e.stopPropagation();
		if (
			this.getCheckedValue(group) === "unchecked" ||
			this.getCheckedValue(group) === "indeterminate"
		) {
			(this.selectedOptions as FSelectOptionsGroup)[group] = [
				...(this.options as FSelectOptionsGroup)[group]
			] as FSelectArrayOfObjects;
		} else {
			(this.selectedOptions as FSelectOptionsGroup)[group] = [];
		}
		const event = new CustomEvent<FSelectCustomEvent>("input", {
			detail: {
				value: this.selectedOptions
			},
			bubbles: true,
			composed: true
		});
		this.value = this.selectedOptions;
		this.dispatchEvent(event);
		this.requestUpdate();
	}
}

/**
 * hide/show f-tags when multiple options are selected
 */
export function handleViewMoreTags(this: FSelect, e: MouseEvent) {
	e.stopPropagation();
	this.viewMoreTags = !this.viewMoreTags;
	this.requestUpdate();
}

/**
 * emit input custom event for option selection
 */
export function handleInput(this: FSelect, e: InputEvent) {
	e.stopPropagation();
	e.preventDefault();
	this.openDropdown = true;
	if (this.searchable) {
		this.searchValue = (e.target as HTMLInputElement)?.value;

		const event = new CustomEvent("search-input", {
			detail: {
				value: (e.target as HTMLInputElement)?.value
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);

		if (Array.isArray(this.options)) {
			this.filteredOptions = (this.options as FSelectArrayOfObjects)?.filter(
				(item: FSelectSingleOption) =>
					typeof item === "string"
						? item.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
						: (item as FSelectOptionObject).title
								.toLowerCase()
								.includes((e.target as HTMLInputElement)?.value.toLowerCase())
			);
		} else {
			const filteredOptionsCloned = cloneDeep(this.filteredOptions);
			Object.keys(this.options).forEach(item => {
				(filteredOptionsCloned as FSelectOptionsGroup)[item] = (
					(this.options as FSelectOptionsGroup)[item] as FSelectArrayOfObjects
				)?.filter((obj: FSelectSingleOption) =>
					typeof obj === "string"
						? obj.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
						: (obj as FSelectOptionObject).title
								.toLowerCase()
								.includes((e.target as HTMLInputElement)?.value.toLowerCase())
				);
			});
			this.filteredOptions = filteredOptionsCloned;
		}
		this.requestUpdate();
	}
}

export function handleBlur(this: FSelect, e: FocusEvent) {
	e.stopImmediatePropagation();
	e.stopPropagation();
}

export function handleKeyDown(this: FSelect, e: KeyboardEvent) {
	if (this.openDropdown) {
		if (e.code === "ArrowDown" || e.code === "ArrowUp") {
			let nextToHover: Element | undefined = undefined;
			const allOptionsArray = Array.prototype.slice.call(this.allOptions) as HTMLElement[];
			const currentHoverIndex = allOptionsArray?.findIndex(op => op.classList.contains("hover"));

			const currentHover = allOptionsArray[currentHoverIndex];
			if (currentHover) {
				currentHover.classList.remove("hover");
				if (allOptionsArray[currentHoverIndex + 1] && e.code === "ArrowDown") {
					allOptionsArray[currentHoverIndex + 1].classList.add("hover");
					nextToHover = allOptionsArray[currentHoverIndex + 1];
				} else if (allOptionsArray[currentHoverIndex - 1] && e.code === "ArrowUp") {
					allOptionsArray[currentHoverIndex - 1].classList.add("hover");
					nextToHover = allOptionsArray[currentHoverIndex - 1];
				} else if (this.allOptions && e.code === "ArrowDown") {
					this.allOptions[0].classList.add("hover");
					nextToHover = this.allOptions[0];
				} else if (this.allOptions && e.code === "ArrowUp") {
					this.allOptions[this.allOptions.length - 1].classList.add("hover");
					nextToHover = this.allOptions[this.allOptions.length - 1];
				}
			} else if (this.allOptions && e.code === "ArrowDown") {
				this.allOptions[0].classList.add("hover");
				nextToHover = this.allOptions[0];
			} else if (this.allOptions && e.code === "ArrowUp") {
				this.allOptions[this.allOptions.length - 1].classList.add("hover");
				nextToHover = this.allOptions[this.allOptions.length - 1];
			}

			nextToHover?.scrollIntoView({
				behavior: "auto",
				block: "nearest"
			});
		} else if (e.code === "Enter") {
			const currentHover = (Array.prototype.slice.call(this.allOptions) as HTMLElement[])?.find(
				op => op.classList.contains("hover")
			);
			if (currentHover) {
				currentHover.click();
			}
		} else if (e.code === "Escape") {
			this.handleDropDownClose(e, true);
		}
	} else if (!this.openDropdown && (e.code === "ArrowDown" || e.code === "ArrowUp")) {
		this.handleDropDownOpen(e);
	}
}

export function handleOptionMouseOver(this: FSelect, e: MouseEvent) {
	const currentHover = (Array.prototype.slice.call(this.allOptions) as HTMLElement[])?.find(op =>
		op.classList.contains("hover")
	);
	if (currentHover) {
		currentHover.classList.remove("hover");
	}
	(e.composedPath()[0] as HTMLElement).classList.add("hover");
	const nextHover = e.composedPath().find(op => {
		if (op instanceof HTMLElement) {
			return op.classList.contains("f-select-options-clickable");
		}
		return false;
	}) as HTMLElement | undefined;
	if (nextHover) {
		nextHover.classList.add("hover");
	}
}
