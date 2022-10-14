import { getThemeStyle } from "./../../utils";
import { Subject } from "rxjs";

/**
 * TODO :include font-family, icons
 */
export type FlowCoreConfig = {
  theme: "f-dark" | "f-light";
  iconPack: Record<string, string> | null;
};

export const themeSubject = new Subject<string>();

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
    const themeStyleElement = document.querySelector(
      `style[id^="flow-theme-${config.theme}"]`
    );
    if (!themeStyleElement) {
      const themeElement = initThemeTag();

      if (themeElement) {
        const themeCSS = getThemeStyle(
          `[flow-element][theme="${config.theme}"]`
        );

        if (themeCSS) {
          themeElement.appendChild(document.createTextNode(themeCSS));
          themeSubject.next(config.theme);
        } else {
          console.error(
            `Theme ${config.theme} CSS file/selector not found! \n Please check if css is imported 'import "@cldcvr/flow-core/dist/style.css"'`
          );
        }
      }
    }
  },
};
