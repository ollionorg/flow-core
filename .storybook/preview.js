import { html } from "lit-html";
import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";

import { ConfigUtil } from "@cldcvr/flow-core/src/modules/config";
import "@cldcvr/flow-core/src";
import { setCustomElementsManifest, setCustomElements } from "@storybook/web-components";
import "./storybook.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  themes: {
    default: "f-dark",
    clearable: false,
    list: [
      { name: "f-dark", color: "#000" },
      { name: "f-light", color: "#fff" },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Foundation",
        ["Introduction", "Design tokens"],
        ["Color", "Font", "Icon"],
        "Components",
      ],
    },
  },
};

export const decorators = [
  (story) => {
    window.onmessage = function (e) {
      if (e.data && typeof e.data === "string") {
        const message = JSON.parse(e.data);

        if (message.event.type === "storybook-addon-themes/change") {
          ConfigUtil.setConfig({ theme: message.event.args[0] });
        }
      }
    };
    ConfigUtil.setConfig({
      iconPack: {
        ...SystemIconPack,
        ...ProductIconPack,
        ...GcpIconPack,
        ...AwsIconPack,
      },
    });
    return html`
      <style>
        .sb-show-main.sb-main-padded {
          background-color: var(--color-surface-default);
          padding: 10px;
        }
        .sbdocs.sbdocs-wrapper {
          background-color: #131920;
        }
        .sbdocs-title {
          color: white;
        }
        .sbdocs-h2 {
          color: white;
        }
        .sbdocs-h3 {
          color: white;
        }

        .os-content {
          background-color: #131920;
          border-bottom: 1px solid var(--color-border-default);
        }
        .docs-story {
          background-color: #131920;
        }
        .sbdocs-preview {
          background-color: var(--color-border-default);
        }
        .docblock-code-toggle {
          background-color: #131920;
          color: var(--color-neutral-secondary);
          border: 0.5px solid var(--color-neutral-secondary);
          border-radius: 4px;
        }
        .docblock-argstable-head th {
          color: var(--color-text-default) !important;
        }
        .docblock-argstable-body td {
          background-color: #131920 !important;
          color: var(--color-text-secondary);
          font-size: 12px;
          font-weight: 400;
          border-bottom: 0.5px solid var(--color-neutral-secondary);
        }
        .docblock-argstable-body tr {
          border-top-width: 0.5px !important;
          border-top-style: solid !important;
          border-top-color: var(--color-neutral-secondary) !important;
        }
        .docblock-argstable-body {
          border: 0.5px solid var(--color-neutral-secondary);
          border-radius: 4px;
        }
        .docblock-argstable-body td div span {
          background-color: var(--color-neutral-default) !important;
          color: var(--color-surface-default) !important;
          border: none;
        }
        #root,
        #root-inner {
          height: 100%;
        }
        body {
          overflow: auto;
        }
      </style>
      <div
        style="background-color:var(--color-surface-default);color:var(--color-text-default);font-family:var(--flow-font);height:inherit;padding: 10px;"
      >
        ${story()}
      </div>
    `;
  },
];

async function run() {
  const customElements = await (
    await fetch(new URL("../packages/flow-core/custom-elements.json", import.meta.url))
  ).json();

  setCustomElementsManifest(customElements);
  setCustomElements(customElements);
}

run();
