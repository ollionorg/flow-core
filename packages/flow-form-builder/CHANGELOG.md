<h4 class="margin-btm-8">Release Notes</h4>

# Change Log

## [2.4.4] - 2024-07-08

### Patch Changes

- `vue` component types updated.

## [2.4.3] - 2024-06-14

### Patch Changes

- `select` with multiple selection empty array validation fixed

## [2.4.2] - 2024-05-15

### Patch Changes

- `optionsMaxHeight` property added for suggest field.

## [2.4.1] - 2024-04-22

### Bug Fixes

- Validation rules are triggered multiple times when multiple fields utilize the `showWhen` property.

## [2.4.0] - 2024-03-27

### Features

- validation support for `array` and `object` field

## [2.3.1] - 2024-03-12

### Bug Fixes

- `showWhen` not working for `layout:'label-left'` fields.
- `layout:'label-left'` fields alignment fixed when used in object in horizontal direction.

## [2.3.0] - 2024-03-01

### Features

- a11y support added.

## [2.2.5] - 2024-02-13

### Patch Changes

- The `useVirtualizer` property has been added to the `select` field to enable smooth search and selection for a large number of options.

## [2.2.4] - 2024-02-13

### Patch Changes

- `layout` property added to field which currently supports `label-left` value.

## [2.2.3] - 2024-02-13

### Patch Changes

- `suggestWhen` property support added to `suggest` field.

## [2.2.2] - 2024-02-12

### Patch Changes

- `maxOptionsWidth` property added to `select` field.

## [2.2.1] - 2023-12-18

### Patch Changes

- Markup support for the option title in `f-checkbox-group` and `f-radio-group` has been deprecated and is no longer accepted.

## [2.2.0] - 2023-12-04

### Minor Changes

- `f-color-picker` field integrated

## [2.1.0] - 2023-11-27

### Minor Changes

- `lit` upgraded to v3.

## [2.0.8] - 2023-10-20

### Patch Changes

- The `validateField` function has been exported.

## [2.0.7] - 2023-10-20

### Patch Changes

- `console.log` removed

## [2.0.6] - 2023-10-18

### Patch Changes

- Duplicate type import fixed

## [2.0.5] - 2023-10-18

### Patch Changes

- `iconTooltip` type changed.
- `min-value` and `max-value` default messages updated.

## [2.0.4] - 2023-10-16

### Patch Changes

- v1.8.0 and v1.8.1 commits merged.

## [2.0.3] - 2023-10-12

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
- `@nonfx/flow-core-config@1.1.3`
- `@nonfx/flow-core@2.0.3`

## [2.0.2] - 2023-10-10

### Patch Changes

- `a2de106`: Fix platform types
- Updated dependencies [a2de106]
- `@nonfx/flow-core-config@1.1.1`
- `@nonfx/flow-core@2.0.1`

## [2.0.1-beta.0] -2023-10-10

### Patch Changes

- Fix platform types
- Updated dependencies
- `@nonfx/flow-core-config@1.1.1-beta.0`
- `@nonfx/flow-core@2.0.1-beta.0`

## [2.0.0] - 2023-10-10

### Major Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
- `@nonfx/flow-core@2.0.0`
<hr class="margin-btm-32" />
<p class="margin-btm-24">All notable changes to this project will be documented in this file. See <a>Conventional Commits</a> for commit guidelines. </p>

## [1.8.1] - 2023-09-13

### Improvements

- Array field description font size fixed.

## [1.8.0] - 2023-09-13

### Features

- Custom validation message using callback function for dynamic messages.

## [1.7.8] - 2023-09-08

### Improvements

- Validation and Input event sequence swapped to avoid race condition in f-form-array and f-form-object
- Async validator last value caching logic updated.

## [1.7.7] - 2023-09-08

### Improvements

- Validation and Input event sequence swapped to avoid race condition.

## [1.7.6] - 2023-09-07

### Improvements

- Async validator last value caching logic updated.
- `Multiple Async Custom Validator` story added

## [1.7.5] - 2023-09-07

### Bug fix

- Multiple `custom` validation rules are not triggering.

## [1.7.4] - 2023-09-05

### Bug fix

- `f-select` width issue fixed in object with direction horizontal.

## [1.7.3] - 2023-08-09

### Bug fix

- `async` silent validator blocking render while first update.

## [1.7.2] - 2023-08-09

### Bug fix

- `async` validator wrong result issue.

## [1.7.1] - 2023-08-08

### Improvements

- loading added to element if it has async custom validator. (Note : loading only works for supported fields)
- `loading` property added for `select` field.

### Bug fix

- `async` validator called multiple times

## [1.7.0] - 2023-08-08

### Features

- `async` validate function support in custom validator.

## [1.6.1] - 2023-07-21

### Improvements

- Individual options from checkboxes and radio buttons can be disabled.

### Bug Fixes

- `checkbox` and `radio` group disabled css fixed.

## [1.6.0] - 2023-06-26

### Features

- `datetime` field support added.

## [1.5.21] - 2023-06-22

### Bug fix

- Duplicate css import when used with mutliple flow dependecies

## [1.5.20] - 2023-06-14

### Improvements

- `textarea` field now supports `maskValue` peoperty.
- Text based `tooltip` max-width improved.

## [1.5.20-beta1] - 2023-05-29

### Warning: Use only to test vue3 object reactivity and event emission.

### Improvements

- input and state-change event now emitting new object/ deep copy of the object.
- state-change event emission optimised

## [1.5.19] - 2023-05-25

### Bug fix

- `checkbox` and `radio` helper text not displayed if used with markup.

## [1.5.18] - 2023-05-23

### Bug fix

- Passed missing `fileType` prop to `f-file-input` component

## [1.5.17] - 2023-05-18

### Improvements

- Slack notifications integrated

## [1.5.16] - 2023-05-16

### Improvements

- `qaId` added in checkbox and radio options

## [1.5.15] - 2023-05-10

### Bug fixes

- `f-select` : `optionTemplate` type fixed.

## [1.5.14] - 2023-05-10

### Bug fixes

- `radio` field tooltip not displaying fixed.

## [1.5.13] - 2023-05-03

### Bug fixes

- `required` validation rule message fixed.

## [1.5.12] - 2023-04-18

### Improvements

- types updated
- console.log cleanup
- schema doc md file added

## [1.5.11] - 2023-04-10

### Improvements

- We can now pass html\`\` markup with event binding in `label.title`, `label.subTitle` and `helperText`.
- `autofocus`, `autocomplete` support added to text fields.
- `submit` on enter feature.
- `html` function rexported for consumer.

## [1.5.10] - 2023-04-07

### Improvements

- `subTitle` clickable feature.

## [1.5.9] - 2023-04-07

### Bug fixes

- hidden field validation.

## [1.5.8] - 2023-04-07

### Bug fixes

- `clear` property not working in select field.
- Vue : overridden variant, category, size not working.
- Typescript : `button`, `icon-button` custom state not working.

## [1.5.7] - 2023-04-04

### Bug fixes

- `subTitle` not working in select fixed.

## [1.5.6] - 2023-04-04

### Improvements

- `subTitle` filed added to support right side text of input.
- `helperText` now supports `html` markup.

### Bug fixes

- `helperText` not wrapping issue fixed.

## [1.5.5] - 2023-03-31

### Bug fixes

- umd : `undefined` check added on validation state.

## [1.5.4] - 2023-03-31

### Bug fixes

- `undefined` check added on field.

## [1.5.3] - 2023-03-31

### Improvements

- `umd` bundle added in package.

## [1.5.2] - 2023-03-23

### Bug fixes

- `emoji` category selection closes popover.

## [1.5.1] - 2023-03-23

### Bug fixes

- `state-change` does not emit deep inner element's validation messages.

## [1.5.0] - 2023-03-23

### Features

- `hidden` field type support added.

### Improvements

- `showWhen` updated to more generic typescript type.
- `button`,`icon-button` updated to support `variant`,`category`,`size`.

## [1.4.4] - 2023-03-21

### Improvements

- Typescript types error fixed for`FDividerState`.

## [1.4.3] - 2023-03-20

### Improvements

- `data-qa-` updated on + - button in `f-form-array`.

## [1.4.2] - 2023-03-17

### Bug fixes

- form render bug fixed.

## [1.4.1] - 2023-03-17

### Bug fixes

- `label.title` not used in error messages.

## [1.4.0] - 2023-03-13

### Features

- `emoji` field added.

## [1.3.0] - 2023-03-13

### Features

- `separator` field added.

## [1.2.11] - 2023-03-09

### Improvements

- Alignment of +, - actions in array field fixed.

## [1.2.10] - 2023-03-09

### Improvements

- Alignment of +, - actions in array field fixed.

## [1.2.9] - 2023-03-09

### Improvements

- Alignment of +, - actions in array field fixed.

## [1.2.8-beta] - 2023-03-07

### Improvements

- `data-qa-*` testing.

## [1.2.7] - 2023-03-07

### Improvements

- UX improvements.

## [1.2.6] - 2023-03-06

### Improvements

- `InfoIcon` tooltip behavior updated.

## [1.2.5] - 2023-03-02

### Improvements

- `allowEmpty` added for array field.

## [1.2.4] - 2023-03-02

### Features

- `suggest` and `file` field implemented.

### Improvements

- `data-qa-*` attributes added.

## [1.2.3] - 2023-02-27

### Improvements

- `value` assignemnt logic updated.

## [1.2.2] - 2023-02-26

### Improvements

- `debounce` added in input event.

## [1.2.1] - 2023-02-26

### Improvements

- `f-form-object`, `f-form-array` css fixed.

## [1.2.0] - 2023-02-23

### Improvements

- `id` made mandatory in checbox and radio options.

## [1.1.9] - 2023-02-22

### Improvements

- `min`, `max`,`min-value`,`max-value`, `regex` validation rules added.

## [1.1.8] - 2023-02-22

### Improvements

- `f-radio-group` and `f-checkbox-group` options and value types updated.

## [1.1.7] - 2023-02-22

### Improvements

- default validations added for `url` and `email` fields.

## [1.1.6] - 2023-02-21

### Improvements

- `variant`, `category`, `size`, `gap` propogation to all inputs.

## [1.1.5] - 2023-02-21

### Improvements

- `label` property added
- `suffixWhen` implementation for text fields.

## [1.1.4] - 2023-02-21

### Bug Fix

- value property renamed to values for vue2 bug

## [1.1.3] - 2023-02-20

### Bug Fix

- setting reflect false on value prop of formbuilder

## [1.1.2] - 2023-02-20

### Bug Fix

- setting reflect false on value prop of formbuilder

## [1.1.1] - 2023-02-20

### Improvements

- setting reflect false on value prop of formbuilder

## [1.1.0] - 2023-02-20

### Improvements

- Schema and architecture changed

## [1.0.0] - 2023-02-15

### Improvements

- `button`, `icon-button` field types added.
- `canDuplicate` feature implemented.
- `type` property added to group which will have either 2 values `object` | `array`.
- `iconTooltip` implemented.
- All code segregated.
- few unit tests added.
- `email`, `between` validation rules added.
- reactivity added for group addition or deletion from consumer.
- multiple event binding issue fixed.

## [0.1.1] - 2023-01-01

### Improvements

- addition of `suffixWhen`conditional prop in schema to show suffix conditionaly.

### Bug fixes

- Vue specific bug fix for `sync` and two way data binding in `f-form-builder`

## [0.1.0] - 2023-01-31

### Bug fixes

- Redio Options type bug fixed.

### Features

- Form Input Elements integration.

## [0.0.7] - 2023-01-05

### Improvements

- package renamed from `@nonfx/flow-formbuilder` to `@nonfx/flow-form-builder`

## [0.0.6] - 2023-01-04

### Bug Fixes

- types location updated in package.json.

## [0.0.5] - 2022-12-28

### Features

- spacing updated between fields and groups.

## [0.0.4] - 2022-12-27

### Features

- `input` styled with flow-core's variables.

## [0.0.3] - 2022-12-27

### Features

- Default slot added to add extra eleemnts after groups.
- `submit` method added to submit from using JS.
- `state` value emiitted with new object.

## [0.0.2] - 2022-12-27

### Features

- releasing to test in `vue`.

## [0.0.1] - 2022-12-20

### Initial release

- sample component added.
