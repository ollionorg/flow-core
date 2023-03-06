import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-toast.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import toastQueue from "./f-toast-queue";
import { FDiv } from "../f-div/f-div";

export type FToastState = "default" | "primary" | "success" | "warning" | "danger";

@customElement("f-toast")
export class FToast extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

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

	/**
	 * id selector for toast-message f-div
	 */
	@query("#message-slot")
	messageSlot!: FDiv;

	/**
	 * id selector for toast-action f-div
	 */
	@query("#actions-slot")
	actionsSlot!: FDiv;

	/**
	 * @attribute assigned elements inside slot message
	 */
	@queryAssignedElements({ slot: "message" })
	_toastMessageNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot actions
	 */
	@queryAssignedElements({ slot: "actions" })
	_toastActionNodes!: NodeListOf<HTMLElement>;

	mouseover = false;

	toasterRef: Ref<HTMLDivElement> = createRef();

	/**
	 * has toast-message slot
	 */
	get hasToastMessage() {
		return this._toastMessageNodes.length > 0;
	}

	/**
	 * has toast-action slot
	 */
	get hasToastActions() {
		return this._toastActionNodes.length > 0;
	}

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
	generateId(length = 5) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
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
		if (this.type === "persists") {
			return;
		}
		setTimeout(() => {
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
	 * display toast message f-div
	 */
	displayToastMessage() {
		if (!this.hasToastMessage) {
			this.messageSlot.style.display = "none";
		} else {
			this.messageSlot.style.display = "";
		}
	}

	/**
	 * display toast action f-div
	 */
	displayToastActions() {
		if (!this.hasToastActions) {
			this.actionsSlot.style.display = "none";
		} else {
			this.actionsSlot.style.display = "";
		}
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
			<f-div
				direction="column"
				gap="medium"
				state="tertiary"
				width="100%"
				padding="large none"
				variant="curved"
			>
				<f-div
					.selected=${this.state !== "default" ? "notch-left" : "none"}
					padding="none large"
					id="message-slot"
					.state=${this.state}
					toast-data-state=${this.state}
				>
					<slot name="message"></slot>
				</f-div>
				<f-div padding="none large" id="actions-slot">
					<slot name="actions"></slot>
				</f-div>
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
	updated() {
		/**
		 * display toast message area
		 */
		this.displayToastMessage();

		/**
		 * display toast action area
		 */
		this.displayToastActions();
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
