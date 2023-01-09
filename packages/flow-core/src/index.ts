/// <reference types="vite/client" />

import { ConfigUtil } from "./modules/config";
import { version } from "./../package.json";

export * from "./modules/config";

export * from "./components/f-button/f-button";
export * from "./components/f-icon/f-icon";
export * from "./components/f-divider/f-divider";
export * from "./components/f-counter/f-counter";
export * from "./components/f-div/f-div";
export * from "./components/f-text/f-text";
export * from "./components/f-spacer/f-spacer";
export * from "./components/f-icon-button/f-icon-button";
export * from "./components/f-pictogram/f-pictogram";
export * from "./components/f-template/f-template";
export * from "./components/f-popover/f-popover";
export * from "./components/f-tag/f-tag";
export * from "./components/f-input/f-input";
export * from "./components/f-form-group/f-form-group";
export * from "./components/f-checkbox/f-checkbox";
export * from "./components/f-field/f-field";
export * from "./components/f-radio/f-radio";
export * from "./components/f-form/f-form";
export * from "./components/f-switch/f-switch";
export * from "./components/f-text-area/f-text-area";
export * from "./components/f-select/f-select";
export * from "./mixins/components/f-root/f-root";

if (document.readyState !== "loading") {
  ConfigUtil.initTheme();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    ConfigUtil.initTheme();
  });
}

document.addEventListener("keyup", (event: KeyboardEvent) => {
  event.preventDefault();

  if (event.key && event.key.toLowerCase() === "x" && event.shiftKey && event.ctrlKey) {
    // console.log("Changing theme");
    const currentTheme = ConfigUtil.getConfig().theme;

    ConfigUtil.setConfig({
      theme: currentTheme === "f-dark" ? "f-light" : "f-dark",
    });
  }
});

console.log(
  `%c@cldcvr/flow-core%cv${version}`,
  "background:#161616;color:white;padding:4px 6px 4px 6px;border-radius:4px 0px 0px 4px",
  "background:#695bf4;color:white;padding:4px 6px 4px 6px;border-radius:0px 4px 4px 0px;"
);
