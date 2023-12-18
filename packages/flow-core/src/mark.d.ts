declare module "mark.js/dist/mark.es6.min" {
	export = class Mark {
		constructor(context: string | HTMLElement | readonly HTMLElement[] | NodeList);

		/**
		 * highlight custom search terms.
		 * @param keyword The keyword to be marked. Can also be an array with multiple keywords.
		 * Note that keywords will be escaped. If you need to mark unescaped keywords (e.g. containing a pattern),
		 * have a look at the `markRegExp()`
		 * @param options Optional options
		 */
		mark(keyword: string | readonly string[], options?: Mark.MarkOptions): void;

		/**
		 * highlight custom regular expressions.
		 * @param regexp The regular expression to be marked. Example: /Lor[^]?m/gmi.
		 * Note that groups will be ignored and mark.js will always find all matches, regardless of the g flag.
		 * @param options Optional options
		 */
		markRegExp(regexp: RegExp, options?: Mark.MarkRegExpOptions): void;

		/**
		 * A method to mark ranges with a start position and length. They will be applied
		 * to text nodes in the specified context.
		 * @param ranges An array of objects with a start and length property.
		 * Note that the start positions must be specified including whitespace characters.
		 * @param options Optional options
		 */
		markRanges(ranges: readonly Mark.Range[], options?: Mark.MarkRangesOptions): void;

		/**
		 * A method to remove highlights created by mark.js.
		 * @param options Optional options
		 */
		unmark(options?: Mark.MarkOptions): void;
	};
}
