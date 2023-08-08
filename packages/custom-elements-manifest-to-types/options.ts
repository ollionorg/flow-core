import prettier from 'prettier';

export function vaidateOptions(options?: UserOptions): ProtoGenOptions {
    if (!options) {
        throw new Error('Options must be provided');
    }

    // if (!options.outDir) {
    //     throw new Error('No output directory found');
    // }

    // if (!options.protocolDir) {
    //     throw new Error('protocolDir folder is required');
    // }

    if (!options.cwd) {
        options.cwd = process.cwd();
    }

    if (!options.prettierConfig) {
        options.prettierConfig = prettier.resolveConfig.sync(options.cwd) ?? {
            printWidth: 100,
            singleQuote: true,
            tabWidth: 4,
        };
    }

    if (!('repeatedFieldIsRequired' in options)) {
        options.repeatedFieldIsRequired = false;
    }

    return options as ProtoGenOptions;
}

export type ProtoGenOptions = Required<UserOptions>;

export type UserOptions = {
    // outDir: string;
    // protocolDir: string;
    ignoreFiles?: string[];
    cwd?: string;
    repeatedFieldIsRequired?: boolean;
    prettierConfig?: prettier.Options;
};
