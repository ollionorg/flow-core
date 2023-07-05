/* eslint-disable no-mixed-spaces-and-tabs */
import {
	FSelect,
	FSelectArrayOfObjects,
	FSelectCustomEvent,
	FSelectOptionObject,
	FSelectOptionsGroup,
	FSelectSingleOption
} from "./f-select";
import _ from "lodash";

/**
 * open options menu
 */
export function handleDropDownOpen(this: FSelect, e: MouseEvent) {
	this.openDropdown = true;
	this?.inputElement?.focus();
	this.updateDimentions();

	e.stopPropagation();
}

/**
 * close options menu
 */
export function handleDropDownClose(this: FSelect, e: MouseEvent, clearSearch = true) {
	this.openDropdown = false;
	if (clearSearch) {
		this.clearFilterSearchString();
	}
	this.currentCursor = -1;
	this.currentGroupCursor = -1;
	this.currentGroupOptionCursor = -1;
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
			const filteredOptionsCloned = _.cloneDeep(this.filteredOptions);
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
