import * as prettier from "prettier";

export async function validateOptions(options?: UserOptions): Promise<ProtoGenOptions> {
	if (!options) {
		throw new Error("Options must be provided");
	}

	if (!options.cwd) {
		options.cwd = process.cwd();
	}

	if (!options.prettierConfig) {
		options.prettierConfig = (await prettier.resolveConfig(options.cwd)) ?? {
			printWidth: 100,
			singleQuote: true,
			tabWidth: 4
		};
	}

	if (!("repeatedFieldIsRequired" in options)) {
		options.repeatedFieldIsRequired = false;
	}

	return options as ProtoGenOptions;
}

export type ProtoGenOptions = Required<UserOptions>;

export type UserOptions = {
	ignoreFiles?: string[];
	cwd?: string;
	repeatedFieldIsRequired?: boolean;
	prettierConfig?: prettier.Options;
};
