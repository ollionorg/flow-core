declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "*.css" {
	const content: Record<string, string>;
	export default content;
}
declare module "*?worker" {
	export default FunctionConstructor<Worker>;
}
