import { html, nothing } from "lit-html";
import { FDocumentStatement, FDocumentViewer } from "./f-document-viewer";

export default function render(this: FDocumentViewer) {
	const renderedHTML = this.traverse(this.content, 0);
	return html`
		<f-div
			state="secondary"
			height="100%"
			class="jumplinks-highlight"
			data-column-open=${true}
			data-jump-links=${this.jumpLinks}
		>
			${this.jumplinksSection()}
			<f-div direction="column" gap="medium">
				${this.contentSectionHeader()}
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

export function jumplinksItems(this: FDocumentViewer) {
	// listing the sidebar items on the basis of json
	return Object.entries(this.content).map(
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
}

export function jumplinksSection(this: FDocumentViewer) {
	return this.jumpLinks
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
						${this.jumplinksItems()}
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
					: nothing}`
		: nothing;
}

export function contentSectionHeader(this: FDocumentViewer) {
	return html`<f-div padding="medium" gap="medium" align="middle-center" height="hug-content">
		<f-search
			variant="round"
			.size=${"small"}
			id="search-doc"
			@input=${this.handleSearch}
			.value=${this.searchValue}
		></f-search>
		${this.levelSelector
			? html` <f-divider state="secondary"></f-divider>
					<f-div width="140px" class="level-selector">
						<f-select
							class="f-select-level-selector"
							@input=${this.handleSelection}
							.value=${"All Levels"}
							icon-left="i-view-fill"
							size="small"
						></f-select>
					</f-div>`
			: nothing}
	</f-div>`;
}
