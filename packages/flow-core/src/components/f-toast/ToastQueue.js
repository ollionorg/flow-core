export default {
	_queue: [],
	_gap: 16,
	_topOffset: 16,
	_rightOffset: 16,
	add(toaster) {
		console.log(toaster);
		this._queue.push(toaster);
		this.notify();
	},
	notify() {
		let offsetHeight = 0;
		for (let t = this._queue.length - 1; t >= 0; t--) {
			const { height } = this._queue[t];
			this._queue[t].setPosition(offsetHeight + this._topOffset, this._rightOffset);
			offsetHeight += height + this._gap;
		}
		// console.log(offsetHeight);
	},
	remove(toaster, onRemoved) {
		toaster.setPosition(toaster.top, -toaster.width, "translateX(120%)");
		const idx = this._queue.findIndex(t => t.uid === toaster.uid);
		this._queue.splice(idx, 1);

		setTimeout(() => {
			onRemoved();

			// destroy the vue listeners, etc
			// toaster.$destroy();

			// remove the element from the DOM
			// toaster.$el.parentNode?.removeChild(toaster.$el);
			this.notify();
		}, 500);
	},
	setTopOffset(offset) {
		this._topOffset = offset;
	}
};
