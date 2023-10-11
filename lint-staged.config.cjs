// eslint-disable-next-line no-undef
module.exports = {
	"**/*.{ts?(x),js?(x)}": () => "pnpm tsc",
	"**/*.{js,ts,mjs,cjs,jsx,tsx}": "pnpm lint:files",
	"**/*.{js,ts,md,mdx,scss,json,mjs,cjs}": "pnpm prettier:lint"
};
