import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@cldcvr/flow-core";

import { FTag, FIcon, ConfigUtil, FCounter } from "@cldcvr/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-tag", () => {
  it("is defined", () => {
    const el = document.createElement("f-tag");
    expect(el).instanceOf(FTag);
  });
  it("should render label in default slot", async () => {
    const el = await fixture(html` <f-tag label="abc" state="neutral"></f-tag> `);
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    expect(descendant.textContent?.trim()).to.equal("abc");
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-tag state="neutral"></f-tag>`);
    } catch (e) {
      expect((e as Error).message).to.equal("f-tag : label OR icon-left is mandatory field");
    }
  });
  it("should render neutral state", async () => {
    const el = await fixture(html` <f-tag label="abc" state="neutral"></f-tag> `);
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    expect(descendant.getAttribute("state")).to.equal("neutral");
  });
  it("should render with custom fill prop", async () => {
    const el = await fixture(html` <f-tag label="abc" fill="#fff"></f-tag> `);
    expect(el.getAttribute("fill")).to.equal("#fff");
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-tag label="label" fill="greyyy"></f-tag>`);
    } catch (e) {
      expect((e as Error).message).to.equal("f-tag : enter correct color-name or color-code");
    }
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-tag label="label"></f-tag>`);
    } catch (e) {
      expect((e as Error).message).to.equal("f-tag : state OR fill prop is mandatory field");
    }
  });
  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-tag label="abc" state="neutral"></f-tag> `);
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    expect(descendant.getAttribute("size")).to.equal("medium");
  });
  it("should render icon left", async () => {
    const el = await fixture(
      html` <f-tag label="abc" state="neutral" icon-left="i-plus"></f-tag> `
    );
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    const icon = descendant.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render icon right", async () => {
    const el = await fixture(
      html` <f-tag label="abc" state="neutral" icon-right="i-plus"></f-tag> `
    );
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    const icon = descendant.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render counter", async () => {
    const el = await fixture(html` <f-tag label="abc" state="neutral" counter="88"></f-tag> `);
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    const counter = descendant.children[descendant.children.length - 1];
    expect(counter).instanceOf(FCounter);
    const descCounter = counter.shadowRoot!.querySelector(".f-counter")!;
    expect(descCounter.textContent?.trim()).equal("88");
  });
  it("should render loader", async () => {
    const el = await fixture(html` <f-tag label="abc" state="neutral" loading></f-tag> `);
    const descendant = el.shadowRoot!.querySelector(".f-tag")!;
    const loading = descendant.children[0];
    const svg = await fixture(loadingSVG);
    expect(loading.outerHTML).equal(svg.outerHTML);
  });
});
