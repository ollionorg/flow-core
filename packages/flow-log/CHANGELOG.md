<h4 className="margin-btm-8">Release Notes</h4>

# Change Log

## [2.1.1] - 2024-07-08

### Patch Changes

- `vue` component types updated.

## [2.1.0] - 2024-03-28

### Features

- f-log : `label` property introduced to display label at top-left.
- f-log : `header` slot introduced to display meta info after search bar.
- f-log : `actions` slot introduced to display additional actions menu or icons at top-right.
- f-log : formatting colors updated.
- f-log : search bar and log level selection elements style updated.

## [2.0.6] - 2024-03-23

### Bug Fixes

- Not clearing highlight of last search

## [2.0.5] - 2024-03-23

### Bug Fixes

- Scroll to searchKeyword when available.

## [2.0.4] - 2024-03-21

### Bug Fixes

- Scroll to searchKeyword when available.

## [2.0.3] - 2024-02-12

### Improvements

- Scrollbar visibility enabled in F-log element.

## [2.0.2] - 2024-02-07

### Improvements

- `search-keyword` added to `f-log` element, to control search externally.

## [2.0.1] - 2023-12-18

### Patch Changes

- Updated ES6 import syntax for `mark.js`

## [2.0.0] - 2023-12-11

### Major/Breaking Changes

- 🚫 Removed show-search and show-scrollbar attributes.
- 🪓 Dropped the internal dependency on xterm.js. (We're more independent now!)

### Features

- 🎨 Now rocking native HTML for log display. (Goodbye, unnecessary complexity!)
- 🚀 Handling logs like a champ with batch processing for over 1,000 lines. (Performance boost!)
- 🧰 Say hello to the show-toolbar attribute, bringing you filter, search, and Jump to Line tools. (Tools at your fingertips!)
- 🔍 Introducing the highlight-keywords property. Customize word highlighting to your heart's content. (Show off those important terms!)
- 🔄 Added the wrap-text attribute for toggling line wrapping. (Readability, you're in control!)

## [1.1.0] - 2023-11-27

### Minor Changes

- `lit` upgraded to v3.

## [1.0.3] - 2023-10-12

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
- `@nonfx/flow-core-config@1.1.3`
- `@nonfx/flow-core@2.0.3`

## [1.0.2] - 2023-10-10

### Patch Changes

- a2de106: Fix platform types
- Updated dependencies [a2de106]
- `@nonfx/flow-core-config@1.1.1`
- `@nonfx/flow-core@2.0.1`

## [1.0.1-beta.0] - 2023-10-10

### Patch Changes

- Fix platform types
- Updated dependencies
- `@nonfx/flow-core-config@1.1.1-beta.0`
- `@nonfx/flow-core@2.0.1-beta.0`

## [1.0.0] - 2023-10-10

### Minor Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
- `@nonfx/flow-core@2.0.0`
<hr className="margin-btm-32" />

## [0.0.1] - 2023-05-29

### Features

- `f-log` package added.
