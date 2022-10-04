import { Declaration, Package, PropertyLike } from "custom-elements-manifest/schema";
import { vaidateOptions } from "./options";
import prettier from "prettier";

const options = vaidateOptions({});
export function transformSchema(schema: Package, framework: "vue2" | "react" | "vue3", modulePath?: string) {
	if (framework === "vue2") {
		return transformSchemaVue2(schema, modulePath);
	} else if (framework === "vue3") {
		return transformSchemaVue3(schema, modulePath);
	} else if (framework === "react") {
		return transformSchemaReact(schema, modulePath);
	}

	return null;
}

function transformSchemaReact(schema: Package, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach((module) => {
		module.declarations?.forEach((declaration) => {
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

	//console.log(output);

	return output;
}
function transformSchemaVue2(schema: Package, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach((module) => {
		module.declarations?.forEach((declaration) => {
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

	//console.log(output);

	return output;
}
function transformSchemaVue3(schema: Package, modulePath?: string) {
	const components: string[] = [];

	schema.modules.forEach((module) => {
		module.declarations?.forEach((declaration) => {
			const component = getComponentCodeFromDeclarationVue3(declaration);

			if (component) {
				components.push(component);
			}
		});
	});
	const allImports = getComponentPropTypeImports(schema, modulePath);
	const output = prettier.format(
		`
        /* eslint-disable */
        import { DefineComponent } from "@vue/runtime-core";
		${allImports.join("\n")}
		declare module "@vue/runtime-core" {
			export interface GlobalComponents {
                ${components.join("\n")}
            }
        }
    `,
		{ ...options.prettierConfig, parser: "typescript" }
	);

	//console.log(output);

	return output;
}
function getComponentCodeFromDeclarationReact(declaration: Declaration) {
	if (!("customElement" in declaration) || !declaration.customElement) {
		return null;
	}

	let componentDeclaration = `
        ["${declaration.tagName}"]:{
    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find((d) => d.name === "required") as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach((attribute) => {
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
				children?:any`;
	componentDeclaration = `${componentDeclaration}
        }&React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;`;

	return componentDeclaration;
}
function getComponentCodeFromDeclarationVue3(declaration: Declaration) {
	if (!("customElement" in declaration) || !declaration.customElement) {
		return null;
	}

	let componentDeclaration = `
        ["${declaration.tagName}"]: DefineComponent<
            {
				
    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find((d) => d.name === "required") as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach((attribute) => {
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
	if (!("customElement" in declaration) || !declaration.customElement) {
		return null;
	}

	let componentDeclaration = `
        "${declaration.tagName}": VueConstructor<
            {
				$props: {
    `;
	let requiredAttributes: string[] = [];
	if (declaration.members) {
		const requiredDeclaration = declaration.members.find((d) => d.name === "required") as PropertyLike;
		if (requiredDeclaration && requiredDeclaration.default) {
			requiredAttributes = JSON.parse(requiredDeclaration.default);
		}
	}
	if (declaration.attributes) {
		declaration.attributes.forEach((attribute) => {
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

function getComponentPropTypeImports(schema: Package, modulePath?: string): string[] {
	const builtInTypes = ["null", "undefined", "boolean", "|", "string", "number", "any", "{}", "unknown", "void"];
	const moduleTypeImports: string[] = [];
	schema.modules.forEach((module) => {
		const moduleName = modulePath || "./src"; //module.path.slice(0, -3);
		module.declarations?.forEach((declaration) => {
			if (!("customElement" in declaration) || !declaration.customElement) {
				return null;
			}

			if (declaration.attributes) {
				const extractedTypes: string[] = [];
				declaration.attributes.forEach((attribute) => {
					if (attribute.type?.text) {
						const typesToImport: string[] = attribute.type.text.split(" ");
						typesToImport.forEach((t) => {
							if (!builtInTypes.includes(t) && t.charAt(0) !== "'" && t.charAt(0) !== '"' && t) {
								extractedTypes.push(t);
							}
						});
					}
				});

				if (extractedTypes.length > 0) {
					let importStatement = `import type { `;
					extractedTypes.forEach((et, idx) => {
						importStatement += `${et}${idx < extractedTypes.length - 1 ? "," : ""}`;
					});
					importStatement += `} from '${moduleName}';`;
					moduleTypeImports.push(importStatement);
				}
			}
		});
	});

	return moduleTypeImports;
}
