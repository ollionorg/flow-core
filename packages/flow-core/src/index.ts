/// <reference types="vite/client" />

import { ConfigUtil } from "./modules/config";

export * from "./../custom-elements.vue";
export * from "./modules/config";

export * from "./components/f-button/f-button";
export * from "./components/f-icon/f-icon";
export * from "./components/f-counter/f-counter";

document.addEventListener("DOMContentLoaded", ConfigUtil.initTheme);
