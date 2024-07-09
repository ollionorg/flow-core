class Step {
	private _context: CanvasRenderingContext2D;
	private _curve: number;
	private _line: number;
	private _x?: number;
	private _y?: number;
	private _point?: number;
	private _lastX?: number;
	private _lastY?: number;
	private _direction?: CurveDirection;

	constructor(context: CanvasRenderingContext2D, curve: number, direction?: CurveDirection) {
		this._context = context;
		this._curve = curve;
		this._line = NaN;
		this._direction = direction;
	}

	/**
	 * Initialize the area.
	 */
	areaStart() {
		this._line = 0;
	}

	/**
	 * End the area.
	 */
	areaEnd() {
		this._line = NaN;
	}

	/**
	 * Start a new line.
	 */
	lineStart() {
		this._x = this._y = NaN;
		this._point = 0;
	}

	/**
	 * End the current line.
	 */
	lineEnd() {
		if (this._x !== undefined && this._y !== undefined) {
			this._context.lineTo(this._x, this._y);
		}
	}

	/**
	 * Add a point to the line.
	 * @param x - The x-coordinate of the point.
	 * @param y - The y-coordinate of the point.
	 */
	point(x: number, y: number) {
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
				if (this._direction === "vertical") {
					this._context.lineTo(x, y - this._curve);
				} else if (this._direction === "vertical-reverse") {
					this._context.lineTo(x, y + this._curve);
				} else if (this._direction === "horizontal-reverse") {
					this._context.lineTo(x + this._curve, y);
				} else {
					this._context.lineTo(x - this._curve, y);
				}
				break;
			default: {
				if (
					this._lastX !== undefined &&
					this._lastY !== undefined &&
					(this._lastX !== x || this._lastY !== y)
				) {
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
				break;
			}
		}
		(this._x = x), (this._y = y);
	}
}

type CurveDirection = "horizontal" | "vertical" | "vertical-reverse" | "horizontal-reverse";

/**
 * A factory function that creates a curved step function.
 * @param angle - The angle for curves.
 * @returns A function to create curved steps.
 */
function curvedStep(angle: number, direction?: CurveDirection) {
	function createStep(context: CanvasRenderingContext2D) {
		return new Step(context, angle, direction);
	}

	/**
	 * Set a new angle for curves.
	 * @param angle - The new angle for curves.
	 * @returns A curved step function with the specified angle.
	 */
	createStep.angle = function (angle: number, direction?: CurveDirection) {
		return curvedStep(+angle, direction);
	};

	return createStep;
}

// Export the curvedStep function
export default curvedStep(12);
