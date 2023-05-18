import { faker } from "@faker-js/faker";
import { html } from "lit";
import type { FTableSchemaData } from "./../../packages/flow-table/src/components/f-table-schema/f-table-schema";

export default function getFakeUsers(): FTableSchemaData {
	const users = [];

	// Generate 1000 mock user records
	for (let i = 0; i < 100; i++) {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const email = faker.internet.email();
		const mobile = faker.phone.number();
		const sex = faker.name.sex();
		const age = faker.random.numeric(2);
		const birthDate = {
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

		const address = `${faker.address.street()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()} ${faker.address.country()}`;

		users.push({ data: { firstName, lastName, age, birthDate, email, mobile, sex, address } });
	}

	return {
		header: {
			firstName: "First name",
			lastName: "Last name",
			age: "Age",
			birthDate: "Birth Date",
			email: "Email",
			mobile: "Mobile",
			sex: "Sex",
			address: { value: "Address", width: "300px" }
		},
		rows: users
	};
}
