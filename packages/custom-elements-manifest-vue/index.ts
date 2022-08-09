import { Declaration, Package, PropertyLike } from "custom-elements-manifest/schema";
import { vaidateOptions } from "./options";
import prettier from "prettier";

const options = vaidateOptions({});

export function transformSchema(schema: Package) {
	const components: string[] = [];

	schema.modules.forEach((module) => {
		module.declarations?.forEach((declaration) => {
			const component = getComponentCodeFromDeclaration(declaration);

			if (component) {
				components.push(component);
			}
		});
	});
	const allImports = getComponentPropTypeImports(schema);
	const output = prettier.format(
		`
        /* eslint-disable */
        import { VueConstructor } from "vue";
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

function getComponentCodeFromDeclaration(declaration: Declaration) {
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

//import { FComplexTypeProp, FComplexPriorityProp, FComplexAssignee, FComplexLanguageProp } from 'src/f-complex/f-complex';

function getComponentPropTypeImports(schema: Package): string[] {
	const builtInTypes = ["null", "undefined", "boolean", "|", "string", "number", "any", "{}", "unknown", "void"];
	const moduleTypeImports: string[] = [];
	schema.modules.forEach((module) => {
		const modulePath = "src"; //module.path.slice(0, -3);
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
					importStatement += `} from './${modulePath}';`;
					moduleTypeImports.push(importStatement);
				}
			}
		});
	});

	return moduleTypeImports;
}
