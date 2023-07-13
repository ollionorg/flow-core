<h4 class="margin-btm-8">Release Notes</h4>
<hr class="margin-btm-32" />

# Change Log

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
