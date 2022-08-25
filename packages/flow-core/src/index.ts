/// <reference types="vite/client" />

import { ConfigUtil } from "./modules/config";

export * from "./modules/config";

export * from "./components/f-button/f-button";
export * from "./components/f-icon/f-icon";
export * from "./components/f-divider/f-divider";
export * from "./components/f-counter/f-counter";
export * from "./components/f-div/f-div";
export * from "./components/f-text/f-text";
export * from "./components/f-icon-button/f-icon-button";

if (document.readyState !== "loading") {
  ConfigUtil.initTheme();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    ConfigUtil.initTheme();
  });
}

document.addEventListener("keyup", (event: KeyboardEvent) => {
  event.preventDefault();

  if (
    event.key &&
    event.key.toLowerCase() === "x" &&
    event.shiftKey &&
    event.ctrlKey
  ) {
    // console.log("Changing theme");
    const currentTheme = ConfigUtil.getConfig().theme;

    ConfigUtil.setConfig({
      theme: currentTheme === "f-dark" ? "f-light" : "f-dark",
    });
  }
});
