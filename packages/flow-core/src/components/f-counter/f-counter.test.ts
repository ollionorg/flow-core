import { html, fixture, expect } from "@open-wc/testing";
import loadingSVG from "./../../mixins/svg/loader";

import "@cldcvr/flow-core";

import { FCounter } from "@cldcvr/flow-core";

describe("f-counter", () => {
  it("is defined", () => {
    const el = document.createElement("f-counter");
    expect(el).instanceOf(FCounter);
  });

  it("should render label in default slot", async () => {
    function computedLabel(label: number) {
      if (label < 10) {
        return `0${label}`;
      } else if (label >= 10 && label < 1000) {
        return label;
      } else if (label >= 1000 && label < 10000) {
        return abbrNum(label, 1);
      } else if (label >= 10000 && label < 1000000) {
        return abbrNum(label, 0);
      } else if (label >= 1000000 && label < 10000000) {
        return abbrNum(label, 1);
      } else {
        return abbrNum(label, 0);
      }
    }

    function abbrNum(number: number, decPlaces: number) {
      decPlaces = Math.pow(10, decPlaces);
      let fixedNumber = "";
      const abbrev = ["K", "M", "B", "T"];
      for (let i = abbrev.length - 1; i >= 0; i--) {
        const size = Math.pow(10, (i + 1) * 3);
        if (size <= number) {
          number = Math.round((number * decPlaces) / size) / decPlaces;
          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }
          fixedNumber = String(number);
          fixedNumber += abbrev[i];
          break;
        }
      }

      return fixedNumber;
    }
    const label = 8888;
    const el = await fixture(html` <f-counter label=${label}></f-counter> `);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    expect(descendant.textContent?.trim()).to.equal(computedLabel(label));
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-counter label="78"></f-counter> `);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    expect(descendant.getAttribute("size")).to.equal("medium");
    expect(descendant.getAttribute("state")).to.equal("neutral");
  });

  it("should render loader", async () => {
    const el = await fixture(html` <f-counter label="12" loading></f-counter>`);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    const loading = descendant.children[0];
    const svg = await fixture(loadingSVG);
    expect(loading.outerHTML).equal(svg.outerHTML);
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-counter></f-counter>`);
    } catch (e) {
      expect((e as Error).message).to.equal("f-counter : label is mandatory field");
    }
  });
});
