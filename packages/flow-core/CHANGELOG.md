<h4 className="margin-btm-8">Release Notes</h4>

# Change Log

## [2.10.0] - 2024-07-10

### Minor Changes

- `actions` property added in `f-button`, it will be displayed under chevron

## [2.9.15] - 2024-07-08

### Patch Changes

- `vue` component types updated.

## [2.9.14] - 2024-06-14

### Bug Fixes

- `f-select` outside click detection improved

## [2.9.13] - 2024-06-11

### Improvements

- `getComputedStyle` api usage removed, since it might cause render delay.

## [2.9.12] - 2024-05-27

### Improvements

- `disabled` attribute added in `f-tab-node`.
- `f-select` chevron clikable area increased

## [2.9.11] - 2024-05-17

### Bug Fixes

- `f-select` open on left side when rendered on extreme right of the window.

## [2.9.10] - 2024-04-15

### Bug Fixes

- `f-select` : call `updateDimentions` only while opening.

## [2.9.9] - 2024-04-04

### Bug Fixes

- File extension validation logic added when the user drops files

## [2.9.8] - 2024-04-01

### Bug Fixes

- font tokens updated

## [2.9.7] - 2024-03-28

### Improvements

- Added `category` property to `f-tag` to support both `fill` and `outline` values. Default value set to `fill`.
- Added `max-width` property to `f-tag`.

## [2.9.6] - 2024-03-28

### Improvements

- `f-tab` : `variant="no-border"` added.
- color tokens updated.

## [2.9.5] - 2024-03-21

### Bug Fixes

- `f-search` & `f-suggest` overlay got displayed even we don't have results or suggestions.

## [2.9.4] - 2024-03-20

### Improvements

- `f-checkbox` label line-height fixed.

## [2.9.3] - 2024-03-20

### Improvements

- `f-icon-button` box-sizing updated.

## [2.9.2] - 2024-03-19

### Improvements

- `color-tokens` updates.

## [2.9.1] - 2024-03-10

### Improvements

- Externalise `lodash-es` to reduce bundle size.

## [2.9.0] - 2024-03-01

### Features

- a11y support added.

## [2.8.7] - 2024-02-22

### Improvements

- The `f-select` virtualizer has been made optional and can be controlled using the `use-virtualizer` flag. This change will resolve the Cypress test case failure issue.

## [2.8.6] - 2024-02-22

### Bug Fixes

- `f-select` create-option api not working in firefox.

## [2.8.5] - 2024-02-13

### Improvements

- `f-ollion-dark` theme colors updated.

## [2.8.4] - 2024-02-13

### Bug Fixes

- The issue with highlighting suggestions in `f-suggest` has been resolved.

## [2.8.3] - 2024-02-12

### Improvements

- Updated `f-progress-bar` dimentions of circle variant.

## [2.8.2] - 2024-02-12

### Improvements

- `f-select`: A virtualizer is utilized to render options, thereby enhancing rendering performance, particularly in scenarios where there are over 3K+ options available.
- `f-select` : `max-options-width` support added to customize options width.

### Note

- We previously rendered `f-select` options in the DOM regardless of its visibility. Starting from this release, options will only appear when `f-select` is open. Please update test cases accordingly.

## [2.8.1] - 2024-02-07

### Improvements

- `circle` variant added in `f-progress-bar` to show progress in circle.

## [2.8.0] - 2024-02-06

### Features

- Implemented the `effect` attribute within the `f-icon-button` component to enhance user engagement and draw attention effectively.

## [2.7.8] - 2024-01-25

### Improvements

- Added `show-scrollbar` property to `f-div`.

### Bug Fixes

- Updated `f-div` to accommodate changes in Chrome v121, which now supports the `scrollbar-width` property. Default behavior adjusted accordingly.

### Note

- Removed `hide-scrollbar` property from `f-div`. Existing usage won't cause any issues.

## [2.7.7] - 2024-01-22

### Improvements

- `f-button` : `icon-left` and `icon-right` sizes updated.

## [2.7.6] - 2024-01-16

### Improvements

- `f-div` : Added `hide-scrollbar` property.
- (Note: The `hide-scrollbar` property will only hide the scrollbar; users can still scroll through the content.)

## [2.7.5] - 2024-01-11

### Improvements

- `f-text` : `x-large` tokens added for `para` and `code` variant.

## [2.7.4] - 2024-01-08

### Bug Fixes

- `f-input` types fixed.
- `f-div` highlight feature optimized.

## [2.7.3] - 2023-12-20

### Improvements

- `f-ollion-*` theme font tokens updated.
- Check `docs` directory for how to apply ollion theme.

## [2.7.2] - 2023-12-19

### Improvements

- `f-button`: `packed` category added.

## [2.7.1] - 2023-12-18

### Bug fixes

- 🚫 Removed HTML string execution from the `tooltip` attribute.
- 🔇 Temporarily removed the ability to pass slots as arguments in Storybook stories.We're on the lookout for a better way to document slots.
- ⛔ f-suggest no longer accepts markup in suggestions.
- ✨ In `f-text`, keyword highlighting now utilizes mark.js instead of `unsafeHTML`.
- 🎨 Enhanced CSS specificity for color tokens.

## [2.7.0] - 2023-12-11

### Features

- `f-countdown`: component added

## [2.6.3] - 2023-12-12

### Improvements

- `disable-result` attribute added on `f-search` to disable showing autocomplete results.
- `disable-suggestions` attribute added on `f-suggest` to disable showing autocomplete results.

## [2.6.2] - 2023-12-12

### Bug fixes

- `f-color-picker` alignment fix when used in row direction with other inputs.

## [2.6.1] - 2023-12-04

### Bug fixes

- re-exporting types of `f-input-base` from `f-input`. (To fix component type generation bug).

## [2.6.0] - 2023-12-04

### Minor Changes

- `f-color-picker` element added.

## [2.5.0] - 2023-11-27

### Minor Changes

- `lit` upgraded to v3.

## [2.4.0] - 2023-11-22

### Improvements

- The 1Password manager does not currently support Shadow DOM for autofill, and a timeline for its implementation has not been provided. Consequently, we are introducing `f-input-light` as a light DOM alternative to `f-input`.
- Login form story added [here](https://flow.ollion.com/v2/index.html?path=/story/ollion-flow-form-builder-examples--login-form). It uses `f-input-light` and validation module from `@nonfx/flow-form-builder`.
- `f-form-field` wrapper elements added to support `lable`, `subtitle`,`help` slots.
- **Note : `f-input-light` won't support `lable`, `subtitle`,`help` slots**.

## [2.3.1] - 2023-11-22

### Features

- font-weights for `<f-text variant="heading"></f-text>` updated in text-tokens received from figma API.

## [2.3.0] - 2023-11-15

### Features

- Added themes for ollion named as `f-ollion-dark` & `f-ollion-light`.

## [2.2.4] - 2023-11-21

### Bug Fixes

- `f-date-time-picker` : date parsing error message logic updated.

## [2.2.3] - 2023-11-20

### Bug Fixes

- `f-date-time-picker` : prevent the blur event from propagating when the date picker is open and date is selected. (It was validating value before input event in f-form-builder)

## [2.2.2] - 2023-11-10

### Bug Fixes

- `f-popover` : reset `max-height` issue fixed.

## [2.2.1] - 2023-11-08

### Improvements

- `f-popover` : state attribute introduced with `transparent` option.

### Bug Fixes

- `f-text` : `<a>` tag is not displaying cursor pointer.

## [2.2.0] - 2023-10-30

### Features

- `f-document-viewer` : component designed for document viewing, accepting JSON schema as input.

## [2.1.8] - 2023-10-20

### Patch Changes

- `f-tooltip` : `closable="true"` not working

## [2.1.7] - 2023-10-20

### Patch Changes

- `f-date-time-picker` : clear icon taking 2 clicks to clear date value.

## [2.1.6] - 2023-10-19

### Patch Changes

- `f-popover` : `overlay-click` event not working.
- `f-search` : clear icon adding undefined in input box.

## [2.1.5] - 2023-10-19

### Bug Fixes

- `f-accordion`: max-width bug fixed for `f-aacordion` when direction="row"

## [2.1.4] - 2023-10-18

### Patch Changes

- Duplicate type import fixed

## [2.1.3] - 2023-10-18

### Improvements

- `tooltip` property now accepts object

```
{
    text: string;
    closable?: boolean;
    placement?: FTooltipPlacement;
}
```

## [2.1.2] - 2023-10-18

### Bug Fixes

- `f-picotgram`: `auto-bg` dynamic colors for text source fixed.

## [2.1.1] - 2023-10-17

### Bug Fixes

- `f-popover`: z-index issue with target , overlay and popover fixed.

## [2.1.0] - 2023-10-16

### Features

- `f-breadcrumb`: added `variant` property which includes `text` and `icon` to display breadcrumbs in two different variants.

## [2.0.5] - 2023-10-16

### Bug fixes

- `f-tag`: width inherting issue fixed.

## [2.0.4] - 2023-10-13

### Improvements

- `f-pictogram`: added `category` prop having two types `fill` and `outline`.

## [2.0.3] - 2023-10-12

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
- `@nonfx/flow-core-config@1.1.3`

## [2.0.2] - 2023-10-10

### Patch Changes

- a2de106: Fix platform types
- Updated dependencies [a2de106]
- `@nonfx/flow-core-config@1.1.1`

## [2.0.1-beta.0] - 2023-10-10

### Patch Changes

- Fix platform types
- Updated dependencies
- `@nonfx/flow-core-config@1.1.1-beta.0`

## [2.0.0] - 2023-10-10

### Major Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
- `@nonfx/flow-core-config@1.1.0`
<hr className="margin-btm-32" />
<p className="margin-btm-24">All notable changes to this project will be documented in this file. See <a>Conventional Commits</a> for commit guidelines. </p>

## [1.26.4] - 2023-10-06

### Improvements

- `f-tag` displays a tooltip only when it has an ellipsis.

## [1.26.3] - 2023-10-03

### Bug Fixes

- `f-select` incrorrect vue2 types generation fixed.

## [1.26.2] - 2023-10-03

### Improvements

- `f-popover` placement warning removed since it is not necessary for user to know.

### Bug Fixes

- `f-select` : setting object to `value` has an issue with vue2.

## [1.26.1] - 2023-09-27

### Improvements

- `f-popover`: Added a `shadow` flag for displaying shadows (Note: it functions only when `overlay="false"`).

## [1.26.0] - 2023-09-26

### Features

- `f-select` : options navigation through arrow keys.
- `f-select` : `Enter` key to select option
- `f-select` : `Esc` to close f-select.

## [1.25.5] - 2023-09-25

### Bug Fixes

- `f-search` result reactivity issue

## [1.25.4] - 2023-09-25

### Bug Fixes

- `f-select` value type fixed.
- `f-select` value rendering fixed if user pass value as array for single selection.

## [1.25.3] - 2023-09-22

### Bug Fixes

- `f-file-upload` : mapping `MIME Type` with its extensions, and displaying extension (.docx, .ppt) instead of whole `MIME Type` being displayed.
- `f-search`: `data-qa-element-id` added.

## [1.25.2] - 2023-09-20

### Bug Fixes

- `f-select` : fixed creation new datasets when we click on “No Options”, when create-new-option is `false`.

## [1.25.1] - 2023-09-15

### Bug Fixes

- `f-tag` : counter suraface color visibility fixed.

## [1.25.0] - 2023-09-14

### Features

- `f-popover`: Introduced `size="hug-content"` to support popover sizing based on inner content.
- `f-popover` now supports a custom size using the size property. For example, `size="custom(500px, 100vh)"` where the first parameter is width and the second is height.
- `f-popover` can open without a target and with custom placements. For instance, `size="custom(500px, 100vh)" placement="right"` will open the popover on the extreme right, similar to a slideout.

### Bug Fixes

- `f-popover` : `@overlay-click` not emitted when `:overlay="false"`

## [1.24.9] - 2023-09-13

### Bug Fixes

- `f-date-time-picker` : clear property not working fixed.

## [1.24.8] - 2023-09-13

### Bug Fixes

- f-input of type number converts zero to blank string.

## [1.24.7] - 2023-09-07

### Bug Fixes

- large `f-popover` overflows from screen when target is also big.

## [1.24.6] - 2023-09-07

### Bug Fixes

- Duplicate typescript type export bug fixed.

## [1.24.5] - 2023-09-06

### Bug Fixes

- `f-accordion`: slotted `f-div[width="fill-container"]` not taking full width.
- `f-accordion` : `header-padding` and `body-padding` properties added to modify default padding of header and body slots.
- `f-form-group` : lengthy object description adds scrollbar

## [1.24.4] - 2023-09-06

### Bug Fixes

- `f-accordion`: `100%` header width causing scrollbar.

## [1.24.3] - 2023-09-06

### Improvements

- `f-counter`: category added `fill`, `outline` & `transparent`.

## [1.24.2] - 2023-09-04

### Improvements

- `f-suggest` `options-max-height` property added to control max height of options.
- `f-search` `result-max-height` property added to control max height of search result.

## [1.24.1] - 2023-09-04

### Bug Fixes

- `f-suggest` options overflow issue fixed, max-height will be adjusted based on position on screen.
- The `not-allowed` cursor now has the highest CSS specificity.

## [1.24.0] - 2023-08-28

### Features

- `f-select`: `auto-add-option` property is added to give the control to the developer of not available option getting automatically added in the list of options, or not. This could option could be used for options which is array of strings, and when `create-option=true`.

### Bug Fixes

- `f-text` editable mode bug resolved of tick-submit icon positioning outside textbox, in f-text inline true mode.

### Improvements

- `f-select` typescript enhancement for options-object.

## [1.23.2] - 2023-08-28

### Bug Fixes

- External `f-tooltip` with `closable` should force close whenever tooltip attribute changes.

## [1.23.1] - 2023-08-25

### Bug Fixes

- `f-select`: selected value not visible for small width.

## [1.23.0] - 2023-08-24

### Features

- `f-div`: `max-height` and `max-width` properties added.

### Improvements

- `f-text`: UX for f-text editable feature improved. On hover and clicking on f-text the editable box opens now.

## [1.22.2] - 2023-08-23

### Bug Fixes

- lit `html` exported from `flow-core` now.

## [1.22.1] - 2023-08-23

### Bug Fixes

- `f-suggest`: `resultWhen` called mutliple time.

### Improvements

- `f-suggest`: `@selected` event emitted when suggested option selected.

## [1.22.0] - 2023-08-16

### Features

- `f-div`: highlight property added to highlight a particular f-div and others would be in overlay.

### Improvements

- `f-tag`: added ellipsis according to width of f-tag.

### Bug Fixes

- `f-tag`: emoji wasn't taking the correct size according to the f-tag size.

## [1.21.0] - 2023-08-16

### Features

- `resultWhen` property of type predicate function added on `f-search` to customize results.
- `suggestWhen` property of type predicate function added on `f-suggest` to customize results.
- `no-data` slot added in `f-search` and `f-suggest` to display when no result found.

### Improvements

- `loading` attribute added in `f-search`
- Default behavior of search/suggest results are now case-insensitive in `f-search` ,`f-suggest`.

## [1.20.5] - 2023-08-14

### Bug Fixes

- If `f-popover` used as tooltip then causing z-index issue.
- The tooltip is not removed from the DOM for the f-icon when the element is removed.

## [1.20.4] - 2023-08-09

### Bug Fixes

- `f-text` : `:host` style is affecting in form-builder, hence applied to `f-text` selelector only.

## [1.20.3] - 2023-08-09

### Bug Fixes

- `f-select` loading icon alignment and loading behavior fix.

## [1.20.2] - 2023-08-04

### Improvements

- `f-suggest` added text-highlight on type and keyboard navigation in `suggestions` is possible now, and custom template could be given for the options.

## [1.20.1] - 2023-07-31

### Improvements

- `search-input` event emitted when user changes search value in `f-select`.

## [1.20.0] - 2023-07-27

### Features

- `f-text`: `editable` feature added to edit the text inside f-text.

## [1.19.0] - 2023-07-26

### Features

- `f-pictogram`: `auto-bg` flag where it auto assigns a color based on characters of `source` string.

## [1.18.0] - 2023-07-26

### Features

- `--color-input-default` color token introduced and used in all inputs.

### Bug Fixes

- `f-tag` not rendering if `counter="0"`

## [1.17.9] - 2023-07-25

### Improvements

- `data-qa-remove-emoji` attribute added in `f-emoji-picker` for automation.

## [1.17.8] - 2023-07-21

### Improvements

- `disabled` behavior updated for `f-date-time-picker`, `f-emoji-picker`,`f-icon-button`,`f-search`.

## [1.17.7] - 2023-07-20

### Bug Fixes

- `f-select` : `disabled` option css fixed.
- `f-form-builder` not taking full width in `f-div` direction `column`.

## [1.17.6] - 2023-07-11

### Bug Fixes

- tooltip removal logic updated (when value switch from string to null or undefined)

## [1.17.5] - 2023-07-11

### Bug Fixes

- `f-search`: `scope` dropdown width updated.
- disabled css updated for elements in shadowRoot.

## [1.17.4] - 2023-07-05

### Bug Fixes

- `f-select`: `create-option` not working in formbuilder.
- `f-select` : searched option not getting selected in formbuilder.

## [1.17.3] - 2023-07-03

### Improvements

- `f-select`: `optionTemplate` function has now a second value `isSelected`, to check and differ the template displayed on selection area.

### Bug Fixes

- `f-select`: on create a new option, the creation must be always auto selected; z-index of dropdown is fixed.
- `f-progress-bar`: variant curved issue fixed.

## [1.17.2] - 2023-07-03

### Bug Fixes

- tooltip not displaying when element is disabled.
- `f-input` browser autofill style updated.
- `f-text` state switching issue.

## [1.17.1] - 2023-06-21

### Improvements

- Extract shared configuration into `@nonfx/flow-core-config` package.
- Allow loading of icon bundles asynchronously

### Bug Fixes

- Fix theme subscription cleanup in f-icon

## [1.17.0] - 2023-06-14

### Features

- `f-text-area` : `mask-value` property added to behave like password field.

## [1.16.2] - 2023-06-09

### Improvements

- `f-popover` : `close-on-escape` and `auto-height` boolean flags props added.

## [1.16.1] - 2023-06-08

### Improvements

- `f-text` : highlight inner text logic updated.

## [1.16.0] - 2023-06-06

### Features

- `f-breadcrumb` : component added.

### Bug Fixes

- Fixed - `tooltip` wasn't working on various components as they were not inheriting properties from root component

## [1.15.4] - 2023-05-31

### Bug Fixes

- `f-select` : `add-option` event emission logic fixed.

## [1.15.3] - 2023-05-31

### Bug Fixes

- `f-input` & `f-suffix` bug fixed nomenclature difference in attribute and variable name of property `prefix` and `suffix`, it was not working in vue3

## [1.15.2] - 2023-05-30

### Bug Fixes

- `f-select`: changed `create-option` event name to `add-option`.
- `f-div`: added `round` variant.
- `f-tag`: size of icons inside tags are adjusted.

## [1.15.1] - 2023-05-29

### Bug Fixes

- `f-tooltip`: tolltip width was fixed earlier, has been fixed now. User could form dynamic width tooltips.

### Improvements

- `f-select`: added new custom event named `create-option` for creating new event.

## [1.15.0] - 2023-05-26

### Bug Fixes

- `f-text` not rendering ellipsis fixed.
- `f-text` not rendering ellispis in multioption selection in `f-select`.
- `f-text` height issue fixed if used in f-div `direction="column"`.

## [1.14.7-beta] - 2023-05-25

### Warning: Use only to test f-text features.

### Bug Fixes

- `f-text` to test ellipsis and old changes.

## [1.14.6] - 2023-05-25

### Improvements

- `f-select` blur event is cutomized to emit only when dropdown closes.

### Bug Fixes

- `f-checkbox` and `f-radio` labels not wrapping fixed.

## [1.14.5] - 2023-05-17

### Features

- Slack notifications GitAction integrated

### Improvements

- Unnecessary badges removed from README.md

## [1.14.4] - 2023-05-16

### Bug Fixes

- `f-select` opening issue fixed.

## [1.14.3] - 2023-05-16

### Improvements

- `f-checkbox` && `f-radio` label click added

## [1.14.2] - 2023-05-16

### Improvements

- `f-select` : selected value must display using optionTemplate if available.
- `disabled` property support added to option object

## [1.14.1] - 2023-05-16

### Bug fixes

- `f-accordion` : `header hover state is fixed.
- `f-switch`: removed the buggy outline on focus, and removed the extra gaps occurrence that was happening when no slots were present.

## [1.14.0] - 2023-05-15

### Bug fixes

- `f-select` : `optionTemplate` converted from string to function to fix security hotspots.

## [1.13.3] - 2023-05-03

### Bug fixes

- `f-select` : setting `clear` prop to false.

## [1.13.2] - 2023-05-03

### Bug fixes

- `z-index` not resetting in child `f-popover`.

## [1.13.1] - 2023-04-27

### Bug fixes

- `z-index` not resetting in `f-popover`.

## [1.13.0] - 2023-04-26

### Features

- `f-progress-bar` component added.

## [1.12.3] - 2023-04-20

### Bug fixes

- `f-popover` target z-index bug fixed.

## [1.12.2] - 2023-04-20

### Bug fixes

- `f-div` hover state bug fixed for child f-div's with state inherit.

## [1.12.1] - 2023-04-18

### Bug fixes

- `f-date-time-picker` typescript bug fixed.

## [1.12.0] - 2023-04-18

### Features

- `f-date-time-picker` component added.

### Improvements

- `f-input`: added a prop in custom-event named `type` other than the `value` to check for "clear" field.

## [1.11.0] - 2023-04-17

### Features

- `f-carousel` component added.

## [1.10.1] - 2023-04-17

### Improvements

- `f-accordion`: `toggle` event dispatch fucntion added.

## [1.10.0] - 2023-04-17

### Features

- `f-grid` component added.

## [1.9.0] - 2023-04-13

### Features

- `f-accordion` component added.

## [1.8.4] - 2023-04-10

### Improvements

- Icon story updated with external storybook link.
- `f-input`: `autocomplete`, `autofocus` attribute support added.

### Bug Fixes

- `f-text`: alignment fixed when used in `f-div` column direction.
- `f-radio`, `f-checkbox` spacing issue fixed.

## [1.8.3] - 2023-04-10

### Bug Fixes

- `f-icon-button`: in block variant, hover on icon added.

## [1.8.2] - 2023-04-07

### Improvements

- shadow added to `f-suggest` options.

## [1.8.1] - 2023-04-04

### Improvements

- support to pass state in help slot of inputs.

## [1.8.0] - 2023-04-04

### Features

- `subtitle` slot support added to all input elements.

## [1.7.4] - 2023-04-04

### Bug fixes

- tooltip not visible in light theme.

## [1.7.3] - 2023-04-04

### Bug fixes

- Text not wrapping in forms.

## [1.7.2] - 2023-03-31

### Improvements

- `umd` bundle updated.

## [1.7.0] - 2023-03-31

### Features

- `umd` bundles added in package. to use flow-core in static html file.

## [1.6.8] - 2023-03-27

### Bug fixes

- `emoji` picker not opening in `f-form-builder`;

## [1.6.7] - 2023-03-27

### Bug fixes

- `emoji` picker category resets on selection.

## [1.6.6] - 2023-03-23

### Bug fixes

- outside click emoji picker not closing.

## [1.6.5] - 2023-03-23

### Improvements

- `f-icon-button`: `type`renamed to `category` (more aligned to `f-button`).

## [1.6.4] - 2023-03-21

### Improvements

- `data-qa-option` value updated for objects in `f-select`.

## [1.6.3] - 2023-03-20

### Bug Fixes

- `data-qa-id` added in `f-select`.

## [1.6.2] - 2023-03-17

### Bug Fixes

- Select dropdowns can’t be dismissed by clicking outside

## [1.6.1] - 2023-03-14

### Bug Fixes

- TypeError when using single mode on f-select.
- Select dropdowns can’t be dismissed by clicking outside
- Select dropdowns have no shadow
- Child popover behavior fixed.

## [1.6.0] - 2023-03-14

### Features

- `f-search` component added.

### Improvements

- `f-suggest` added group categorization type dropdown, customization according to `f-search`.

## [1.5.3] - 2023-03-09

### Improvements

- `f-form-group` label wrapper identifier added.

## [1.5.2] - 2023-03-09

### Improvements

- `label`, `description` spacing updated for form inputs.

## [1.5.1] - 2023-03-09

### Improvements

- `f-icon` alignment in form inputs.

## [1.5.0] - 2023-03-09

### Improvements

- `external` updated in build options.

## [1.4.9] - 2023-03-09

### Improvements

- `external` updated in build options.

### Bug fixes

- Type casting: input of type `number` not emitting Number type value.

## [1.4.8] - 2023-03-09

### Improvements

- For form elements `data-qa-element-id` propogated to `data-qa-id` of native input element.

## [1.4.8-beta] - 2023-03-07

### Bug fixes

- `data-qa-id` propogated to native input element.

## [1.4.7] - 2023-03-07

### Bug fixes

- `:host` styles applied to respective tag.

## [1.4.6] - 2023-03-07

### Bug fixes

- `f-emoji-picker`: added static width to stop the dynamic width extension. The picker wasn't opening in form-builder on click, which is fixed.

## [1.4.5] - 2023-03-07

### Features

- `f-div` css issue fixed.

## [1.4.4] - 2023-03-06

### Features

- `f-toast` component added.

## [1.4.3] - 2023-03-03

### Features

- `f-emoji-picker` component added.

## [1.4.2] - 2023-03-02

### Features

- `data-qa-*` attributes added in `f-select` and `f-form-group`.

## [1.4.1] - 2023-02-28

### Features

- `f-suggest` element added.

## [1.4.0] - 2023-02-26

### Bug fixes

- `f-select` value not setting bug fixed.

## [1.3.9] - 2023-02-26

### Improvements

- `f-switch` value type changed to boolean

### Bug fixes

- Various major css issues fixed with `f-divider`, `f-form`, `f-form-group` fixed.

## [1.3.8] - 2023-02-23

### Features

- `f-file-upload` added as a component.

## [1.3.7] - 2023-02-21

### Bug fixes

- `size`, `variant`, `category` removed from `f-form` since it is anti pattern to set it on inner input elements. (This usecase will be covered in `@nonfx/flow-form-builder`)

## [1.3.6] - 2023-02-21

### Bug fixes

- `f-input` : `suffixWhen` property added.

## [1.3.5] - 2023-02-21

### Bug fixes

- `f-input` sides cropping issue fixed, for width less than 170px.
- `f-text` inline prop bug fixed.

## [1.3.4] - 2023-02-20

### Bug fixes

- `f-divider` height `0px` changed to `unset` (it is not working in flex )

## [1.3.3] - 2023-02-20

### Bug fixes

- `f-switch` toggle isse when value is undefined.
- `f-divider` height `0px` changed to `unset` (it is not working in flex )

## [1.3.1] - 2023-02-15

### Improvements

- `f-form-group` `action` slot added.

## [1.3.0] - 2023-02-14

### Bug fixes

- `f-tooltip` was n't destroying if user changes route using arrow keys, and don't move the mouse off the component. This has been resolved.
- `f-divider` vertical alignment height inherit issue fixed.

### Improvements

- `f-text`: added inline prop.
- `f-from-group`: `isCollapsed` prop is added, to see the default collapse (open/close) feature.

## [1.2.9] - 2023-02-14

### Bug fixes

- `f-from-group` tooltip bug fixed.

## [1.2.8] - 2023-02-13

### Bug fixes

- `MutationObserver` removed from inputs.

## [1.2.7] - 2023-02-09

### Feature

- `f-tab` as a component added along with its sub-components `f-tab-node` and `f-tab-content`.

## [1.2.6] - 2023-02-08

## Bug fixes

- Typescript bug fixed

## [1.2.5] - 2023-02-03

## Bug fixes

- Typescript bug fixed

## [1.2.4] - 2023-02-03

## Bug fixes

- HTMLElement type import bug fixed

## [1.2.3] - 2023-02-03

## Improvements

- Added `overflow="visible"` in `f-div`.

## [1.2.2] - 2023-02-03

### Feature

- `f-tooltip` as a component added, which could be used easily in all components using `tooltip="string"` or could be used as component using `f-tooltip`.

## [1.2.1] - 2023-02-02

### Improvements

- Added `clickable` flag to `f-tag` component.

## [1.2.0] - 2023-01-30

### Improvements

- Removed warning icon from `f-input` danger state. loader in loading state reflecting the state `f-input`.
- `f-text-area` value not clearing issue fixed.
- `f-radio` selection fixed.

## [1.1.9] - 2023-01-20

### Features

- `f-form`: Form Input component added along with updating all its properties with resepct to other form-elements.

## [1.1.8] - 2023-01-18

### Features

- `f-input`, `f-select`, `f-checkbox`, `f-textarea`, `f-radio`, `f-switch`: Form Input components added.

### Improvements

- replaced `gap` prop for `f-div` with different pixels, x-large:24px, large:16px, medium:12px, small:8px, x-small:4px.

## [1.1.6] - 2023-01-03

### Improvements

- `.width-N` and `.height-N` utility classes added where N is multiple of 50 and less than 1000.

## [1.1.5] - 2023-01-02

### Improvements

- Publishing packages to github registry.

## [1.1.4] - 2022-11-28

### Bug fixes

- theme setting mechanism changed to remove jest or test library error.

## [1.1.3] - 2022-11-28

### Features

- `f-div` added custom fill prop.

## [1.1.2] - 2022-11-25

### Features

- `f-tag` added proper loader with custom fill prop.
- `f-icon-button`, `f-icon`, `f-button`, `f-icon-button`, `f-divider`, `f-text`, `f-counter` : added custom fill state prop

## [1.1.1] - 2022-11-17

### Features

- `f-tag` component added, along with it story

## [1.1.0] - 2022-11-07

### Bug Fixes

- `f-icon-button` inner icon were not updating when state change.

## [1.0.9] - 2022-11-04

### Features

- Inheritance Rules added in various components, where if state is equal to inherit, then the particular component will inherit color of its parent.
  Following are the components:
  - `f-div`
  - `f-icon`
  - `f-text`
  - `f-pictogram`
  - `f-button`
  - `f-icon-button`

## [1.0.8] - 2022-10-31

### Improvements

- `README.md` added in npm package.

## [1.0.7] - 2022-10-31

### Improvements

- color token file key updated.
- tokens moved to `.env` file.
- md file automated for colors stories

## [1.0.6] - 2022-10-17

### Bug Fixes

- `f-pictogram` icons and emoji size fixed.

## 1.0.5

### Bug Fixes

- `f-pictogram` state not updating fixed.

## 1.0.4

### Improvments

- `f-div` `loading="skeleton"` updated.

## 1.0.0

### Major Changes

- 3ab62c5: Beta version to test changeset

## [1.0.0] - 2022-10-07

### Improvements

- Open source version

## [0.4.6] - 2022-10-06

### Improvements

- `src` folder included while publishing, since it is required for creating dependencies.

## [0.4.5] - 2022-10-06

### Testing

- Testing publish workflow

## [0.4.4] - 2022-10-06

### Improvements

- Contribution doc updated.

## [0.4.3] - 2022-10-06

### Improvements

- react types updated to support `class` attributes.

## [0.4.2] - 2022-10-03

### Improvements

- react types updated to support native attributes.

## [0.4.1] - 2022-10-03

### Improvements

- `f-popover` test cases updated.

### Bug Fixes

- `f-popover` z-index bug fixed

## [0.4.0] - 2022-10-03

### Improvements

- `f-counter` label rules added for rounding off 1000s and more to k and M.

## [0.3.9] - 2022-09-03

### Features

- `f-template` component added.

## [0.3.8] - 2022-09-26

### Features

- `f-popover` component added.

### Bug Fixes

- `f-text` `f-div` grow and wrap issue fixed.

## [0.3.7] - 2022-09-21

### Improvements

- `f-icon-button` counter size and positions updated.

## [0.3.6] - 2022-09-21

### Bug Fixes

- import module path updated for vue3, vue2, react component types.

### Improvements

- FLOW-404 : `f-icon` large size updated

## [0.3.5] - 2022-09-20

### Features

- `f-icon-button` component updated to display counter position.

## [0.3.4] - 2022-09-19

### Features

- `f-pictogram` component added.

## [0.3.3] - 2022-09-08

### Bug Fixes

- `f-button` : disable button executing action bug fixed.
- `f-text` : text size unit updated

## [0.3.2] - 2022-08-26

### Features

- `f-spacer` component added.

## [0.3.1] - 2022-08-26

### Features

- `f-div` padding values updated.

## [0.2.8] - 2022-08-24

### Features

- `f-divider`element added.

### Improvements

- Unit testcases for f-div, f-text, f-icon-button

## [0.2.7] - 2022-08-24

### Bug Fixes

- FLOW-389 : `f-text` not aligned in center bnug fixed.
- FLOW-386 : `f-counter` font-weight updated.

## [0.2.6] - 2022-08-24

### Improvements

- `vue3` types added.

## [0.2.3] - 2022-08-23

### Improvements

- `vue` & `react` types excluded from bundle and vailable for manual import based on consumer application.

## [0.2.2] - 2022-08-22

### Improvements

- All elements converted to shadow DOM

### Features

- `f-icon-button` element added

## [0.1.9] - 2022-08-16

### RND

- Trying bundling options

## [0.1.3] - 2022-08-16

### Improvements

- `f-icon` : placeholder svg added when icon is not present in package.
- `Shift + Ctrl + T` will toggle between dark and light mode.
- `f-button` : loading states updated.

## [0.1.1] - 2022-08-12

### Improvements

- `f-text` : remove `expandable`, `editable` property.
- `f-div`: `variant` property updated with `curved` and `block` values.
- `f-div` : `direction` property added with `row`, `column` values.

## [0.1.0] - 2022-08-10

### Features

- `f-text` element added

## [0.0.9] - 2022-08-09

### Features

- `f-div` element added

## [0.0.8] - 2022-08-05

### Improvements

- publish github action created

## [0.0.7] - 2022-08-05

### Bug Fixes

- `f-button` `shape` attribute removed.
- `f-button` `type` attribute added.

## [0.0.6] - 2022-08-04

### Bug Fixes

- `f-icon` svg update bug fixed when we update source attribute.
