import { Meta } from "@storybook/web-components";

import Icon_Left_Template from "./f-button-icon-left.template";
import Icon_Right_Template from "./f-button-icon-right.template";
import Icon_Left_Right_Template from "./f-button-icon-left-right.template";
import Counter_Template from "./f-button-counter.template";
import StatesAndSizesTemplate from "./f-button-states-sizes.template";
import LoadingTemplate from "./f-button-loading.template";

export default {
  title: "f-button",
  component: "f-button",
} as Meta;

export const with_states_and_sizes = StatesAndSizesTemplate.bind({});

export const with_counter = Counter_Template.bind({});
export const with_icon_left = Icon_Left_Template.bind({});
export const with_icon_right = Icon_Right_Template.bind({});
export const with_icon_left_right = Icon_Left_Right_Template.bind({});
export const with_loading = LoadingTemplate.bind({});
