import { HTMLTemplateResult, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-document-viewer.scss?inline";
import globalStyle from "./f-document-viewer-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
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
	filterObjectByLevel,
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

<<<<<<< HEAD
	getAccordionPanel = getAccordionPanel;
	getTextPanel = getTextPanel;
	traverse = traverse;
	scrollToSectionMethod = scrollToSectionMethod;
	checkInView = checkInView;
	filterObjectByLevel = filterObjectByLevel;
	handleSelection = handleSelection;
	handleSearch = handleSearch;
	toggleLeftColumn = toggleLeftColumn;
	contentSectionHeader = contentSectionHeader;
	jumplinksSection = jumplinksSection;
	jumplinksItems = jumplinksItems;
	render = render;
=======
	/**
	 *
	 * @param index number or a string which is used to scroll to a partiucular section on scroll event
	 */
	scrollToSectionMethod(index: number | string) {
		const el = this.shadowRoot!.querySelector(`#${this.refName(index)}`) as FAccordion;
		el.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}

	/**
	 * check which section is on view on the screen
	 */
	checkInView() {
		if (this.jumpLinks) {
			const contentRefs = Object.keys(this.content).map(
				i => this.shadowRoot?.querySelector(`#${this.refName(i)}`) as FAccordion
			);
			const sidebarRefs = Object.keys(this.content).map(
				i => this.shadowRoot?.querySelector(`#${this.sidebarRefName(i)}`) as FDiv
			);
			const handleScroll = () => {
				let activeSectionIndex = -1;
				let minDistance = Number.MAX_VALUE;

				for (let i = 0; i < contentRefs.length; i++) {
					const rect = contentRefs[i].getBoundingClientRect();
					const distance = Math.abs(rect.top);
					if (distance < minDistance) {
						minDistance = distance;
						activeSectionIndex = i;
					}
				}

				sidebarRefs.forEach((sidebar, i) => {
					if (i === activeSectionIndex) {
						sidebar.selected = "background";
						setTimeout(() => {
							sidebar.scrollIntoView({
								behavior: "auto",
								block: "start"
							});
						}, 1000);
					} else {
						sidebar.selected = "none";
					}
				});
			};

			this.fDocViewerScrollContent?.addEventListener("scroll", handleScroll);
		}
	}

	/**
	 *
	 * @param obj complete json object for doc creation
	 * @param level until which level of nesting the data must be displayed
	 * @returns the filtered data to a particular level
	 */
	filterObjectByLevel(obj: FDocViewerContent, level: number) {
		const filteredObj = cloneDeep(obj);
		function traverse(obj: FDocViewerContent, currentLevel: number) {
			if (currentLevel === level) {
				for (const key in obj) {
					if (typeof obj[key] === "object" && obj[key] !== null) {
						obj[key] = (obj[key] as FDocumentStatement).title;
						delete (obj[key] as FDocumentStatement).data;
					}
				}
			} else {
				for (const key in obj) {
					if (typeof obj[key] === "object" && obj[key] !== null) {
						traverse((obj[key] as FDocumentStatement).data ?? {}, currentLevel + 1);
					}
				}
			}
		}
		traverse(filteredObj, 0);
		return filteredObj;
	}

	/**
	 *
	 * @param level level to be selected
	 */
	handleSelection(e: CustomEvent) {
		const str = e.detail.value as string;
		const level = Number(str.charAt(str.length - 1));
		this.indexingLevelSelected = level;
		this.filteredContents = this.filterObjectByLevel(this.content, level);
	}

	/**
	 *
	 * @param e value to be searched
	 */
	handleSearch(e: CustomEvent) {
		this.searchValue = e.detail.value;
		this.requestUpdate();
	}

	toggleLeftColumn() {
		const previousState =
			this.leftColumn.getAttribute("data-column-open") === "true" ? true : false;

		if (!previousState) {
			this.leftColumnWrapper.width = "300px";
			this.leftColumnWrapper.border = "small solid secondary right";
			this.leftColumnWrapper.setAttribute("class", "jumplinks-expanded");
		} else {
			this.leftColumnWrapper.width = "0px";
			this.leftColumnWrapper.removeAttribute("border");
			this.leftColumnWrapper.style.removeProperty("border-right");
			this.leftColumnWrapper.setAttribute("class", "jumplinks-collapsed");
		}
		this.leftColumn.setAttribute("data-column-open", String(!previousState));
		this.notch.setAttribute("data-column-open", String(!previousState));
		this.notchIcon.setAttribute("data-column-open", String(!previousState));
	}

	render() {
		const renderedHTML = this.traverse(this.filteredContents ?? this.content);
		// listing the sidebar items on the basis of json
		const sidebarMenuItems = Object.entries(this.content).map(
			([key, value], index) => html`
							<f-div
								padding="medium medium medium large"
								height="hug-content"
								?clickable=${true}
								state="secondary"
								@click=${() => this.scrollToSectionMethod(key)}
								id="${this.sidebarRefName(key)}"
								.selected=${index === 0 ? "background" : "none"}
								width="300px"
							>
								<f-text variant="para" weight="medium" size="medium">${
									(value as FDocumentStatement).title || value
								}</f-text></f-div
							>
							</f-div>`
		);

		// popover which displayes levels, that filter data on its basis
		const indexingPopover = html`
			<f-div width="140px" class="level-selector">
				<f-select
					.options=${this.inndexingArray}
					@input=${this.handleSelection}
					.value=${"All Levels"}
					icon-left="i-view-fill"
					size="small"
				></f-select>
			</f-div>
		`;

		//sidebar jump-links
		const jumpLinksSection = this.jumpLinks
			? html` <f-div
						state="secondary"
						id="jumplinks-wrapper"
						class="jumplinks-expanded"
						border="small solid secondary right"
						width="300px"
						direction="column"
					>
						<f-div padding="medium medium medium large" height="hug-content" width="300px">
							<f-text variant="heading" weight="medium" size="medium">Sections</f-text></f-div
						>
						<f-div overflow="scroll" direction="column" class="jump-links">
							${sidebarMenuItems}
						</f-div>
					</f-div>
					${this.collapsibleJumpLinks
						? html` <f-div
								class="notch"
								data-column-open=${true}
								width="16px"
								height="76px"
								align="middle-center"
								state="secondary"
								clickable
								@click=${this.toggleLeftColumn}
								overflow="hidden"
						  >
								<f-icon
									source="i-notch-left"
									size="small"
									state="default"
									class="notch-icon"
									data-column-open=${true}
								></f-icon>
						  </f-div>`
						: ""}`
			: "";

		const contentSectionHeader = html`<f-div
			padding="medium"
			gap="medium"
			align="middle-center"
			height="hug-content"
		>
			<f-search
				variant="round"
				.size=${"small"}
				id="search-doc"
				@input=${this.handleSearch}
				.value=${this.searchValue}
			></f-search>
			${this.levelSelector
				? html` <f-divider state="secondary"></f-divider>
						${indexingPopover}`
				: ""}
		</f-div>`;

		return html`
			<f-div
				state="secondary"
				height="100%"
				class="jumplinks-highlight"
				data-column-open=${true}
				data-jump-links=${this.jumpLinks}
			>
				${jumpLinksSection}
				<f-div direction="column" gap="medium">
					${contentSectionHeader}
					<f-div
						overflow="scroll"
						direction="column"
						gap="medium"
						padding="none large none large"
						class="preview-scrollable"
					>
						${renderedHTML}
						<f-spacer size="600px"></f-spacer>
					</f-div>
				</f-div>
			</f-div>
		`;
	}
>>>>>>> 347c29c (FLOW-947 f-document-viewer test cases)

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
