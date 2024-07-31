import { faker } from "@faker-js/faker";
import { html } from "lit";
import type {
	FTableSchemaData,
	FTableSchemaDataRow,
	FTableSchemaCell,
	FTableSchemaHeaderCell
} from "@nonfx/flow-table/src/components/f-table-schema/f-table-schema";

import { createRef } from "lit/directives/ref.js";
import { FPopover } from "@nonfx/flow-core";

export const popoverRef = createRef<FPopover>();

function getId() {
	return faker.string.alpha(10);
}
export default function getFakeUsers(rowCount = 100, columnCount = 8): FTableSchemaData {
	const users = [];

	for (let i = 0; i < rowCount; i++) {
		const firstName: FTableSchemaCell<string> = {
			value: faker.person.firstName(),
			align: "middle-left",
			template: function () {
				return html`<f-div gap="small" align="middle-left" width="100%" height="100%">
					<f-pictogram .source=${faker.internet.emoji()}></f-pictogram>
					<f-div direction="column" height="hug-content">
						<f-text>${this.value}</f-text>
						<f-text size="small" state="secondary">${faker.person.jobTitle()}</f-text>
					</f-div>
				</f-div>`;
			}
		};
		const lastName = {
			value: faker.person.lastName(),
			template: function () {
				return html`<f-div gap="x-small" align="middle-center" width="100%" height="100%"
					><f-text inline state="success">${this.value}</f-text></f-div
				>`;
			}
		};
		const email: FTableSchemaCell & { value: string } = {
			value: faker.internet.email(),
			template: function () {
				return html`<f-div gap="x-small"
					><f-icon state="warning" source="i-hashtag"></f-icon
					><f-text inline state="warning">${this.value}</f-text></f-div
				>`;
			},
			actions: [
				{
					icon: "i-chat",
					tooltip: "This is Tooltip",
					id: getId(),
					onClick(_event, element) {
						if (popoverRef.value) {
							popoverRef.value.open = true;
							if (element) popoverRef.value.target = element;
						}
					}
				},
				{
					icon: "i-mail",
					tooltip: "This is 2nd Tooltip",
					id: getId()
				},
				{
					icon: "i-star",
					tooltip: "This is 3rd Tooltip",
					id: getId()
				}
			]
		};
		const mobile = { value: faker.phone.number() };
		const sex = { value: faker.person.sex() };
		const age = { value: faker.number.int({ min: 18, max: 60 }) };
		const birthDate: FTableSchemaCell & { value: Date } = {
			value: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
			template: function () {
				return html`<f-div gap="small" width="hug-content">
					<f-icon source="i-date-time"></f-icon>
					<f-text inline
						>${this.value.getDate()}-${this.value.getMonth()}-${this.value.getFullYear()}</f-text
					></f-div
				>`;
			},
			toString: function () {
				return this.value.toString();
			}
		};

		const address = {
			value: `${faker.location.street()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()} ${faker.location.country()}`
		};

		const userRow: FTableSchemaDataRow = {
			id: getId(),
			disableSelection: i % 2 === 0,
			expandIconPosition: "right",
			data: { firstName, lastName, age, birthDate, email, mobile, sex, address },
			details: function () {
				return html`<f-div padding="large"
					><f-text state="danger">This is Details slot</f-text></f-div
				>`;
			}
		};
		users.push(userRow);
	}

	const header: Record<string, FTableSchemaHeaderCell> = {
		firstName: {
			value: "First name",
			sticky: true,
			template: function () {
				return html`<f-div height="100%" align="middle-left"
					><f-text state="success">${this.value}</f-text></f-div
				>`;
			}
		},
		lastName: { value: "Last name" },
		age: { value: "Age" },
		birthDate: { value: "Birth Date" },
		mobile: { value: "Mobile" },
		email: { value: "Email" },
		sex: { value: "Sex", disableSort: true },
		address: { value: "Address", width: "300px", selected: false, sticky: true }
	};

	return {
		header: Object.fromEntries(Object.entries(header).slice(0, columnCount)),
		rows: users
	};
}
