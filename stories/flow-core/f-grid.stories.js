import { html } from "lit-html";
import fGridAnatomy from "../svg/i-fgrid-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-grid",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [selectedCard, setSelectedCard] = useState(1);

		const data = [
			{
				id: 1,
				title: "AWS IoT Core",
				subTitle: "stream",
				icon: "aws-storage-S3"
			},
			{
				id: 2,
				title: "PostgresSQL",
				subTitle: "RDBMS",
				icon: "p-postgresql"
			},
			{
				id: 3,
				title: "Oracle",
				subTitle: "RDBMS",
				icon: "p-oracle"
			},
			{
				id: 4,
				title: "SQLServer",
				subTitle: "RDBMS",
				icon: "p-sql-server"
			},
			{
				id: 5,
				title: "MySQL",
				subTitle: "RDBMS",
				icon: "p-mysql"
			},
			{
				id: 6,
				title: "S3 Bucket",
				subTitle: "File",
				icon: "aws-storage-S3"
			},
			{
				id: 7,
				title: "GCS",
				subTitle: "File",
				icon: "gcp-storage-gcs"
			},
			{
				id: 8,
				title: "CSV",
				subTitle: "File",
				icon: "i-file-csv"
			},
			{
				id: 9,
				title: "Rest",
				subTitle: "API",
				icon: "aws-storage-S3"
			},
			{
				id: 10,
				title: "SFTP",
				subTitle: "SFTP",
				icon: "i-file-SFTP"
			}
		];

		const selectCard = id => {
			setSelectedCard(id);
		};

		return html` <f-div padding="small">
			<f-grid
				min-cell-width=${args["min-cell-width"]}
				max-cell-width=${args["max-cell-width"]}
				cell-height=${args["cell-height"]}
				.gap=${args.gap}
			>
				${data.map(
					item => html`
						<f-div
							.id=${item.id}
							state="secondary"
							variant="curved"
							padding="medium"
							gap="small"
							.selected=${item.id === selectedCard ? "background" : "none"}
							.clickable=${item.id === selectedCard ? false : true}
							@click=${() => selectCard(item.id)}
						>
							<f-icon .source=${item.icon} size="large"></f-icon>
							<f-div direction="column">
								<f-text variant="para" size="small" weight="medium">${item.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular" state="secondary"
									>${item.subTitle}</f-text
								>
							</f-div>
						</f-div>
					`
				)}
			</f-grid>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		["min-cell-width"]: {
			control: "number"
		},

		["max-cell-width"]: {
			control: "number"
		},

		["cell-height"]: {
			control: "number"
		},

		gap: {
			control: "select",
			options: ["x-large", "large", "medium", "small", "x-small"]
		}
	},

	args: {
		["min-cell-width"]: undefined,
		["max-cell-width"]: undefined,
		["cell-height"]: undefined,
		gap: "small"
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fGridAnatomy)}</div>`,
	name: "Anatomy"
};

export const MinCellWidth = {
	render: args => {
		const [selectedCard, setSelectedCard] = useState(1);

		const data = [
			{
				id: 1,
				title: "AWS IoT Core",
				subTitle: "stream",
				icon: "aws-storage-S3"
			},
			{
				id: 2,
				title: "PostgresSQL",
				subTitle: "RDBMS",
				icon: "p-postgresql"
			},
			{
				id: 3,
				title: "Oracle",
				subTitle: "RDBMS",
				icon: "p-oracle"
			},
			{
				id: 4,
				title: "SQLServer",
				subTitle: "RDBMS",
				icon: "p-sql-server"
			},
			{
				id: 5,
				title: "MySQL",
				subTitle: "RDBMS",
				icon: "p-mysql"
			},
			{
				id: 6,
				title: "S3 Bucket",
				subTitle: "File",
				icon: "aws-storage-S3"
			},
			{
				id: 7,
				title: "GCS",
				subTitle: "File",
				icon: "gcp-storage-gcs"
			},
			{
				id: 8,
				title: "CSV",
				subTitle: "File",
				icon: "i-file-csv"
			},
			{
				id: 9,
				title: "Rest",
				subTitle: "API",
				icon: "aws-storage-S3"
			},
			{
				id: 10,
				title: "SFTP",
				subTitle: "SFTP",
				icon: "i-file-SFTP"
			}
		];

		const selectCard = id => {
			setSelectedCard(id);
		};

		return html` <f-div width="100%" direction="column" padding="small">
			<f-div padding="small">
				<f-text>min-cell-width="150"</f-text>
			</f-div>
			<f-grid min-cell-width=${150}>
				${data.map(
					item => html`
						<f-div
							.id=${item.id}
							state="secondary"
							variant="curved"
							padding="medium"
							gap="small"
							.selected=${item.id === selectedCard ? "background" : "none"}
							.clickable=${item.id === selectedCard ? false : true}
							@click=${() => selectCard(item.id)}
						>
							<f-icon .source=${item.icon} size="large"></f-icon>
							<f-div direction="column">
								<f-text variant="para" size="small" weight="medium">${item.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular" state="secondary"
									>${item.subTitle}</f-text
								>
							</f-div>
						</f-div>
					`
				)}
			</f-grid>
		</f-div>`;
	},

	name: "min-cell-width"
};

export const MaxCellWidth = {
	render: args => {
		const [selectedCard, setSelectedCard] = useState(1);

		const data = [
			{
				id: 1,
				title: "AWS IoT Core",
				subTitle: "stream",
				icon: "aws-storage-S3"
			},
			{
				id: 2,
				title: "PostgresSQL",
				subTitle: "RDBMS",
				icon: "p-postgresql"
			},
			{
				id: 3,
				title: "Oracle",
				subTitle: "RDBMS",
				icon: "p-oracle"
			},
			{
				id: 4,
				title: "SQLServer",
				subTitle: "RDBMS",
				icon: "p-sql-server"
			},
			{
				id: 5,
				title: "MySQL",
				subTitle: "RDBMS",
				icon: "p-mysql"
			},
			{
				id: 6,
				title: "S3 Bucket",
				subTitle: "File",
				icon: "aws-storage-S3"
			},
			{
				id: 7,
				title: "GCS",
				subTitle: "File",
				icon: "gcp-storage-gcs"
			},
			{
				id: 8,
				title: "CSV",
				subTitle: "File",
				icon: "i-file-csv"
			},
			{
				id: 9,
				title: "Rest",
				subTitle: "API",
				icon: "aws-storage-S3"
			},
			{
				id: 10,
				title: "SFTP",
				subTitle: "SFTP",
				icon: "i-file-SFTP"
			}
		];

		const selectCard = id => {
			setSelectedCard(id);
		};

		return html` <f-div width="100%" direction="column" padding="small">
			<f-div padding="small">
				<f-text>max-cell-width="350"</f-text>
			</f-div>
			<f-grid max-cell-width=${350}>
				${data.map(
					item => html`
						<f-div
							.id=${item.id}
							state="secondary"
							variant="curved"
							padding="medium"
							gap="small"
							.selected=${item.id === selectedCard ? "background" : "none"}
							.clickable=${item.id === selectedCard ? false : true}
							@click=${() => selectCard(item.id)}
						>
							<f-icon .source=${item.icon} size="large"></f-icon>
							<f-div direction="column">
								<f-text variant="para" size="small" weight="medium">${item.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular" state="secondary"
									>${item.subTitle}</f-text
								>
							</f-div>
						</f-div>
					`
				)}
			</f-grid>
		</f-div>`;
	},

	name: "max-cell-width"
};

export const CellHeight = {
	render: args => {
		const [selectedCard, setSelectedCard] = useState(1);

		const data = [
			{
				id: 1,
				title: "AWS IoT Core",
				subTitle: "stream",
				icon: "aws-storage-S3"
			},
			{
				id: 2,
				title: "PostgresSQL",
				subTitle: "RDBMS",
				icon: "p-postgresql"
			},
			{
				id: 3,
				title: "Oracle",
				subTitle: "RDBMS",
				icon: "p-oracle"
			},
			{
				id: 4,
				title: "SQLServer",
				subTitle: "RDBMS",
				icon: "p-sql-server"
			},
			{
				id: 5,
				title: "MySQL",
				subTitle: "RDBMS",
				icon: "p-mysql"
			},
			{
				id: 6,
				title: "S3 Bucket",
				subTitle: "File",
				icon: "aws-storage-S3"
			},
			{
				id: 7,
				title: "GCS",
				subTitle: "File",
				icon: "gcp-storage-gcs"
			},
			{
				id: 8,
				title: "CSV",
				subTitle: "File",
				icon: "i-file-csv"
			},
			{
				id: 9,
				title: "Rest",
				subTitle: "API",
				icon: "aws-storage-S3"
			},
			{
				id: 10,
				title: "SFTP",
				subTitle: "SFTP",
				icon: "i-file-SFTP"
			}
		];

		const selectCard = id => {
			setSelectedCard(id);
		};

		return html` <f-div width="100%" direction="column" padding="small">
			<f-div padding="small">
				<f-text>cell-height="180"</f-text>
			</f-div>
			<f-grid cell-height="180">
				${data.map(
					item => html`
						<f-div
							.id=${item.id}
							state="secondary"
							variant="curved"
							padding="medium"
							gap="small"
							.selected=${item.id === selectedCard ? "background" : "none"}
							.clickable=${item.id === selectedCard ? false : true}
							@click=${() => selectCard(item.id)}
						>
							<f-icon .source=${item.icon} size="large"></f-icon>
							<f-div direction="column">
								<f-text variant="para" size="small" weight="medium">${item.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular" state="secondary"
									>${item.subTitle}</f-text
								>
							</f-div>
						</f-div>
					`
				)}
			</f-grid>
		</f-div>`;
	},

	name: "cell-height"
};

export const Gap = {
	render: args => {
		const [selectedCard, setSelectedCard] = useState(1);

		const data = [
			{
				id: 1,
				title: "AWS IoT Core",
				subTitle: "stream",
				icon: "aws-storage-S3"
			},
			{
				id: 2,
				title: "PostgresSQL",
				subTitle: "RDBMS",
				icon: "p-postgresql"
			},
			{
				id: 3,
				title: "Oracle",
				subTitle: "RDBMS",
				icon: "p-oracle"
			},
			{
				id: 4,
				title: "SQLServer",
				subTitle: "RDBMS",
				icon: "p-sql-server"
			},
			{
				id: 5,
				title: "MySQL",
				subTitle: "RDBMS",
				icon: "p-mysql"
			},
			{
				id: 6,
				title: "S3 Bucket",
				subTitle: "File",
				icon: "aws-storage-S3"
			},
			{
				id: 7,
				title: "GCS",
				subTitle: "File",
				icon: "gcp-storage-gcs"
			},
			{
				id: 8,
				title: "CSV",
				subTitle: "File",
				icon: "i-file-csv"
			},
			{
				id: 9,
				title: "Rest",
				subTitle: "API",
				icon: "aws-storage-S3"
			},
			{
				id: 10,
				title: "SFTP",
				subTitle: "SFTP",
				icon: "i-file-SFTP"
			}
		];

		const gaps = ["x-large", "large", "medium", "small", "x-small"];
		const [currentGap, setCurrentGap] = useState("large");

		const selectCard = id => {
			setSelectedCard(id);
		};

		return html` <f-div width="100%" direction="column" padding="small">
			<f-div padding="small" gap="small">
				${gaps.map(
					item =>
						html` <f-button
							.label=${item}
							@click=${() => setCurrentGap(item)}
							.disabled=${currentGap === item}
						></f-button>`
				)}
			</f-div>
			<f-grid .gap=${currentGap}>
				${data.map(
					item => html`
						<f-div
							.id=${item.id}
							state="secondary"
							variant="curved"
							padding="medium"
							gap="small"
							.selected=${item.id === selectedCard ? "background" : "none"}
							.clickable=${item.id === selectedCard ? false : true}
							@click=${() => selectCard(item.id)}
						>
							<f-icon .source=${item.icon} size="large"></f-icon>
							<f-div direction="column">
								<f-text variant="para" size="small" weight="medium">${item.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular" state="secondary"
									>${item.subTitle}</f-text
								>
							</f-div>
						</f-div>
					`
				)}
			</f-grid>
		</f-div>`;
	},

	name: "gap",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};
