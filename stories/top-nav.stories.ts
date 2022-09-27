import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "templates/Top Nav",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-template>
      <f-div
        align="middle-left"
        gap="small"
        border="small solid default bottom"
        padding="medium"
        variant="curved"
        state="default"
      >
        <f-div align="middle-left" gap="small" width="hug-content">
          <f-icon source="i-hamburger" size="large" class="responsive-header"></f-icon>
          <f-icon source="p-cloudcover-dark" size="large"></f-icon>
        </f-div>
        <f-div align="middle-left" gap="small" width="hug-content" class="not-responsive-header">
          <f-icon source="i-arrow-left" size="small"></f-icon>
          <f-text variant="heading" size="x-small" weight="regular"
            >Home / Project / Environment / Application / Logs
          </f-text>
        </f-div>
        <f-spacer size="fill-container"></f-spacer>
        <f-div align="middle-left" gap="medium" width="hug-content">
          <f-icon-button
            icon="i-search"
            size="small"
            variant="round"
            type="fill"
            state="neutral"
            class="show-search-icon"
          ></f-icon-button>
          <f-div padding="none" gap="small" class="not-responsive-icon-group">
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
          </f-div>
          <f-icon-button
            icon="i-user"
            size="small"
            variant="round"
            type="fill"
            state="neutral"
          ></f-icon-button>
          <f-icon
            source="i-more"
            size="medium"
            state="secondary"
            class="responsive-icon-group"
          ></f-icon>
        </f-div>
      </f-div>
    </f-template>
  `;
};

export const TopNav = Template.bind({});

const ActionButtonGroupTemplate: Story<unknown> = () => {
  return html`
    <f-template>
      <f-div
        align="middle-left"
        gap="small"
        border="small solid default bottom"
        padding="medium"
        variant="curved"
        state="default"
      >
        <f-div align="middle-left" gap="small" width="hug-content">
          <f-icon source="i-hamburger" size="large" class="responsive-header"></f-icon>
          <f-icon source="p-cloudcover-dark" size="large"></f-icon>
        </f-div>
        <f-div align="middle-left" gap="small" width="hug-content" class="not-responsive-header">
          <f-button label="LABEL" size="small" category="transparent" state="neutral"></f-button>
          <f-button label="LABEL" size="small" category="transparent" state="neutral"></f-button>
          <f-button label="LABEL" size="small" category="transparent" state="neutral"></f-button>
          <f-button label="LABEL" size="small" category="transparent" state="neutral"></f-button>
        </f-div>
        <f-spacer size="fill-container"></f-spacer>
        <f-div align="middle-left" gap="medium" width="hug-content">
          <f-icon-button
            icon="i-search"
            size="small"
            variant="round"
            type="fill"
            state="neutral"
            class="show-search-icon"
          ></f-icon-button>
          <f-div padding="none" gap="small" class="not-responsive-icon-group">
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
            <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
          </f-div>
          <f-icon-button
            icon="i-user"
            size="small"
            variant="round"
            type="fill"
            state="neutral"
          ></f-icon-button>
          <f-icon
            source="i-more"
            size="medium"
            state="secondary"
            class="responsive-icon-group"
          ></f-icon>
        </f-div>
      </f-div>
    </f-template>
  `;
};

export const ActionButtonGroup = ActionButtonGroupTemplate.bind({});
