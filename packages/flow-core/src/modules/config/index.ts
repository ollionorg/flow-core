import { Subject } from "rxjs";
import { getThemeStyle } from "./../../utils";

/**
 * TODO :include font-family, icons
 */
export type FlowCoreConfig = {
  theme: "f-dark" | "f-light";
  iconPack: string;
};

let config: FlowCoreConfig = {
  theme: "f-dark",
  iconPack: "@cldcvr/flow-icon-free",
};

export const CONFIG_SUBJECT = new Subject<FlowCoreConfig>();

export const ConfigUtil = {
  getConfig() {
    return config;
  },
  setConfig(cfg: Partial<FlowCoreConfig>) {
    config = { ...config, ...cfg };
    CONFIG_SUBJECT.next(config);
  },
  getThemeStyles() {
    return getThemeStyle(`[flow-element][theme="${config.theme}"]`);
  },
};
