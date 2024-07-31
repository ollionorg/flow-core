import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-toast.scss?inline";
import globalStyle from "./f-toast-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import toastQueue from "./f-toast-queue";
import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-toast", globalStyle);

export type FToastState = "default" | "primary" | "success" | "warning" | "danger";

@flowElement("f-toast")
export class FToast extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles, ...FIcon.styles];

	/**
	 * @attribute Flow 2 provides two types of toast: auto-hide: toast disappears after the definite amount of time, and persist: toast remains on screen until the user interacts with it.
	 */
	@property({ reflect: true, type: String })
	type?: "auto-hide" | "persists" = "auto-hide";

	/**
	 * @attribute When type is auto-hide, duration property defines the time in milliseconds after which toast disappears. By default it is 5000 ms
	 */
	@property({ reflect: true, type: Number })
	duration?: number = 5000;

	/**
	 * @attribute States are used to communicate purpose and connotations. For example, a red color connotes danger, whereas a green color connotes success and so on.
	 */
	@property({ reflect: true, type: String })
	state?: FToastState = "default";

	/**
	 * @attribute Enables a ‘close’ icon-button on top left of the toast
	 */
	@property({ reflect: true, type: Boolean })
	["close-button"]?: boolean = true;

	mouseover = false;

	removeTimeout!: ReturnType<typeof setTimeout>;

	toasterRef: Ref<HTMLDivElement> = createRef();

	/**
	 * get current uid
	 */
	get uid() {
		return this.getAttribute("uid") ?? "";
	}

	/**
	 * generating uid for toast queue
	 * @param length length of uid
	 * @returns uid
	 */
	generateId() {
		const crypto = window.crypto || window.Crypto;
		const array = new Uint32Array(1);

		return `${crypto.getRandomValues(array)[0]}`;
	}

	/**
	 * remove the toast on click of remove icon
	 */
	remove() {
		toastQueue.remove(this, () => {
			this.dispatchOnRemove();
		});
	}

	/**
	 * checks for whether or not the toast auto-hides or persists
	 * @returns void
	 */
	autoRemoveConfig() {
		if (this.removeTimeout) {
			clearTimeout(this.removeTimeout);
		}
		if (this.type === "persists") {
			return;
		}
		this.removeTimeout = setTimeout(() => {
			if (!this.mouseover) {
				this.remove();
			} else {
				this.autoRemoveConfig();
			}
		}, this.duration);
	}

	/**
	 * set position of resepective toast
	 * @param top top position string in px
	 * @param right rigjt position string in px
	 */
	setPosition(top: string, right: string) {
		this.style.top = top;
		this.style.right = right;
		this.requestUpdate();
	}

	/**
	 * dispatch remove event
	 * @param e Event
	 */
	dispatchOnRemove() {
		/**
		 * @event remove
		 */
		const event = new CustomEvent("remove", {
			detail: {
				value: this.uid
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	/**
	 * add toast to queue
	 */
	addToastToQueue() {
		if (this.toasterRef.value) {
			this.setAttribute("uid", this.generateId());
			toastQueue.add(this);
			this.autoRemoveConfig();
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "alert";
		if (!this.getAttribute("aria-live")) {
			this.setAttribute("aria-live", "polite");
		}
	}

	/**
	 * Final render
	 * @returns html
	 */
	render() {
		// render empty string, since there no need of any child element
		return html` <div
			${ref(this.toasterRef)}
			class="f-toast"
			@mouseover=${() => {
				this.mouseover = true;
			}}
			@mouseleave=${() => {
				this.mouseover = false;
			}}
		>
			${this["close-button"]
				? html` <div class="f-toast-close" @click=${this.remove}>
						<f-icon source="i-close" size="x-small" clickable></f-icon>
				  </div>`
				: ""}
			${this.state !== "default"
				? html` <div class="f-toast-border" state=${this.state}></div>`
				: ""}
			<f-div
				direction="column"
				gap="medium"
				state="tertiary"
				width="100%"
				padding="large"
				variant="curved"
			>
				<slot></slot>
			</f-div>
		</div>`;
	}
	firstUpdated() {
		if (this.toasterRef.value) {
			/**
			 * method that is executed before every repaint
			 */
			requestAnimationFrame(() => {
				/**
				 * add toast to queue
				 */
				this.addToastToQueue();
			});
		}
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		if (changedProperties.has("type")) {
			this.autoRemoveConfig();
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-toast": FToast;
	}
}
