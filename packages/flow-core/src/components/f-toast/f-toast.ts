import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import eleStyle from "./f-toast.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import ToastQueue from "./ToastQueue.js";

export type FToastState = "default" | "secondary" | "subtle" | `custom, ${string}`;

@customElement("f-toast")
export class FToast extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute The solid variant is the default.
	 */
	@property({ reflect: true, type: String })
	variant?: "solid" | "dashed" | "dotted" = "solid";

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" = "medium";

	/**
	 * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	state?: FToastState = "default";

	mouseover = false;
	position = "fixed";

	get styleObj() {
		if (this.position === "relative") {
			return "transform: translateX(120%)";
		} else {
			return "top: 16px;right: 16px";
		}
	}

	get uid() {
		return this.id ? this.id : this.generateId();
	}

	generateId(length = 5) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	@state()
	autoRemove = false;

	height = 108;

	remove() {
		/**
			remove event
			 */
		// this.$emit("remove", this.uid);
		ToastQueue.remove(this, () => console.log("removed", this.uid));
	}

	autoRemoveConfig() {
		if (!this.autoRemove) {
			return;
		}

		setTimeout(() => {
			if (!this.mouseover) {
				this.remove();
			} else {
				this.autoRemoveConfig();
			}
		}, 5000);
	}

	toasterRef: Ref<HTMLDivElement> = createRef();

	top = "16px";
	width = 412;
	right = `-${this.width}px`;
	transform = "translateX(120%)";

	setPosition(top: string, right: string, transform = "translateX(0%)") {
		if (this.position === "relative") {
			this.transform = transform;
		} else {
			this.top = top;
			this.right = right;
			console.log(top, right);
		}
	}

	render() {
		// render empty string, since there no need of any child element
		return html` <div
			${ref(this.toasterRef)}
			class="flow-toaster"
			style=${this.styleObj}
			data-state=${this.state}
			data-position=${this.position}
			@mouseover=${() => {
				this.mouseover = true;
			}}
			@mouseleave=${() => {
				this.mouseover = false;
			}}
		>
			<div class="flow-close-toaster" @click=${this.remove}>
				<f-icon source="i-close" size="x-small" clickable></f-icon>
			</div>

			<slot></slot>
		</div>`;
	}
	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		console.log(_changedProperties);
		this.height = this.toasterRef.value?.scrollHeight;
		ToastQueue.add(this);
		this.autoRemoveConfig();
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
