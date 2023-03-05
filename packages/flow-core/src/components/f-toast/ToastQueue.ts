import { FToast } from "./f-toast";

export default {
	_queue: [],
	_gap: 16,
	_topOffset: 16,
	_rightOffset: 16,
	add(toaster) {
		this._queue.push(toaster);
		this.notify();
	},
	notify() {
		let offsetHeight = 0;
		for (let t = this._queue.length - 1; t >= 0; t--) {
			const { height } = this._queue[t];
			this._queue[t].setPosition(`${offsetHeight + this._topOffset}px`, `${this._rightOffset}px`);
			offsetHeight += height + this._gap;
		}
	},
	remove(toaster, onRemoved) {
		toaster.setPosition(toaster.top, `${-toaster.width}px`);
		const idx = this._queue.findIndex(t => t.getAttribute("uid") === toaster.getAttribute("uid"));
		this._queue.splice(idx, 1);
		setTimeout(() => {
			onRemoved();
			// remove the element from the DOM
			toaster.parentNode?.removeChild(toaster);
			this.notify();
		}, 500);
	},
	setTopOffset(offset) {
		this._topOffset = offset;
	}
} as ToastQueue;

export type ToastQueue = {
	_queue: FToast[];
	_gap: number;
	_topOffset: number;
	_rightOffset: number;
	add: (toaster: FToast) => void;
	notify: () => void;
	remove: (toaster: FToast, onRemoved: () => void) => void;
	setTopOffset: (offset: number) => void;
};
