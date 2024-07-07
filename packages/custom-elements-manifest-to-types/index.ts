import {
	Declaration,
	Package,
	PropertyLike,
	MixinDeclaration
} from "custom-elements-manifest/schema";
import { UserOptions, validateOptions } from "./options";
import * as prettier from "prettier";

const camelToSnakeCase = (str: string) =>
	str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export async function transformSchema(
	schema: Package,
	framework: "vue2" | "react" | "vue3",
	modulePath?: string
) {
	const options = await validateOptions({});

	if (framework === "vue2") {
		return transformSchemaVue2(schema, options, modulePath);
	} else if (framework === "vue3") {
		return transformSchemaVue3(schema, options, modulePath);
	} else if (framework === "react") {
		return transformSchemaReact(schema, options, modulePath);
	}

	return null;
}

function transformSchemaReact(schema: Package, options: UserOptions, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach(module => {
		module.declarations?.forEach(declaration => {
			const component = getComponentCodeFromDeclarationReact(declaration);

			if (component) {
				components.push(component);
			}
		});
	});
	const allImports = getComponentPropTypeImports(schema, modulePath);
	const output = prettier.format(
		`
		${allImports.join("\n")}
declare global {
	namespace JSX {
	   interface IntrinsicElements {

                ${components.join("\n")}
            }
        }
	}
    `,
		{ ...options.prettierConfig, parser: "typescript" }
	);

	return output;
}
function transformSchemaVue2(schema: Package, options: UserOptions, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach(module => {
		module.declarations?.forEach(declaration => {
			const component = getComponentCodeFromDeclarationVue2(declaration);

			if (component) {
				components.push(component);
			}
		});
	});
	const allImports = getComponentPropTypeImports(schema, modulePath);
	const output = prettier.format(
		`
        /* eslint-disable */
        import type { VueConstructor } from "vue";
		${allImports.join("\n")}
        declare module "vue" {
            export interface GlobalComponents {
                ${components.join("\n")}
            }
        }
    `,
		{ ...options.prettierConfig, parser: "typescript" }
	);

	return output;
}
function transformSchemaVue3(schema: Package, options: UserOptions, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach(module => {
		module.declarations?.forEach(declaration => {
			const component = getComponentCodeFromDeclarationVue3(declaration as MixinDeclaration);

			if (component) {
				components.push(component);
			}
		});
	});
	const allImports = getComponentPropTypeImports(schema, modulePath);
	const output = prettier.format(
		`
        /* eslint-disable */
        import { DefineComponent } from "vue";
		${allImports.join("\n")}
		declare module "vue" {
			export interface GlobalComponents {
                ${components.join("\n")}
            }
        }
    `,
		{ ...options.prettierConfig, parser: "typescript" }
	);

	return output;
}
function getComponentCodeFromDeclarationReact(declaration: Declaration) {
	declaration = declaration as MixinDeclaration;
	if (!isSuperClassDeclaration(declaration)) {
		return null;
	}

	let componentDeclaration = `
        ["${camelToSnakeCase(declaration.name).substring(1)}"]:{
    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find(
			d => d.name === "required"
		) as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach(attribute => {
			componentDeclaration = `
                ${componentDeclaration}
                ${attribute.name.includes("-") ? attribute.fieldName : attribute.name}${
									requiredAttributes.includes(attribute.name) ? "" : "?"
								}: ${attribute.type?.text};
            `;
		});
	}
	componentDeclaration = `
                ${componentDeclaration}
				children?:any;["class"]?:string;`;
	componentDeclaration = `${componentDeclaration}
        }&React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;`;

	return componentDeclaration;
}
function getComponentCodeFromDeclarationVue3(declaration: MixinDeclaration) {
	if (!isSuperClassDeclaration(declaration)) {
		return null;
	}

	let componentDeclaration = `
        ["${camelToSnakeCase(declaration.name).substring(1)}"]: DefineComponent<
            {

    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find(
			d => d.name === "required"
		) as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach(attribute => {
			componentDeclaration = `
                ${componentDeclaration}
                ${attribute.name.includes("-") ? attribute.fieldName : attribute.name}${
									requiredAttributes.includes(attribute.name) ? "" : "?"
								}: ${attribute.type?.text};
            `;
		});
	}

	componentDeclaration = `${componentDeclaration}

 } >;`;

	return componentDeclaration;
}
function getComponentCodeFromDeclarationVue2(declaration: Declaration) {
	declaration = declaration as MixinDeclaration;
	if (!isSuperClassDeclaration(declaration)) {
		return null;
	}

	let componentDeclaration = `
        "${camelToSnakeCase(declaration.name).substring(1)}": VueConstructor<
            {
				$props: {
    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find(
			d => d.name === "required"
		) as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach(attribute => {
			componentDeclaration = `
                ${componentDeclaration}
                ${attribute.name.includes("-") ? attribute.fieldName : attribute.name}${
									requiredAttributes.includes(attribute.name) ? "" : "?"
								}: ${attribute.type?.text};
            `;
		});
	}

	componentDeclaration = `${componentDeclaration}
	};
        } & Vue
    >;`;

	return componentDeclaration;
}
function isSuperClassDeclaration(declaration: MixinDeclaration) {
	return (
		declaration.superclass &&
		["FRoot", "LitElement", "FInputBase"].includes(declaration.superclass.name)
	);
}

function getComponentPropTypeImports(schema: Package, modulePath?: string): string[] {
	const builtInTypes = [
		"null",
		"undefined",
		"boolean",
		"|",
		"string",
		"number",
		"any",
		"{}",
		"unknown",
		"void",
		"HTMLElement"
	];
	const moduleTypeImports: string[] = [];
	const extractedTypes: Set<string> = new Set();
	const moduleName = modulePath || "./src";
	schema.modules.forEach(module => {
		module.declarations?.forEach(declaration => {
			declaration = declaration as MixinDeclaration;

			if (!isSuperClassDeclaration(declaration)) {
				return;
			}

			if (declaration.attributes) {
				declaration.attributes.forEach(attribute => {
					if (attribute.type?.text) {
						const typesToImport: string[] = attribute.type.text.split(" ");
						typesToImport.forEach(t => {
							if (!builtInTypes.includes(t) && t.charAt(0) !== "'" && t.charAt(0) !== '"' && t) {
								extractedTypes.add(t);
							}
						});
					}
				});
			}
		});
	});

	if (extractedTypes.size > 0) {
		let importStatement = `import type { `;
		Array.from(extractedTypes).forEach((et, idx) => {
			importStatement += `${et}${idx < extractedTypes.size - 1 ? "," : ""}`;
		});
		importStatement += `} from '${moduleName}';`;
		moduleTypeImports.push(importStatement);
	}
	return moduleTypeImports;
}
