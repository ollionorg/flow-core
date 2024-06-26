import { html } from "lit";

export default function backgroundSVG() {
	return html` <svg
		class="background-svg"
		style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;"
	>
		<pattern
			class="background-pattern"
			id="pattern-1undefined"
			x="0"
			y="0"
			width="24"
			height="24"
			patternUnits="userSpaceOnUse"
			patternTransform="translate(-0.5,-0.5)"
		>
			<circle cx="0.5" cy="0.5" r="1" fill="var(--color-border-subtle)"></circle>
		</pattern>
		<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1undefined)"></rect>
	</svg>`;
}
