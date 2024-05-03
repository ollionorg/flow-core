<h4 className="margin-btm-8">Release Notes</h4>

# Change Log

## [2.4.3] - 2024-05-03

### Bug Fixes

- `f-table-schema` infinie scroll issue fixed.

## [2.4.2] - 2024-03-20

### Bug Fixes

- `f-tcell` aligment in `f-table-schema` fixed.

## [2.4.1] - 2024-03-20

### Bug Fixes

- `f-tcell` aligment in `f-table-schema` fixed.

## [2.4.0] - 2024-03-01

### Features

- a11y support added.

## [2.2.5] - 2024-02-09

### Bug Fixes

- `f-table-schema` : First cell content with checkbox is getting wrapped when content is large ot external template.

## [2.2.4] - 2024-01-16

### Improvements

- `f-table-schema` : Added `sticky-cell-background` property.
- (Note: Any sticky element requires a background color; therefore, sometimes adjustments to this property may be needed when used with different surface backgrounds.)

## [2.2.3] - 2023-12-14

### Bug Fixes

- `:scope > ` querySelector not working in some browser

## [2.2.2] - 2023-12-13

### Bug Fixes

- `f-table-schema` : header checkbox not updating state when rows selection updated.
- `@row-click` emitted when checkbox clicked.

## [2.2.1] - 2023-12-12

### Improvements

- `f-table-schema` : `@header-input` emitted when checkbox from header is clicked.

## [2.2.0] - 2023-11-28

### Minor Changes

- `align` property introduced on `f-tcell`.

## [2.1.0] - 2023-11-28

### Minor Changes

- `lit` upgraded to v3.

## [2.0.8] - 2023-11-28

### Improvements

- `f-trow` : `chevron` reference added to trigger click externally using JS.

## [2.0.7] - 2023-11-20

### Improvements

- `f-table-schema` : `slot="no-data"` support added to customize message when there are 0 rows.

## [2.0.6] - 2023-11-08

### Improvements

- `f-table-schema` : `@sort` event emitted when clicked on sort icon in header cell.

## [2.0.5] - 2023-11-01

### Bug Fixes

- Vue : `f-table` gridTemplate creation fixed

## [2.0.4] - 2023-10-16

### Improvements

- `disabled` added for f-table-cell actions.

## [2.0.3] - 2023-10-12

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
- `@ollion/flow-core-config@1.1.3`
- `@ollion/flow-core@2.0.3`

## [2.0.2] - 2023-10-10

### Patch Changes

- a2de106: Fix platform types
- Updated dependencies [a2de106]
- `@ollion/flow-core-config@1.1.1`
- `@ollion/flow-core@2.0.1`

## [2.0.1-beta.0] - 2023-10-10

### Patch Changes

- Fix platform types
- Updated dependencies
- `@ollion/flow-core-config@1.1.1-beta.0`
- `@ollion/flow-core@2.0.1-beta.0`

## [2.0.0] - 2023-10-10

### Major Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
- `@ollion/flow-core@2.0.0`
<hr className="margin-btm-32" />

## [1.3.4] - 2023-10-05

### Bug Fixes

- `f-tcell` : options are aligned in middle.
- `f-table-schema` : string sort issue fixed.

## [1.3.3] - 2023-09-29

### Bug Fixes

- `f-tcell` : gap and aligment issue fixed.

## [1.3.2] - 2023-09-13

### Bug Fixes

- `f-table-schema` : cell with template not taking full width.

## [1.3.1] - 2023-09-13

### Improvements

- `f-table-schema` generics added in types.

## [1.3.0] - 2023-08-23

### Features

- `f-table-schema` : `header-cell-template` prop added for a common header-cell template.

## [1.2.4] - 2023-08-21

### Bug Fixes

- `f-table-schema` : When a cell contains a large amount of text content and is used without a template, the table will display a scrollbar.

## [1.2.3] - 2023-08-18

### Bug Fixes

- `f-tcell` : text and content not rendering while exporting using `jspdf`.

## [1.2.2] - 2023-07-20

### Improvements

- `f-tcell` : In actions callback, passing additional parameter as element for further implementation (like opening popover).

## [1.2.1] - 2023-07-20

### Improvements

- `f-table-schema` : `@row-click` event emitted with row object

### Bug Fixes

- `f-table-schema` : `show-search-bar` not working in vue

## [1.2.0] - 2023-07-18

### Features

- `f-table-schema` : expandIconPosition position made configurable.
- `f-trow` now supports `expand-icon-position` attribute.
- `f-tcell` actions now supports tooltip

### Improvements

- `part="cell"` added `f-table-schema` to support external styles.

### Bug fixes

- `f-table-schema` : external template alignment fixed.

## [1.1.1] - 2023-07-13

### Bug Fixes

- `f-table-schema` : details slot width issue fixed.

## [1.1.0] - 2023-07-11

### Features

- `f-table-schema` : Search on a specific column

### Improvements

- Action in the cell requires id (in case of displaying popover)
- Disable row selection for a specific rows
- Hide sort on a specific columns

### Bug Fixes

- Sort doesn’t work if we have the search term
- Highlight row not changing the background of the sticky column

## [1.0.2] - 2023-06-13

### Bug Fixes

- `f-table-schema` : duplicate vue3 types export bug fixed.

## [1.0.1] - 2023-06-13

### Improvements

- `f-table-schema` : `data` property options doc added.
- More stories added to understand properties and events of `f-table-schema`.

### Bug Fixes

- `f-table-schema` : alignment fixed when used inside `f-div`.
- `f-table-schema` : background color fixed when variant="stripped" with sticy column combination.

## [1.0.0] - 2023-06-08

### Improvements

- `f-table-schema` : api updated
- `f-table-schema` : `@row-input` event added whenever row is checked/unchecked.
- `f-table-schema` : `@toggle-row-details` event added whenever row details open or closed.
- `f-table-schema` : `@header-selected` event added whenever row column header is selected.
- `f-table-schema` : `showSearchBar` property added to disable or enable searchbar.
- `f-table-schema` : `searchTerm` property added to accept searchTerm externally.

## [0.1.0-beta2] - 2023-06-08

### Note : Published for testing

### Features

- `f-table-schema` : Sticky row and column feture added.
- `f-table-schema` : Search, sort, infinite scroll features added.

## [0.0.1] - 2023-05-02

### Improvements

- First release
