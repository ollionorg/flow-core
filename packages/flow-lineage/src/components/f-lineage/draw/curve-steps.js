class Step {
	constructor(context, curve) {
		this._context = context;
		this._curve = curve;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._x = this._y = NaN;
		this._point = 0;
	}
	lineEnd() {
		this._context.lineTo(this._x, this._y);
	}
	point(x, y) {
		(x = +x), (y = +y);
		switch (this._point) {
			case 0:
				this._point = 1;
				this._context.moveTo(x, y);
				break;
			case 1:
				this._point = 2;
				this._lastX = x;
				this._lastY = y;
				this._context.lineTo(x - this._curve, y);
				break;
			default: {
				if (this._lastX !== x || this._lastY !== y) {
					let nextY = y;
					let nextX = x;
					if (y < this._lastY && this._lastX === x) {
						nextY = this._lastY - this._curve;
						this._context.arcTo(this._lastX, this._lastY, this._lastX, nextY, this._curve);

						this._context.lineTo(x, y + this._curve);
					} else if (y > this._lastY && this._lastX === x) {
						nextY = this._lastY + this._curve;

						this._context.arcTo(this._lastX, this._lastY, this._lastX, nextY, this._curve);

						this._context.lineTo(x, y - this._curve);
					} else if (x > this._lastX && this._lastY === y) {
						nextX = this._lastX + this._curve;
						this._context.arcTo(this._lastX, this._lastY, nextX, this._lastY, this._curve);

						this._context.lineTo(x - this._curve, y);
					} else if (x < this._lastX && this._lastY === y) {
						nextX = this._lastX - this._curve;
						this._context.arcTo(this._lastX, this._lastY, nextX, this._lastY, this._curve);

						this._context.lineTo(x + this._curve, y);
					} else {
						this._context.lineTo(x, y);
					}
				} else {
					this._context.lineTo(x, y);
				}
				this._lastX = x;
				this._lastY = y;
				//this._curve += 4;
				break;
			}
		}
		(this._x = x), (this._y = y);
	}
}

export default (function custom(angle) {
	function curvedStep(context) {
		return new Step(context, angle);
	}

	curvedStep.angle = function (angle) {
		return custom(+angle);
	};

	return curvedStep;
})(12);
