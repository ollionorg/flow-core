<h4 class="margin-btm-8">Release Notes</h4>
<hr class="margin-btm-32" />
<p class="margin-btm-24">All notable changes to this project will be documented in this file. See <a>Conventional Commits</a> for commit guidelines. </p>

# Change Log

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

- `size`, `variant`, `category` removed from `f-form` since it is anti pattern to set it on inner input elements. (This usecase will be covered in `@cldcvr/flow-form-builder`)

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
