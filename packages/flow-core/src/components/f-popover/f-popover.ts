/* eslint-disable no-mixed-spaces-and-tabs */
import { html, LitElement, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-popover.scss";
import {
	computePosition,
	autoPlacement,
	offset,
	shift,
	flip,
	autoUpdate,
	Placement
} from "@floating-ui/dom";
import { flowElement } from "./../../utils";

// export type FPopoverVariant = "relative" | "absolute";
export type FPopoverPlacement =
	| "top"
	| "top-start"
	| "top-end"
	| "right"
	| "right-start"
	| "right-end"
	| "bottom"
	| "bottom-start"
	| "bottom-end"
	| "left"
	| "left-start"
	| "left-end"
	| "auto";
export type FPopoverSize = "stretch" | "large" | "medium" | "small";

export type FPopOverOffset = {
	mainAxis: number;
	crossAxis?: number;
	alignmentAxis?: number;
};
@flowElement("f-popover")
export class FPopover extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	//   /**
	//    * @attribute variant defines the position of a popover. A popover can be either relative to the source or absolute to the viewport.

	//    */
	//   @property({ type: String, reflect: true })
	//   variant?: FPopoverVariant = "relative";

	/**
	 * @attribute In any placement, by default the popover is centrally aligned to the source and moves according to the space available.
	 */
	@property({ type: String, reflect: true })
	placement?: FPopoverPlacement = "auto";

	/**
	 * @attribute A popover can have different sizes depending on the use case from the range: small, medium, large, stretch.
	 */
	@property({ type: String, reflect: true })
	size?: FPopoverSize = "medium";

	/**
	 * @attribute is it open?
	 */
	@property({ type: Boolean, reflect: true })
	open?: boolean = false;

	/**
	 * @attribute display overlay?
	 */
	@property({ type: Boolean, reflect: true })
	overlay?: boolean = true;

	/**
	 * @attribute stretch the height to auto
	 */
	@property({ type: Boolean, reflect: true, attribute: "auto-height" })
	autoHeight?: boolean = false;

	/**
	 * @attribute conditional closing popover on escape key press
	 */
	@property({ type: Boolean, reflect: true, attribute: "close-on-escape" })
	closeOnEscape?: boolean = true;

	/**
	 * @attribute query selector of target
	 */
	@property({ type: [String, Object], reflect: true })
	target!: string | HTMLElement;

	@state()
	cleanup!: () => void;

	@state()
	isEscapeClicked = false;

	isTooltip = false;

	reqAniFrame?: number;

	offset: FPopOverOffset | null = null;

	get targetElement() {
		if (typeof this.target === "string") {
			return document.querySelector<HTMLElement>(this.target);
		} else {
			return this.target;
		}
	}
	stringToHTML(str: string) {
		const dom = document.createElement("div");
		dom.innerHTML = str;
		return dom;
	}
	computePlacement() {
		return this.placement === "auto" ? undefined : this.placement;
	}
	computePosition(isTooltip: boolean) {
		let target = document.body;
		if (this.targetElement && this.open) {
			if (!isTooltip) {
				this.targetElement.style.zIndex = "201";
			}
			target = this.targetElement;
		}
		if (this.open) {
			this.cleanup = autoUpdate(target, this, () => {
				computePosition(target, this, {
					placement: this.computePlacement(),
					strategy: "fixed",
					middleware: [
						offset(
							this.offset ?? {
								mainAxis: isTooltip ? 8 : 12,
								crossAxis: isTooltip ? 1 : 12,
								alignmentAxis: 12
							}
						),
						this.placement === "auto"
							? autoPlacement({ boundary: document.body })
							: flip({
									fallbackPlacements: [
										this.placement as Placement,
										"bottom-start",
										"bottom-end",
										"top-start",
										"top-end"
									],
									crossAxis: false,
									boundary: document.body
							  }),
						shift({ padding: isTooltip ? 0 : 16 })
					]
				}).then(({ x, y }) => {
					if (x < 0) {
						console.warn(
							"The popover is overflowing horizontally because of the large target element. Therefore, we are removing the z-index from the target to prevent any z-index-related issues."
						);
						target.style.removeProperty("z-index");
						x = 0;
					}
					if (y < 0) {
						console.warn(
							"The popover is overflowing vertically because of the large target element. Therefore, we are removing the z-index from the target to prevent any z-index-related issues."
						);
						target.style.removeProperty("z-index");
						y = 0;
					}
					if (target.nodeName.toLowerCase() !== "body") {
						Object.assign(this.style, {
							top: `${y}px`,
							left: `${x}px`
						});
					} else {
						const left = (document.body.offsetWidth - this.offsetWidth) / 2;
						const top = (document.body.offsetHeight - this.offsetHeight) / 2;

						Object.assign(this.style, {
							top: `${top}px`,
							left: `${left}px`
						});
					}

					this.querySelectorAll("f-popover").forEach(async pop => {
						(pop as LitElement).requestUpdate();
					});
				});
			});
		}
	}
	disconnectedCallback() {
		if (this.cleanup) {
			this.cleanup();
		}
		document.removeEventListener("keydown", e => this.escapekeyHandle(e, this));
		this.removeEventListener("click", this.dispatchEsc);
		super.disconnectedCallback();
		// clear request animation frame if any
		if (this.reqAniFrame) {
			cancelAnimationFrame(this.reqAniFrame);
		}
		if (this.targetElement) {
			this.targetElement.style.removeProperty("z-index");
		}
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("keydown", e => this.escapekeyHandle(e, this));
		this.addEventListener("click", this.dispatchEsc);
	}
	dispatchEsc() {
		if (this.isEscapeClicked && this.closeOnEscape) {
			const event = new CustomEvent("esc", {
				detail: {
					message: "Popover close on escape key"
				},
				bubbles: true,
				composed: true
			});
			this.isEscapeClicked = false;
			this.open = false;
			this.dispatchEvent(event);
		}
	}
	escapekeyHandle(e: KeyboardEvent, el: HTMLElement) {
		if (e.key === "Escape") {
			this.isEscapeClicked = true;
			el.click();
		}
	}
	overlayClick() {
		const event = new CustomEvent("overlay-click", {
			detail: {
				message: "Popover overlay clicked"
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	render() {
		this.classList.forEach(cl => {
			if (cl === "tooltip") {
				this.isTooltip = true;
			} else {
				this.isTooltip = false;
			}
		});
		if (this.open) {
			const overlay = this.overlay
				? html`<div class="f-overlay" data-qa-overlay @click=${this.overlayClick}></div>`
				: "";
			this.computePosition(this.isTooltip);
			return html`<slot></slot>${overlay} `;
		} else {
			if (this.targetElement) {
				this.targetElement.style.removeProperty("z-index");
			}
		}
		return ``;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		/**
		 * method that is executed before every repaint
		 */
		// clear request animation frame if any
		if (this.reqAniFrame) {
			cancelAnimationFrame(this.reqAniFrame);
		}
		this.reqAniFrame = requestAnimationFrame(() => {
			if (this.autoHeight && this.open) {
				const topPosition = Number(this.style.top.replace("px", "")) + 16;
				this.style.height = `calc(100vh - ${topPosition}px)`;
				this.style.maxHeight = `calc(100vh - ${topPosition}px)`;
			} else {
				this.style.removeProperty("height");
				this.style.removeProperty("max-height");
			}
		});
	}
}
