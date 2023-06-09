import { faker } from "@faker-js/faker";
import { html } from "lit";
import type {
	FTableSchemaData,
	FTableSchemaDataRow,
	FTableSchemaCell
} from "./../../packages/flow-table/src/components/f-table-schema/f-table-schema";

export default function getFakeUsers(count = 100): FTableSchemaData {
	const users = [];

	for (let i = 0; i < count; i++) {
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
					icon: "i-chat"
				},
				{
					icon: "i-mail"
				},
				{
					icon: "i-star"
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
			data: { firstName, lastName, age, birthDate, email, mobile, sex, address },
			selected: true,
			details: function () {
				return html`<f-div padding="large"
					><f-text state="danger">This is Details slot</f-text></f-div
				>`;
			}
		};
		users.push(userRow);
	}

	return {
		header: {
			firstName: { value: "First name", sticky: true },
			lastName: { value: "Last name" },
			age: { value: "Age" },
			birthDate: { value: "Birth Date" },
			email: { value: "Email" },
			mobile: { value: "Mobile" },
			sex: { value: "Sex" },
			address: { value: "Address", width: "300px", selected: true, sticky: true }
		},
		rows: users
	};
}
