import { getThemeStyle } from "./../../utils";

/**
 * TODO :include font-family, icons
 */
export type FlowCoreConfig = {
  theme: "f-dark" | "f-light";
  iconPack: Record<string, string> | null;
};

let config: FlowCoreConfig = {
  theme: "f-dark",
  iconPack: null,
};

const initThemeTag = function () {
  let themeElement = document.querySelector(`style[id^="flow-theme-"]`);
  if (themeElement) {
    themeElement.remove();
  }
  const head = document.head || document.getElementsByTagName("head")[0];
  themeElement = document.createElement("style");

  head.appendChild(themeElement);

  themeElement.id = "flow-theme-" + config.theme;

  return themeElement;
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
    const themeElement = initThemeTag();

    if (themeElement) {
      const themeCSS = getThemeStyle(`[flow-element][theme="${config.theme}"]`);

      if (themeCSS) {
        themeElement.appendChild(document.createTextNode(themeCSS));
      } else {
        console.error(`Theme ${config.theme} CSS file/selector not fount!`);
      }
    }
  },
};
