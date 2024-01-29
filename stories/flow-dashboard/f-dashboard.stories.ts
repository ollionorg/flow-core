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

const iconsNames = [
	"p-azure",
	"p-google",
	"p-aws",
	"p-hadoop",
	"p-sonarcloud",
	"p-snowflake",
	"p-terraform",
	"p-discord"
];
const widgets: FDashboardWidget[] = [];
for (let index = 0; index < 10; index++) {
	if (index % 2 === 0) {
		widgets.push({
			type: "timeseries",
			data: {
				data: generateTimeseriesChartData(new Date())
			},
			id: faker.string.alpha(10),
			header() {
				const name = faker.company.name();
				const description = faker.lorem.sentences(3);
				return html`<f-div
					align="middle-left"
					height="hug-content"
					padding="medium"
					gap="medium"
					border="small solid subtle bottom"
				>
					<f-icon .source=${faker.helpers.arrayElement(iconsNames)} size="large"></f-icon>
					<f-div direction="column" align="middle-left">
						<f-text ellipsis .tooltip=${name} variant="heading" weight="medium">${name}</f-text>
						<f-text ellipsis .tooltip=${description} size="small">${description}</f-text>
					</f-div>
				</f-div>`;
			},
			footer: () => {
				const date = faker.date.recent({ refDate: new Date() });
				const state = faker.helpers.arrayElement(["danger", "success", "warning"]);
				return html`<f-div
					padding="medium"
					gap="auto"
					border="small solid subtle top"
					height="hug-content"
				>
					<f-div gap="small" align="middle-left">
						<f-icon source="i-clock-outline" size="small" .state=${state}></f-icon>
						<f-text .state=${state} size="small"
							>Last updated on ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</f-text
						>
					</f-div>
					<f-button label="view details" size="x-small" icon-right="i-new-tab"></f-button>
				</f-div>`;
			},
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
			header: {
				title: faker.company.name(),
				description: faker.lorem.sentences(3)
			},
			footer: `Powered by Flow`,
			placement: {
				w: faker.number.int({ min: 1.5, max: 3 }),
				h: faker.number.int({ min: 1.5, max: 2 })
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
