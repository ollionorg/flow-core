import { Subject } from "rxjs";

/**
 * TODO :include font-family, icons
 */
export type FlowCoreConfig = {
	theme: "f-dark" | "f-light" | string;
	iconPack: Record<string, string> | null;
};

export const themeSubject = new Subject<string>();

let config: FlowCoreConfig = {
	theme: "f-dark",
	iconPack: null
};

export const ConfigUtil = {
	getConfig() {
		return config;
	},
	setConfig(cfg: Partial<FlowCoreConfig>) {
		config = { ...config, ...cfg };
		if (cfg.theme) {
			this.initTheme();
		}
	},
	initTheme() {
		document.documentElement.setAttribute("data-theme", `${config.theme}`);
	}
};
