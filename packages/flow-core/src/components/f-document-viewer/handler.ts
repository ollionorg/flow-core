import { html, HTMLTemplateResult } from "lit-html";
import { FDocumentStatement, FDocumentViewer, FDocViewerContent } from "./f-document-viewer";
import { FAccordion } from "./../f-accordion/f-accordion";
import { FDiv } from "./../f-div/f-div";
import { cloneDeep } from "lodash-es";
import { repeat } from "lit/directives/repeat.js";

/**
 *
 * @param this comppnent
 * @param key string for key
 * @param value string for value inside key could be an object or a string
 * @param innerHtml result in html to be rendered
 * @returns accordion panel template
 */
export function getAccordionPanel(
	this: FDocumentViewer,
	key: string,
	value: FDocumentStatement,
	innerHtml: HTMLTemplateResult,
	level: number
) {
	return html` <f-accordion
		icon-placement="left"
		icon-size="x-small"
		id=${this.refName(key)}
		class="doc-preview-accordion"
		?open=${value.open}
		data-level=${level}
		@toggle=${() => {
			value.open = !value.open;
		}}
	>
		${value.template
			? html`<f-div height="100%">${value.template(this.searchValue)}</f-div>`
			: html` <f-div gap="medium">
					<f-div width="hug-content">
						<f-text
							variant="para"
							size="small"
							.weight=${this.getTextWeight(value.type)}
							.state=${this.getState(value.type)}
							id="doc-text"
							.highlight=${this.searchValue}
						>
							${key}</f-text
						></f-div
					>
					<f-div>
						<f-text
							variant="para"
							size="small"
							.weight=${this.getTextWeight(value.type)}
							.state=${this.getState(value.type)}
							id="doc-text"
							.highlight=${this.searchValue}
						>
							${value.title}</f-text
						></f-div
					>
			  </f-div>`}

		<f-div slot="body" direction="column" width="100%">${innerHtml}</f-div>
	</f-accordion>`;
}

/**
 *
 * @param this comppnent
 * @param key string for key
 * @param value string for value inside key
 * @returns html template
 */
export function getTextPanel(
	this: FDocumentViewer,
	key: string,
	value: FDocumentStatement,
	level: number
) {
	return html` <f-div class="custom-body-padding" height="hug-content" data-level=${level}>
		${value.template
			? html`${value.template(this.searchValue)}`
			: html` <f-div gap="medium" height="hug-content" gap="medium">
					<f-div width="hug-content"
						><f-text
							variant="para"
							size="small"
							.weight=${this.getTextWeight(value.type)}
							.state=${this.getState(value.type)}
							id="doc-text"
							.highlight=${this.searchValue}
							>${key}</f-text
						></f-div
					>
					<f-div
						><f-text
							variant="para"
							size="small"
							.state=${this.getState(value.type)}
							id="doc-text"
							.highlight=${this.searchValue}
							>${value.title || value}</f-text
						></f-div
					>
			  </f-div>`}
	</f-div>`;
}

/**
 *
 * @param this comppnent
 * @param obj complete json object for doc creation
 * @returns template for the data given
 */
export function traverse(
	this: FDocumentViewer,
	obj: FDocViewerContent,
	level: number
): HTMLTemplateResult {
	return html`${repeat(Object.entries(obj), ([key, value]) => {
		this.deepestLevel = level;
		if (typeof value === "object" && value !== null && value.data) {
			// Recursive call for nested objects
			const innerHtml = this.traverse(value.data, level + 1);
			return this.getAccordionPanel(key, value, innerHtml, level);
		} else {
			return this.getTextPanel(key, value as FDocumentStatement, level);
		}
	})}`;
}

/**
 *
 * @param this comppnent
 * @param index number or a string which is used to scroll to a partiucular section on scroll event
 */
export function scrollToSectionMethod(this: FDocumentViewer, index: number | string) {
	const el = this.shadowRoot!.querySelector(`#${this.refName(index)}`) as FAccordion;
	el.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}

/**
 * @param this comppnent
 * check which section is on view on the screen
 */
export function checkInView(this: FDocumentViewer) {
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
 * @param this comppnent
 * @param level level to be selected
 */
export function handleSelection(this: FDocumentViewer, e: CustomEvent<{ value: string }>) {
	const str = e.detail.value;
	const level = Number(str.charAt(str.length - 1));
	this.indexingLevelSelected = level;
	for (let i = 1; i <= this.deepestLevel; i++) {
		this.shadowRoot?.querySelectorAll<FAccordion | FDiv>(`[data-level="${i}"]`).forEach(item => {
			item.style.display = "flex";
			if (item instanceof FAccordion) {
				item.icon = "chevron";
			}
		});
	}
	for (let i = level + 1; i <= this.deepestLevel; i++) {
		this.shadowRoot?.querySelectorAll(`[data-level="${i}"]`).forEach(item => {
			(item as HTMLElement).style.display = "none";
		});
	}
	const elements = this.shadowRoot?.querySelectorAll(`[data-level="${level}"]`);
	elements?.forEach(item => {
		if (item instanceof FAccordion) {
			item.icon = "none";
		}
	});
}

/**
 *
 * @param this comppnent
 * @param e value to be searched
 */
export function handleSearch(this: FDocumentViewer, e: CustomEvent) {
	this.searchValue = e.detail.value;
	this.requestUpdate();
}

/**
 *
 * @param this component
 */
export function toggleLeftColumn(this: FDocumentViewer) {
	const previousState = this.leftColumn.getAttribute("data-column-open") === "true";

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
	this.leftColumn.dataset.columnOpen = String(!previousState);
	this.notch.dataset.columnOpen = String(!previousState);
	this.notchIcon.dataset.columnOpen = String(!previousState);
}
