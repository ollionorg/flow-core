import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import type { FDashboard, FDashboardConfig, FDashboardWidget } from "@ollion/flow-dashboard";
import { generateTimeseriesChartData } from "./mock-data-utils";
import { faker } from "@faker-js/faker";
import { createRef, ref } from "lit/directives/ref.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
	title: "@ollion/flow-dashboard/f-dashboard",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<any>;

const getWidgets = () => {
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
	const startFrom = new Date();
	for (let index = 0; index < 10; index++) {
		if (index % 2 === 0) {
			widgets.push({
				type: "timeseries",
				data: {
					data: generateTimeseriesChartData(startFrom)
				},
				id: faker.string.alpha(10),
				header: {
					title: faker.company.name(),
					description: faker.lorem.sentences(3)
				},
				footer: `Powered by Flow`,
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

	return widgets;
};
const Template = () => {
	const dashboardRef = createRef<FDashboard>();
	const imgRef = createRef<HTMLImageElement>();
	const dashboardConfig: FDashboardConfig = {
		widgets: getWidgets()
	};
	const randomize = () => {
		if (dashboardRef.value) {
			dashboardRef.value.config = {
				widgets: getWidgets()
			};
		}
	};

	/**
	 * Download file as image in pdf
	 *
	 *
	 */
	// const downloadFile = () => {
	// 	const element = document.querySelector("#dashboard-to-export") as FDashboard;

	// 	html2canvas(element, { scale: 1 }).then(function (canvas) {
	// 		// Initialize jsPDF
	// 		const pdf = new jsPDF({
	// 			orientation: "p",
	// 			unit: "px",
	// 			format: [element.scrollWidth, element.scrollHeight]
	// 		});
	// 		pdf.setDisplayMode("original");
	// 		//const dataURL = canvas.toDataURL("image/png", 1.0);
	// 		// Add canvas image to PDF
	// 		//imgRef.value!.src = dataURL;

	// 		pdf.addImage(canvas, "PNG", 0, 0, element.scrollWidth, element.scrollHeight);

	// 		// Save the PDF
	// 		pdf.save("canvas_to_pdf.pdf");
	// 	});
	// };

	const downloadFile = () => {
		// const allSVGS = document.querySelectorAll("svg");
		// console.log(allSVGS);
		// for (let i = 0; i < allSVGS.length; i++) {
		// 	console.log(allSVGS[i]);
		// 	html2canvas(allSVGS.item(i) as unknown as HTMLElement, { scale: 1 }).then(function (canvas) {
		// 		allSVGS[i].outerHTML = `<img src="${canvas.toDataURL()}"/>`;
		// 	});
		// }

		const element = document.querySelector("#dashboard-to-export") as FDashboard;
		const doc = new jsPDF({
			orientation: "p",
			unit: "px",
			format: [element.scrollWidth, element.scrollHeight]
		});

		doc.html(element, {
			html2canvas: {
				scale: 1,
				async: true,
				svgRendering: true
			},
			callback: function (doc) {
				doc.save("sample-document.pdf");
			},
			width: element.scrollWidth,
			windowWidth: 2400
		});
	};

	return html`<f-div width="100%" gap="small" overflow="scroll" direction="column">
		<img ${ref(imgRef)} />

		<f-div
			variant="curved"
			state="primary"
			height="hug-content"
			padding="medium"
			gap="auto"
			align="middle-left"
		>
			<f-text state="inherit">Click on export button to generate pdf</f-text>
			<f-button @click=${downloadFile} label="export"></f-button>
		</f-div>

		<f-dashboard
			style="background:var(--color-surface-default)"
			id="dashboard-to-export"
			${ref(dashboardRef)}
			.config=${dashboardConfig}
		>
		</f-dashboard>
	</f-div>`;
};

export const basic = Template.bind({});
