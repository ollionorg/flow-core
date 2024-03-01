import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FDashboard, FDashboardConfig, FDashboardWidget } from "@ollion/flow-dashboard";
import { faker } from "@faker-js/faker";
import { createRef, ref } from "lit/directives/ref.js";
import getFakeUsers from "../../utils/mock-users-data";
import field from "../../flow-form-builder/f-formbuilder-field";
import { LineageNodes, LineageNodeLinks, LineageNodeElement } from "@ollion/flow-lineage";
import { generateTimeseriesChartData } from "./../mock-data-utils";

export default {
	title: "@ollion/flow-dashboard/f-dashboard/Examples/html-templates",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<any>;

const nodeTemplate = function (node: LineageNodeElement) {
	return html`<f-pictogram source="${node.id}" variant="circle" clickable></f-text>`;
};

const getWidgets = () => {
	const nodes: LineageNodes = { n1: {}, n2: {}, n3: {}, n4: {}, n5: {}, n6: {}, n7: {} };
	const links: LineageNodeLinks = [
		{
			from: "n1",
			to: "n2"
		},
		{
			from: "n1",
			to: "n3"
		},
		{
			from: "n3",
			to: "n4"
		},
		{
			from: "n3",
			to: "n5"
		},
		{
			from: "n1",
			to: "n6"
		},
		{
			from: "n2",
			to: "n7"
		}
	];

	const widgets: FDashboardWidget[] = [];
	const startFrom = new Date();
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
	widgets.push({
		type: "html-template",
		id: faker.string.alpha(10),
		placement: {
			w: 4,
			h: 4
		},
		data: html`<f-div variant="curved" overflow="hidden">
			<f-lineage
			.nodeTemplate=${nodeTemplate}
			.nodes=${nodes}
			.links=${links}
			.node-size=${{
				width: 36,
				height: 36
			}}
			background="var(--color-surface-secondary)"
			>
			</f-lneage>
		</f-div>`
	});

	widgets.push({
		type: "html-template",
		id: faker.string.alpha(10),
		placement: {
			w: 4,
			h: 4
		},
		data: html`<f-div variant="curved" padding="medium" overflow="hidden">
			<f-form-builder .field=${field}> </f-form-builder>
		</f-div>`
	});

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
			w: 4,
			h: 4
		}
	});

	widgets.push({
		type: "timeseries",
		data: {
			data: generateTimeseriesChartData(startFrom)
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
			w: 12,
			h: 4
		}
	});

	widgets.push({
		type: "html-template",
		id: faker.string.alpha(10),
		placement: {
			w: 12,
			h: 4
		},
		data: html`<f-div variant="curved" overflow="hidden">
			<f-table-schema
				.stickyHeader=${true}
				.showSearchBar=${false}
				sticky-cell-background="secondary"
				variant="underlined"
				.data=${getFakeUsers(10, 6)}
			>
			</f-table-schema>
		</f-div>`
	});

	return widgets;
};
const Template = () => {
	const dashboardRef = createRef<FDashboard>();
	const dashboardConfig: FDashboardConfig = {
		widgets: getWidgets()
	};

	return html`<f-div height="100%" width="100%" gap="small" direction="column">
		<f-dashboard ${ref(dashboardRef)} .config=${dashboardConfig}> </f-dashboard>
	</f-div>`;
};

export const basic = Template.bind({});
