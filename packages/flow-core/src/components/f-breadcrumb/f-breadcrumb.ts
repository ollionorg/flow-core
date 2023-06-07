/* eslint-disable no-mixed-spaces-and-tabs */
import { html, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-breadcrumb.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { FText } from "../f-text/f-text";
import { FPopover } from "../f-popover/f-popover";

export type FBreadCrumbsProp = { tabIndex: number; title: string };
export type FBreadcrumbs = FBreadCrumbsProp[];

@flowElement("f-breadcrumb")
export class FBreadcrumb extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles, ...FPopover.styles];

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: false, type: Array })
	crumbs!: FBreadcrumbs;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * popover element reference
	 */
	@query("f-popover")
	popOverElement!: FPopover;

	@query("#breadcrumb-popover")
	breadCrumbPopover!: FDiv;

	initialCrumbs!: FBreadCrumbsProp;
	middlePopoverCrumbs: FBreadcrumbs = [];
	endingCrumbs: FBreadcrumbs = [];

	/**
	 * text size computed
	 */
	get textSize() {
		return this.size === "medium" ? "small" : "x-small";
	}

	/**
	 *
	 * @param index index number of crumbs
	 * @param array crumbs array
	 * @returns checks whether index is current crumb or not
	 */
	isCurrentCrumb(index: number, array: FBreadcrumbs) {
		return index === array.length - 1;
	}

	/**
	 * create seperate crumbs when crumbs length is greater than 4
	 */
	createSeperateCrumbs() {
		if (this.crumbs.length > 4) {
			this.initialCrumbs = this.crumbs[0];
			this.middlePopoverCrumbs = this.crumbs.slice(1, this.crumbs.length - 2);
			this.endingCrumbs = this.crumbs.slice(this.crumbs.length - 2, this.crumbs.length);
		}
	}

	/**
	 *
	 * @param crumb
	 * @param index
	 * @param array
	 * @returns returns html to be printed in loop
	 */
	crumbLoop(crumb: FBreadCrumbsProp, index: number, array: FBreadcrumbs) {
		return html` <f-div
				width="hug-content"
				align="middle-left"
				class="f-breadcrumb-content"
				@click=${(event: MouseEvent) => this.handleDispatchEvent(event, crumb)}
			>
				<f-text
					.size=${this.textSize}
					variant="para"
					.weight=${this.isCurrentCrumb(index, array) ? "medium" : "regular"}
					class=${this.isCurrentCrumb(index, array) ? "" : "f-breadcrumb-text-hover"}
					?ellipsis=${true}
					.tooltip=${crumb?.title}
					>${crumb?.title}</f-text
				></f-div
			>
			${!this.isCurrentCrumb(index, array)
				? html`<f-icon
						source="i-chevron-right"
						size="x-small"
						state="secondary"
						class="system-icon-size"
				  ></f-icon>`
				: null}`;
	}

	/**
	 *
	 * @param action action whether to close or open popover
	 */
	togglePopover(action: "open" | "close") {
		this.popOverElement.open = action === "open" ? true : false;
		this.popOverElement.target = this.breadCrumbPopover;
	}

	/**
	 * dispatch click event
	 * @param e event
	 * @param value crumb value
	 */
	handleDispatchEvent(e: MouseEvent, value: FBreadCrumbsProp) {
		e.stopPropagation();
		const event = new CustomEvent("click", {
			detail: {
				value: value
			},
			bubbles: true,
			composed: true
		});
		this.popOverElement.open = false;
		this.dispatchEvent(event);
	}

	render() {
		this.createSeperateCrumbs();
		return html` <f-div gap="x-small" align="middle-left">
			${this.crumbs?.length <= 4
				? this.crumbs?.map((crumb, index) => this.crumbLoop(crumb, index, this.crumbs))
				: html`
						<f-div
							width="hug-content"
							align="middle-left"
							class="f-breadcrumb-content"
							@click=${(event: MouseEvent) => this.handleDispatchEvent(event, this.initialCrumbs)}
						>
							<f-text
								.size=${this.textSize}
								variant="para"
								weight="regular"
								class="f-breadcrumb-text-hover"
								.tooltip=${this.initialCrumbs?.title}
								?ellipsis=${true}
								>${this.initialCrumbs?.title}</f-text
							>
						</f-div>
						<f-icon
							source="i-chevron-right"
							size="x-small"
							state="secondary"
							class="system-icon-size"
						></f-icon>
						<f-div
							clickable
							@mouseenter=${() => this.togglePopover("open")}
							id="breadcrumb-popover"
						>
							<f-text class="toggle-popover-hover" variant="heading" state="secondary" size="small"
								>...</f-text
							>
						</f-div>
						<f-popover .overlay=${false} size="small">
							<f-div
								state="secondary"
								direction="column"
								@mouseleave=${() => this.togglePopover("close")}
							>
								${this.middlePopoverCrumbs?.map(
									(crumb, index) => html` <f-div
										class="popover-crumb-list"
										padding="medium"
										.border=${this.middlePopoverCrumbs.length - 1 === index
											? "none"
											: "small solid secondary bottom"}
										clickable
										@click=${(event: MouseEvent) => this.handleDispatchEvent(event, crumb)}
										><f-text
											class="popover-text-hover"
											variant="para"
											size="medium"
											weight="regular"
											>${crumb?.title}</f-text
										></f-div
									>`
								)}
							</f-div>
						</f-popover>
						<f-icon
							source="i-chevron-right"
							size="x-small"
							state="secondary"
							class="system-icon-size"
						></f-icon>
						${this.endingCrumbs?.map((crumb, index) =>
							this.crumbLoop(crumb, index, this.endingCrumbs)
						)}
				  `}
		</f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-breadcrumb": FBreadcrumb;
	}
}
