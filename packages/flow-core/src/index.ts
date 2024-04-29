/// <reference types="vite/client" />

import { ConfigUtil } from "@ollion/flow-core-config";
import { version } from "../package.json";
import { LitElement } from "lit";
import { FDiv } from "./components/f-div/f-div";
import { FButton } from "./components/f-button/f-button";
import { FIcon } from "./components/f-icon/f-icon";
import { FDivider } from "./components/f-divider/f-divider";
import { FCounter } from "./components/f-counter/f-counter";
import { FText } from "./components/f-text/f-text";
import { FSpacer } from "./components/f-spacer/f-spacer";
import { FIconButton } from "./components/f-icon-button/f-icon-button";
import { FPictogram } from "./components/f-pictogram/f-pictogram";
import { FTemplate } from "./components/f-template/f-template";
import { FPopover } from "./components/f-popover/f-popover";
import { FTag } from "./components/f-tag/f-tag";
import { FInput } from "./components/f-input/f-input";
import { FFormGroup } from "./components/f-form-group/f-form-group";
import { FCheckbox } from "./components/f-checkbox/f-checkbox";
import { FField } from "./components/f-field/f-field";
import { FRadio } from "./components/f-radio/f-radio";
import { FForm } from "./components/f-form/f-form";
import { FSwitch } from "./components/f-switch/f-switch";
import { FTextArea } from "./components/f-text-area/f-text-area";
import { FSelect } from "./components/f-select/f-select";
import { FTooltip } from "./components/f-tooltip/f-tooltip";
import { FTab } from "./components/f-tab/f-tab";
import { FTabNode } from "./components/f-tab-node/f-tab-node";
import { FTabContent } from "./components/f-tab-content/f-tab-content";
import { FEmojiPicker } from "./components/f-emoji-picker/f-emoji-picker";
import { FFileUpload } from "./components/f-file-upload/f-file-upload";
import { FSuggest } from "./components/f-suggest/f-suggest";
import { FToast } from "./components/f-toast/f-toast";
import { FSearch } from "./components/f-search/f-search";
import { FDateTimePicker } from "./components/f-date-time-picker/f-date-time-picker";
import { FAccordion } from "./components/f-accordion/f-accordion";
import { FGrid } from "./components/f-grid/f-grid";
import { FCarousel } from "./components/f-carousel/f-carousel";
import { FCarouselContent } from "./components/f-carousel-content/f-carousel-content";
import { FProgressBar } from "./components/f-progress-bar/f-progress-bar";
import { FBreadcrumb } from "./components/f-breadcrumb/f-breadcrumb";
import { FDocumentViewer } from "./components/f-document-viewer/f-document-viewer";
import { FFormField } from "./components/f-form-field/f-form-field";
import { FInputLight } from "./components/f-input/f-input-light";
import { FColorPicker } from "./components/f-color-picker/f-color-picker";
import { FCountdown } from "./components/f-countdown/f-countdown";

export { flowElement } from "./utils";

export * from "@ollion/flow-core-config";
export * from "./components/f-button/f-button";
export * from "./components/f-icon/f-icon";
export * from "./components/f-divider/f-divider";
export * from "./components/f-counter/f-counter";
export * from "./components/f-div/f-div";
export * from "./components/f-text/f-text";
export * from "./components/f-spacer/f-spacer";
export * from "./components/f-icon-button/f-icon-button";
export * from "./components/f-pictogram/f-pictogram";
export * from "./components/f-template/f-template";
export * from "./components/f-popover/f-popover";
export * from "./components/f-tag/f-tag";
export * from "./components/f-input/f-input";
export * from "./components/f-form-group/f-form-group";
export * from "./components/f-checkbox/f-checkbox";
export * from "./components/f-field/f-field";
export * from "./components/f-radio/f-radio";
export * from "./components/f-form/f-form";
export * from "./components/f-switch/f-switch";
export * from "./components/f-text-area/f-text-area";
export * from "./components/f-select/f-select";
export * from "./components/f-tooltip/f-tooltip";
export * from "./components/f-tab/f-tab";
export * from "./components/f-tab-node/f-tab-node";
export * from "./components/f-tab-content/f-tab-content";
export * from "./components/f-emoji-picker/f-emoji-picker";
export * from "./components/f-file-upload/f-file-upload";
export * from "./components/f-suggest/f-suggest";
export * from "./components/f-toast/f-toast";
export * from "./components/f-search/f-search";
export * from "./components/f-date-time-picker/f-date-time-picker";
export * from "./components/f-accordion/f-accordion";
export * from "./components/f-grid/f-grid";
export * from "./components/f-carousel/f-carousel";
export * from "./components/f-carousel-content/f-carousel-content";
export * from "./components/f-progress-bar/f-progress-bar";
export * from "./components/f-breadcrumb/f-breadcrumb";
export * from "./components/f-document-viewer/f-document-viewer";
export * from "./mixins/components/f-root/f-root";
export * from "./components/f-form-field/f-form-field";
export * from "./components/f-input/f-input-light";
export * from "./components/f-color-picker/f-color-picker";
export * from "./components/f-countdown/f-countdown";

export { html } from "lit";

if (document.readyState !== "loading") {
	ConfigUtil.initTheme();
} else {
	document.addEventListener("DOMContentLoaded", function () {
		ConfigUtil.initTheme();
	});
}

document.addEventListener("keyup", (event: KeyboardEvent) => {
	event.preventDefault();

	if (event.key && event.key.toLowerCase() === "x" && event.shiftKey && event.ctrlKey) {
		// console.log("Changing theme");
		const currentTheme = ConfigUtil.getConfig().theme;

		ConfigUtil.setConfig({
			theme: currentTheme === "f-dark" ? "f-light" : "f-dark"
		});
	}
});

console.log(
	`%c@ollion/flow-core%cv${version}`,
	"background:#161616;color:white;padding:4px 6px 4px 6px;border-radius:4px 0px 0px 4px",
	"background:#695bf4;color:white;padding:4px 6px 4px 6px;border-radius:0px 4px 4px 0px;"
);

export const flowCoreElements = [
	FDiv,
	FButton,
	FIcon,
	FDivider,
	FCounter,
	FText,
	FSpacer,
	FIconButton,
	FPictogram,
	FTemplate,
	FPopover,
	FTag,
	FInput,
	FFormGroup,
	FCheckbox,
	FField,
	FRadio,
	FForm,
	FSwitch,
	FTextArea,
	FSelect,
	FTooltip,
	FTab,
	FTabNode,
	FTabContent,
	FEmojiPicker,
	FFileUpload,
	FSuggest,
	FToast,
	FSearch,
	FDateTimePicker,
	FAccordion,
	FGrid,
	FCarousel,
	FCarouselContent,
	FProgressBar,
	FBreadcrumb,
	FDocumentViewer,
	FFormField,
	FInputLight,
	FColorPicker,
	FCountdown
];
export function register(elements: (new () => LitElement)[]) {
	elements.forEach(element => {
		const tagName = element.name.replace(
			/[A-Z]/g,
			(match, offset) => (offset > 0 ? "-" : "") + match.toLowerCase()
		);
		if (!customElements.get(tagName)) customElements.define(tagName, element);
	});
}

export function registerAll() {
	register(flowCoreElements);
}
