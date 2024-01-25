import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FDashboardConfig, FDashboardWidget, FTimeseriesChartConfig } from "@ollion/flow-dashboard";
import { generateTimeseriesChartData } from "./mock-data-utils";
import { faker } from "@faker-js/faker";

export default {
	title: "@ollion/flow-dashboard/f-dashboard",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<any>;

const widgets: FDashboardWidget[] = [];
for (let index = 0; index < 10; index++) {
	if (index % 2 === 0) {
		widgets.push({
			type: "timeseries",
			data: {
				data: generateTimeseriesChartData(200, new Date(), 3)
			},
			id: faker.string.alpha(10),
			placement: {
				w: faker.number.int({ min: 4, max: 8 }),
				h: faker.number.int({ min: 3, max: 4 })
			}
		});
	} else {
		widgets.push({
			type: "big-number",
			data: faker.number.int({ min: 11, max: 999 }),
			dataType: "count",
			id: faker.string.alpha(10),
			placement: {
				w: faker.number.int({ min: 1, max: 3 }),
				h: faker.number.int({ min: 1, max: 2 })
			}
		});
	}
}

const Template = () => {
	const dashboardConfig: FDashboardConfig = {
		widgets
	};
	return html` <f-dashboard .config=${dashboardConfig}> </f-dashboard> `;
};

export const basic = Template.bind({});
