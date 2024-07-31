import { html, LitElement, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import globalStyle from "./f-popover-global.scss?inline";
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
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-popover", globalStyle);

export type FPopoverState =
	| "subtle"
	| "default"
	| "secondary"
	| "success"
	| "warning"
	| "danger"
	| "primary"
	| "transparent";

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
export type FPopoverSize =
	| "stretch"
	| "large"
	| "medium"
	| "small"
	| "hug-content"
	| FPopoverCustomSize;

export type FPopoverCustomWidth =
	| `${number}px`
	| `${number}%`
	| `${number}vw`
	| `auto`
	| `fit-content`;

export type FPopoverCustomHeight =
	| `${number}px`
	| `${number}%`
	| `${number}vh`
	| `auto`
	| `fit-content`;

export type FPopoverCustomSize = `custom(${FPopoverCustomWidth},${FPopoverCustomHeight})`;

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
	static styles = [unsafeCSS(globalStyle)];

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
	 * @attribute display box-shadow
	 */
	@property({ type: Boolean, reflect: true })
	shadow?: boolean = false;

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
	 * @attribute state property defines the background color of a f-div. It can take only surface colors defined in the library.
	 */
	@property({ reflect: true, type: String })
	state?: FPopoverState = "default";

	/**
	 * @attribute query selector of target
	 */
	@property({ type: [String, Object], reflect: true })
	target!: string | HTMLElement;

	@state()
	cleanup!: () => void;

	@state()
	isEscapeClicked = false;

	escapeHandler = (e: KeyboardEvent) => this.escapekeyHandle(e, this);

	isTooltip = false;

	overlayElement?: HTMLDivElement;

	reqAniFrame?: number;

	offset: FPopOverOffset | null = null;

	get targetElement() {
		if (typeof this.target === "string") {
			return document.querySelector<HTMLElement>(this.target);
		} else {
			return this.target;
		}
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
			if (this.size && this.size?.startsWith("custom")) {
				const regex = /custom\((.*?)\)/i;
				const matches = this.size.match(regex);
				if (matches) {
					const [width, height] = matches[1].split(",");
					this.classList.add("f-popover-custom-size");
					this.style.setProperty("--custom-width", width);
					this.style.setProperty("--custom-height", height);
				}
			}
			if (this.cleanup) {
				this.cleanup();
			}
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
				})
					.then(({ x, y }) => {
						if (x < 0) {
							target.style.removeProperty("z-index");
							x = 0;
						}
						if (y < 0) {
							target.style.removeProperty("z-index");
							y = 0;
						}
						if (target.nodeName.toLowerCase() !== "body") {
							Object.assign(this.style, {
								top: `${y}px`,
								left: `${x}px`
							});
						} else {
							Object.assign(this.style, this.getBodyTargetPlacementCords());
						}

						this.querySelectorAll("f-popover").forEach(pop => {
							(pop as LitElement).requestUpdate();
						});
					})
					.catch(_err => {});
			});
		}
	}

	getBodyTargetPlacementCords() {
		if (this.placement?.includes("top")) {
			let left: number | undefined = (document.body.offsetWidth - this.offsetWidth) / 2;
			const top = 0;
			let right = undefined;
			if (this.placement?.includes("start")) {
				left = 0;
				right = undefined;
			}
			if (this.placement?.includes("end")) {
				right = 0;
				left = undefined;
			}
			return {
				top: `${top}px`,
				left: left ? `${left}px` : left,
				right: right ? `${right}px` : right
			};
		} else if (this.placement?.includes("bottom")) {
			let left: number | undefined = (document.body.offsetWidth - this.offsetWidth) / 2;
			const bottom = 0;
			let right = undefined;
			if (this.placement?.includes("start")) {
				left = 0;
				right = undefined;
			}
			if (this.placement?.includes("end")) {
				right = 0;
				left = undefined;
			}
			return {
				bottom: `${bottom}px`,
				left: left ? `${left}px` : left,
				right: right ? `${right}px` : right
			};
		} else if (this.placement?.includes("right")) {
			let bottom: number | undefined = undefined;
			let top: number | undefined = (document.body.offsetHeight - this.offsetHeight) / 2;
			const right = 0;
			if (this.placement?.includes("start")) {
				top = 0;
				bottom = undefined;
			}
			if (this.placement?.includes("end")) {
				bottom = 0;
				top = undefined;
			}
			return {
				right: `${right}px`,
				bottom: bottom ? `${bottom}px` : bottom,
				top: top ? `${top}px` : top
			};
		} else if (this.placement?.includes("left")) {
			let bottom: number | undefined = undefined;
			let top: number | undefined = (document.body.offsetHeight - this.offsetHeight) / 2;
			const left = 0;
			if (this.placement?.includes("start")) {
				top = 0;
				bottom = undefined;
			}
			if (this.placement?.includes("end")) {
				bottom = 0;
				top = undefined;
			}
			return {
				left: `${left}px`,
				bottom: bottom ? `${bottom}px` : bottom,
				top: top ? `${top}px` : top
			};
		} else {
			const left = (document.body.offsetWidth - this.offsetWidth) / 2;
			const top = (document.body.offsetHeight - this.offsetHeight) / 2;

			return {
				top: `${top}px`,
				left: `${left}px`
			};
		}
	}
	disconnectedCallback() {
		if (this.cleanup) {
			this.cleanup();
		}
		document.removeEventListener("keydown", this.escapeHandler);
		this.removeEventListener("click", this.dispatchEsc);
		super.disconnectedCallback();
		// clear request animation frame if any
		if (this.reqAniFrame) {
			cancelAnimationFrame(this.reqAniFrame);
		}
		if (this.targetElement) {
			this.targetElement.style.removeProperty("z-index");
		}
		if (this.overlayElement) {
			this.overlayElement.remove();
			this.overlayElement = undefined;
		}
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("keydown", this.escapeHandler);
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

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);

		this.role = "dialog";

		if (!this.getAttribute("aria-label")) {
			this.setAttribute("aria-label", "Popover");
		}

		if (!this.targetElement?.getAttribute("aria-haspopup")) {
			this.targetElement?.setAttribute("aria-haspopup", "dialog");
		}
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
			if (!this.isTooltip) {
				if (!this.overlayElement) {
					this.overlayElement = document.createElement("div");
					this.overlayElement.classList.add("f-overlay");
					this.overlayElement.dataset.qaOverlay = "true";
					document.body.append(this.overlayElement);
					this.overlayElement.onclick = () => {
						this.overlayClick();
					};
				}

				if (!this.overlay) {
					this.overlayElement.dataset.transparent = "true";
				} else {
					delete this.overlayElement.dataset.transparent;
				}
			}
			this.computePosition(this.isTooltip);
			return html`<slot></slot>`;
		} else {
			if (this.targetElement) {
				this.targetElement.style.removeProperty("z-index");
			}
			if (this.overlayElement) {
				this.overlayElement.remove();
				this.overlayElement = undefined;
			}
			if (this.size && this.size?.includes("custom")) {
				this.classList.remove("f-popover-custom-size");
				this.style.setProperty("--custom-width", null);
				this.style.setProperty("--custom-height", null);
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
			if (!this.size?.includes("custom")) {
				if (this.autoHeight && this.open) {
					const topPosition = Number(this.style.top.replace("px", "")) + 16;
					this.style.height = `calc(100vh - ${topPosition}px)`;
					this.style.maxHeight = `calc(100vh - ${topPosition}px)`;
				} else if (changedProperties.has("autoHeight") && !this.autoHeight) {
					this.style.removeProperty("height");
					this.style.removeProperty("max-height");
				}
			}
		});
	}
}
