import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-breadcrumb.scss?inline";
import globalStyle from "./f-breadcrumb-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { FText } from "../f-text/f-text";
import { FPopover } from "../f-popover/f-popover";

import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-breadcrumb", globalStyle);

const variants = ["text", "icon"] as const;
const sizes = ["medium", "small"] as const;

export type FBreadCrumbsProp = { tabIndex: number; title: string; icon?: string };
export type FBreadcrumbs = FBreadCrumbsProp[];
export type FBreadcrumbSize = (typeof sizes)[number];
export type FBreadcrumbVariant = (typeof variants)[number];

@flowElement("f-breadcrumb")
export class FBreadcrumb extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FPopover.styles
	];

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: FBreadcrumbSize = "medium";

	/**
	 * @attribute variant defines the type of brundcrumbs.
	 */
	@property({ reflect: true, type: String })
	variant?: FBreadcrumbVariant = "text";

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

	get iconSize() {
		return this.size === "medium" ? "small" : "x-small";
	}

	get crumbSize() {
		return this.size === "medium" ? "32px" : "28px";
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
				?disabled=${this.disabled}
				role="listitem"
				@click=${(event: MouseEvent) => this.handleDispatchEvent(event, crumb)}
			>
				<f-text
					.size=${this.textSize}
					variant="para"
					.weight=${this.isCurrentCrumb(index, array) ? "medium" : "regular"}
					class=${this.isCurrentCrumb(index, array) ? "" : "f-breadcrumb-text-hover"}
					?ellipsis=${true}
					?disabled=${this.disabled}
					.tooltip=${crumb?.title}
					tabindex="0"
					role="link"
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
	toggleBreadcrumbPopover(action: "open" | "close") {
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
		if (this.variant === "text") {
			this.popOverElement.open = false;
		}
		this.dispatchEvent(event);
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "navigation";
		if (!this.getAttribute("aria-label")) this.setAttribute("aria-label", "Breadcrumb");
	}

	render() {
		this.createSeperateCrumbs();

		const textBreadcrumb = html` <f-div gap="x-small" role="list" align="middle-left">
			${this.crumbs?.length <= 4
				? this.crumbs?.map((crumb, index) => this.crumbLoop(crumb, index, this.crumbs))
				: html`
						<f-div
							width="hug-content"
							align="middle-left"
							class="f-breadcrumb-content"
							role="listitem"
							?disabled=${this.disabled}
							@click=${(event: MouseEvent) => this.handleDispatchEvent(event, this.initialCrumbs)}
						>
							<f-text
								tabindex="0"
								role="link"
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
							?disabled=${this.disabled}
							tabindex="0"
							@mouseenter=${() => this.toggleBreadcrumbPopover("open")}
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
								@mouseleave=${() => this.toggleBreadcrumbPopover("close")}
							>
								${this.middlePopoverCrumbs?.map(
									(crumb, index) =>
										html` <f-div
											tabindex="0"
											role="link"
											class="popover-crumb-list"
											role="listitem"
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

		const iconBreadcrumb = html`<f-div class="f-breadcrumbs" overflow="visible">
			${this.crumbs.map((item, index) =>
				index !== this.crumbs.length - 1
					? html`<f-div
							class="f-breadcrumb"
							state="secondary"
							width=${this.crumbSize}
							height=${this.crumbSize}
							padding="small"
							align="middle-center"
							variant="curved"
							tooltip=${item.title}
							clickable
							@click=${(event: MouseEvent) => this.handleDispatchEvent(event, item)}
					  >
							<f-icon source=${item.icon} .size=${this.iconSize}></f-icon>
					  </f-div>`
					: html`
							<f-div gap="large" align="middle-center">
								<div
									class="f-breadcrumb-primary"
									size=${this.size}
									@click=${(event: MouseEvent) => this.handleDispatchEvent(event, item)}
								>
									<f-icon
										source=${item.icon}
										.size=${this.iconSize}
										class="f-breadcrumb-primary-icon"
									></f-icon>
								</div>
								<f-text inline variant="para" .size=${this.textSize} weight="medium">
									${item.title}</f-text
								>
							</f-div>
					  `
			)}
		</f-div>`;
		return this.variant === "text" ? textBreadcrumb : iconBreadcrumb;
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
