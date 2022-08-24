import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-spacer",
  component: "f-spacer",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-spacer size="150px"></f-spacer>
    <f-div width="100%" gap="small" direction="column" padding="small">
      <f-text variant="heading" weight="bold" size="small"> x-large f-spacer</f-text>
      <f-div padding="small" state="secondary">
        <f-text variant="para" weight="medium" size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
          eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
          fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
          Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
          Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
          lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
        >
      </f-div>
      <f-spacer size="x-large"></f-spacer>
      <f-div padding="small" state="secondary">
        <f-text variant="para" weight="medium" size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
          eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
          fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
          Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
          Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
          lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
        >
      </f-div>
    </f-div>
  `;
};

const ColumnSpacerTemplate: Story<unknown> = () => {
  return html`
    <f-div width="100%" gap="small" direction="column" padding="small">
      <f-div padding="small" state="secondary" gap="auto">
        <f-div width="30%" padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
        <f-div width="30%" padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
        <f-div width="30%" padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
      </f-div>
      <f-spacer size="150px"></f-spacer>
      <f-div padding="small" state="secondary">
        <f-div padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
            eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
            fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
            Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
            Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
            lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
          >
        </f-div>
      </f-div>
    </f-div>
  `;
};

const RowSpacerTemplate: Story<unknown> = () => {
  return html`
    <f-div direction="row" padding="small" height="100%" gap="none">
      <f-div padding="small" state="secondary" gap="large" direction="column" width="20%">
        <f-div padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
        <f-div padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
        <f-div padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f-text
          ></f-div
        >
      </f-div>
      <f-spacer size="400px"></f-spacer>
      <f-div padding="small" state="secondary" width="30%">
        <f-div padding="small" border="small solid default around">
          <f-text variant="para" weight="medium" size="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
            eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
            fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
            Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
            Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
            lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
          >
        </f-div>
      </f-div>
    </f-div>
  `;
};

const SpacerFillContainerTemplate: Story<unknown> = () => {
  return html`
    <f-div width="100%" gap="small" direction="column" padding="small" height="100%">
      <f-div
        width="100%"
        border="small solid default around"
        padding="small"
        height="fill-container"
      >
        <f-text variant="para" weight="medium" size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
          eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
          fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
          Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
          Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
          lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
        >
      </f-div>
      <f-spacer size="fill-container"></f-spacer>
      <f-div
        width="100%"
        border="small solid default around"
        padding="small"
        height="fill-container"
      >
        <f-text variant="para" weight="medium" size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada fringilla
          eleifend. Sed pulvinar neque eu nisl tristique bibendum. Morbi non facilisis neque. Ut
          fermentum ligula vitae commodo volutpat. Vivamus vestibulum vitae metus vel venenatis.
          Phasellus ut nunc nunc. Cras rutrum tellus ligula, vel accumsan lectus luctus vel.
          Vestibulum vel nisi tellus. Donec dictum nisi at semper ultrices. Sed sit amet fringilla
          lorem, non semper quam. Pellentesque finibus convallis mauris ac tempor.</f-text
        >
      </f-div>
    </f-div>
  `;
};

export const basic = Template.bind({});
export const ColumnSpacer = ColumnSpacerTemplate.bind({});
export const RowSpacer = RowSpacerTemplate.bind({});
export const SpacerFillContainer = SpacerFillContainerTemplate.bind({});
