import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "templates/Top Nav",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <style>
      #main-navbar .not-responsive-icon-group {
        width: inherit;
      }
      @media (max-width: 768px) {
        #main-navbar .responsive-icon-group {
          width: inherit;
        }
        #main-navbar .not-responsive-icon-group {
          display: none;
        }
      }
      @media (min-width: 768px) {
        #main-navbar .responsive-icon-group {
          display: none;
        }
        #main-navbar .not-responsive-icon-group {
          width: inherit;
        }
      }
      @media (max-width: 992px) {
        #main-navbar .show-search-icon {
          width: inherit;
        }
      }
      @media (min-width: 992px) {
        #main-navbar .show-search-icon {
          display: none;
        }
      }
      @media (min-width: 600px) {
        #main-navbar .not-responsive-header {
          width: inherit;
        }
        #main-navbar .responsive-header {
          display: none;
        }
      }
      @media (max-width: 600px) {
        #main-navbar .not-responsive-header {
          display: none;
        }
        #main-navbar .responsive-header {
          width: inherit;
        }
      }
    </style>
    <f-template>
      <f-div
        align="middle-left"
        gap="small"
        border="small solid default bottom"
        padding="medium"
        variant="curved"
        state="default"
        id="main-navbar"
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
    <style>
      #action-button-navbar .not-responsive-icon-group {
        width: inherit;
      }
      @media (max-width: 768px) {
        #action-button-navbar .responsive-icon-group {
          width: inherit;
        }
        #action-button-navbar .not-responsive-icon-group {
          display: none;
        }
      }
      @media (min-width: 768px) {
        #action-button-navbar .responsive-icon-group {
          display: none;
        }
        #action-button-navbar .not-responsive-icon-group {
          width: inherit;
        }
      }
      @media (max-width: 992px) {
        #action-button-navbar .show-search-icon {
          width: inherit;
        }
      }
      @media (min-width: 992px) {
        #action-button-navbar .show-search-icon {
          display: none;
        }
      }
      @media (min-width: 600px) {
        #action-button-navbar .not-responsive-header {
          width: inherit;
        }
        #action-button-navbar .responsive-header {
          display: none;
        }
      }
      @media (max-width: 600px) {
        #action-button-navbar .not-responsive-header {
          display: none;
        }
        #action-button-navbar .responsive-header {
          width: inherit;
        }
      }
    </style>
    <f-template>
      <f-div
        align="middle-left"
        gap="small"
        border="small solid default bottom"
        padding="medium"
        variant="curved"
        state="default"
        id="action-button-navbar"
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
