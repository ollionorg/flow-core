import { BehaviorSubject, Subject } from "rxjs";

/**
 * TODO :include font-family, icons
 */
export type FlowCoreConfig = {
	theme: "f-dark" | "f-light" | string;
	iconPack: Record<string, string> | null;
};

export const themeSubject = new Subject<string>();

export const configSubject = new BehaviorSubject<FlowCoreConfig>({
	theme: "f-dark",
	iconPack: null
});

export const ConfigUtil = {
	getConfig() {
		return configSubject.value;
	},
	setConfig(cfg: Partial<FlowCoreConfig>) {
		configSubject.next({ ...configSubject.value, ...cfg });
		if (cfg.theme) {
			this.initTheme();
		}
	},
	initTheme() {
		document.documentElement.setAttribute("data-theme", `${configSubject.value.theme}`);
	}
};

const cssSet = new Set<string>();

export function injectCss(css: string) {
	if (cssSet.has(css)) {
		return;
	}

	const style = document.createElement("style");
	style.innerHTML = css;
	document.head.appendChild(style);
}
