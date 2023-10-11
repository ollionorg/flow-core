<h4 className="margin-btm-8">Release Notes</h4>

## 1.0.3

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
  - @cldcvr/flow-core-config@1.1.3
  - @cldcvr/flow-core@2.0.3

## 1.0.2

### Patch Changes

- a2de106: Fix platform types
- Updated dependencies [a2de106]
  - @cldcvr/flow-core-config@1.1.1
  - @cldcvr/flow-core@2.0.1

## 1.0.1-beta.0

### Patch Changes

- Fix platform types
- Updated dependencies
  - @cldcvr/flow-core-config@1.1.1-beta.0
  - @cldcvr/flow-core@2.0.1-beta.0

## 1.0.0

### Minor Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
  - @cldcvr/flow-core@2.0.0
  <hr className="margin-btm-32" />

# Change Log

## [0.2.0] - 2023-08-03

### Features

- `title` prop added to display title in the header.
- `comments` prop added to display comment toggling button in the header.
- `copy-button` prop added to display copy button in the header, which on click copies the entire code.
- `show-line-numbers` prop added to toggle line no.'s'.
- `state` prop introduced, for changing the background-color of the code-editor.
- `read-only` prop added for edit and read-only mode in code-editor.

## [0.1.0] - 2023-06-09

### Features

- `content-change` event added to listen on updates in editor.

## [0.0.9] - 2023-05-30

### Note

- This package uses `Workers` so please go though installation instruction from [README](https://github.com/cldcvr/flow-core/blob/main/packages/flow-code-editor/README.md)

### Improvements

- First release
