import { faker } from "@faker-js/faker";
import { html } from "lit";
import type {
	FTableSchemaData,
	FTableSchemaDataRow,
	FTableSchemaCell,
	FTableSchemaHeaderCell
} from "./../../packages/flow-table/src/components/f-table-schema/f-table-schema";

export default function getFakeUsers(rowCount = 100, columnCount = 8): FTableSchemaData {
	const users = [];

	for (let i = 0; i < rowCount; i++) {
		const firstName = { value: faker.name.firstName() };
		const lastName = { value: faker.name.lastName() };
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
					id: faker.random.alpha(5)
				},
				{
					icon: "i-mail",
					tooltip: "This is 2nd Tooltip",
					id: faker.random.alpha(5)
				},
				{
					icon: "i-star",
					tooltip: "This is 3rd Tooltip",
					id: faker.random.alpha(5)
				}
			]
		};
		const mobile = { value: faker.phone.number() };
		const sex = { value: faker.name.sex() };
		const age = { value: faker.random.numeric(2) };
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
			value: `${faker.address.street()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()} ${faker.address.country()}`
		};

		const userRow: FTableSchemaDataRow = {
			id: faker.random.alpha(10),
			expandIconPosition: "left",
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
		address: { value: "Address", width: "300px", selected: true, sticky: true }
	};

	return {
		header: Object.fromEntries(Object.entries(header).slice(0, columnCount)),
		rows: users
	};
}
