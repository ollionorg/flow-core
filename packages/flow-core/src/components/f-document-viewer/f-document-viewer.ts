import { HTMLTemplateResult, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-document-viewer.scss?inline";
import globalStyle from "./f-document-viewer-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { FText } from "../f-text/f-text";
import { FAccordion } from "../f-accordion/f-accordion";
import { FSearch } from "../f-search/f-search";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { FRadio } from "../f-radio/f-radio";
import { FDivider } from "../f-divider/f-divider";
import { FPopover } from "../f-popover/f-popover";
import { FSpacer } from "../f-spacer/f-spacer";
import { FIcon } from "../f-icon/f-icon";
import render, { contentSectionHeader, jumplinksItems, jumplinksSection } from "./render";
import {
	checkInView,
	getAccordionPanel,
	getTextPanel,
	handleSearch,
	handleSelection,
	scrollToSectionMethod,
	toggleLeftColumn,
	traverse
} from "./handler";
import { FSelect } from "../f-select/f-select";

injectCss("f-document-viewer", globalStyle);

export type FDocumentData = Record<string, string | FDocumentStatement>;
export type FDocTextType = "heading" | "para";
export type FDocumentStatement = {
	title: string;
	data?: FDocumentData;
	type?: FDocTextType;
	open: boolean;
	template?: (highlightText?: string | null) => HTMLTemplateResult;
};

export type FDocViewerContent = Record<string, FDocumentStatement | string>;

@flowElement("f-document-viewer")
export class FDocumentViewer extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FAccordion.styles,
		...FSearch.styles,
		...FIconButton.styles,
		...FRadio.styles,
		...FDivider.styles,
		...FPopover.styles,
		...FSpacer.styles
	];

	/**
	 * @attribute json object for doc-previewer
	 */
	@property({ reflect: false, type: Object })
	content!: FDocViewerContent;
	/** * mention required fields here for generating vue types */
	readonly required = ["content"];

	/**
	 * @attribute toggle jump-links
	 */
	@property({ reflect: true, type: Boolean, attribute: "jump-links" })
	jumpLinks = true;

	/**
	 * @attribute toggle notch if jump-links present
	 */
	@property({ reflect: true, type: Boolean, attribute: "collapsible-jump-links" })
	collapsibleJumpLinks = false;

	/**
	 * @attribute toggle level-selector
	 */
	@property({ reflect: true, type: Boolean, attribute: "level-selector" })
	levelSelector = true;

	@query(".preview-scrollable")
	fDocViewerScrollContent!: FDiv;

	@query(".jumplinks-highlight")
	leftColumn!: FDiv;

	@query(".notch")
	notch!: FDiv;

	@query(".notch-icon")
	notchIcon!: FIcon;

	@query("#jumplinks-wrapper")
	leftColumnWrapper!: FDiv;

	@query(".f-select-level-selector")
	fSelectLevelSelector!: FSelect;

	indexingLevelSelected: null | number = null;

	searchValue = "";

	deepestLevel = 0;

	/**
	 * return an array consisting of indexing levels for filtering the content on the basis of levels.
	 */
	inndexingArray(levels: number) {
		const obj = {
			Indexing: Array.from({ length: levels }, (_, i) =>
				i === 0 ? `Only L${i + 1}` : `Upto L${i + 1}`
			)
		};
		return obj;
	}

	/**
	 *
	 * @param index string or a number for unique identification
	 * @returns a special character for dynamic id creation
	 */
	refName(index: string | number) {
		return `sectionRef${index}-id`.replace(".", "-");
	}

	/**
	 *
	 * @param index string or a number for unique identification
	 * @returns a special character for dynamic id creation
	 */
	sidebarRefName(index: string | number) {
		return `sidebarRef${index}-id`.replace(".", "-");
	}

	/**
	 *
	 * @param type para or heading
	 * @returns text state color
	 */
	getState(type?: FDocTextType) {
		const mapper = {
			para: "secondary",
			heading: "default"
		};
		return type ? mapper[type] : "secondary";
	}

	/**
	 *
	 * @param type para or heading
	 * @returns text weight
	 */
	getTextWeight(type?: FDocTextType) {
		const mapper = {
			para: "regular",
			heading: "bold"
		};
		return type ? mapper[type] : "regular";
	}

	getAccordionPanel = getAccordionPanel;
	getTextPanel = getTextPanel;
	traverse = traverse;
	scrollToSectionMethod = scrollToSectionMethod;
	checkInView = checkInView;
	handleSelection = handleSelection;
	handleSearch = handleSearch;
	toggleLeftColumn = toggleLeftColumn;
	contentSectionHeader = contentSectionHeader;
	jumplinksSection = jumplinksSection;
	jumplinksItems = jumplinksItems;
	render = render;

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		this.checkInView();
		this.fSelectLevelSelector.options = this.inndexingArray(this.deepestLevel);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-document-viewer": FDocumentViewer;
	}
}
