import { FSuggest, FSuggestSuggestionsCategory, FSuggestTemplate } from "./f-suggest";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import getComputedHTML from "../../utils/get-computed-html";

export function displayOptions(this: FSuggest, suggestions: string[]) {
	return html`<f-div height="hug-content" direction="column"
		>${suggestions.map((sg, index) => {
			return html`<f-div
				class="f-select-options-clickable"
				height="hug-content"
				@click=${this.handleSuggest}
				clickable
				padding="medium"
				.selected=${index === this.currentIndex ? "background" : "none"}
			>
				<f-div direction="row" gap="medium">
					${this.isSearchComponent ? html` <f-icon source="i-search"></f-icon>` : ""}
					<f-text variant="para" size="small" weight="regular" .highlight=${this.value}>
						${unsafeHTML(sg)}
					</f-text>
				</f-div>
			</f-div>`;
		})}</f-div
	>`;
}

export function displayCustomTemplate(this: FSuggest, suggestions: FSuggestTemplate[]) {
	return html`<f-div height="hug-content" direction="column"
		>${suggestions.map((sg, index) => {
			return html`<f-div
				class="f-select-options-clickable"
				height="hug-content"
				@click=${() => this.handleSelect(sg)}
				clickable
				.selected=${index === this.currentIndex ? "background" : "none"}
			>
				${unsafeHTML(getComputedHTML(sg.template(this.value)))}
			</f-div>`;
		})}</f-div
	>`;
}

export function displayCategories(this: FSuggest, suggestions: FSuggestSuggestionsCategory) {
	return Object.entries(suggestions).map(([objName, objValue], categoryIndex) => {
		return html`<f-div
			padding="none"
			height="hug-content"
			width="fill-container"
			direction="column"
			align="middle-left"
			border="small solid default bottom"
			><f-div
				padding="medium"
				height="hug-content"
				width="fill-container"
				align="middle-left"
				direction="row"
				><f-text
					variant="para"
					size="small"
					weight="regular"
					state="secondary"
					.highlight=${this.value}
					>${objName}</f-text
				></f-div
			>
			${objValue.map((item, index) => {
				return html`<f-div
					class="f-select-options-clickable"
					padding="medium"
					height="hug-content"
					width="fill-container"
					direction="row"
					?clickable=${true}
					align="middle-left"
					gap="small"
					@click=${this.handleSuggest}
					.selected=${categoryIndex === this.currentCategoryIndex && index === this.currentIndex
						? "background"
						: "none"}
				>
					<f-div direction="row" gap="medium">
						${this.isSearchComponent ? html` <f-icon source="i-search"></f-icon>` : ""}
						<f-text variant="para" size="small" weight="regular" .highlight=${this.value}>
							${unsafeHTML(item)}
						</f-text>
					</f-div>
				</f-div>`;
			})}
		</f-div>`;
	});
}
