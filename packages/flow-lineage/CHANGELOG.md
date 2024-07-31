<h4 class="margin-btm-8">Release Notes</h4>

# Change Log

## [3.2.2] - 2024-07-08

### Patch Changes

- `vue` component types updated.

## [3.2.1] - 2024-03-19

### Improvements

- `fClick` callback added in the link.
- `label` property added to display a label on the link.
- `showLabelOn` property added to customize label displaying behaviour either on click or hover;
- The `tooltip` property was added to display more information about the link

## [3.2.0] - 2024-03-19

### Features

- `direction="vertical"` implemented in `f-lineage`.

## [3.1.1] - 2023-12-19

### Patch Changes

- 🔄 Updated the template rendering logic of d3's `foreignObject` for enhanced security against HTML injection. 🛡️

## [3.1.0] - 2023-11-27

### Minor Changes

- `lit` upgraded to v3.

## [3.0.3] - 2023-10-12

### Patch Changes

- Remove sideEffects because the components require registration via import
- Updated dependencies
- `@nonfx/flow-core-config@1.1.3`
- `@nonfx/flow-core@2.0.3`

## [3.0.2] - 2023-10-10

### Patch Changes

- a2de106: Fix platform types
- Updated dependencies [a2de106]
- `@nonfx/flow-core-config@1.1.1`
- `@nonfx/flow-core@2.0.1`

## [3.0.1-beta.0] - 2023-10-10

### Patch Changes

- Fix platform types
- Updated dependencies
- `@nonfx/flow-core-config@1.1.1-beta.0`
- `@nonfx/flow-core@2.0.1-beta.0`

## [3.0.0] - 2023-10-10

### Major Changes

- Migrated to monorepo structure and removed the need for custom CSS

### Patch Changes

- Updated dependencies
- `@nonfx/flow-core@2.0.0`
<hr class="margin-btm-32" />
<p class="margin-btm-24">All notable changes to this project will be documented in this file. See <a>Conventional Commits</a> for commit guidelines. </p>

## [2.0.1] - 2023-09-11

### Improvements

- `ResizeObserver` used instead of window's `resize` event for better accuracy.
- Re-size debounce timeout updated for better user experience.

## [2.0.0] - 2023-07-05

### BREAKING CHANGES :alert: :alert:

- We have recently addressed a security hotspot that had the potential for Code Injection. In our previous implementation, we were utilizing eval for the node template functionality. As a result, we strongly recommend that you update your existing node template APIs to the latest version.
- By updating to the latest version, you will benefit from the security improvements we have implemented, mitigating the risk of Code Injection vulnerabilities. Please refer (here)[https://github.com/ollionorg/flow-core#script] to update `node-template`.

## [1.4.6] - 2023-07-04

### Improvements

- Debugging console.log removed.
- Snapshot test added.

### Bug fixes

- Typescript error in `curve-steps.js`.
- Empty links not plotting lineage.

## [1.4.5] - 2023-06-19

### Bug fixes

- `flow-core` css duplication fixed.

## [1.4.3] - 2023-06-19

### Improvements

- `flow-core` css updated.

## [1.4.2] - 2023-05-18

### Improvements

- Slack notifications integrated

## [1.4.1] - 2023-05-16

### Improvements

- Sonar scan fixes

## [1.4.0] - 2023-03-09

### Improvements

- `sourceMap` included.
- dependecies excluded from bundling.

## [1.3.9] - 2023-02-21

### Bug fixes

- `nodeMeta` event name for opening meta-data changed to `node-meta`

## [1.3.8] - 2023-02-20

### Improvements

- `fNodeMeta` is added, and when it is provided, then on right click of any node, popover opens displaying the node-meta data.

## [1.3.7] - 2023-02-14

### Bug fixes

- open/close children bug in storybook canvas tab.

## [1.3.6] - 2023-02-06

### Improvements

- Following node properties renamed :
  - `nodeTemplate` -> `fNodeTemplate`
  - `templateData` -> `fData`
  - `children` -> `fChildren`
  - `hideChildren` -> `fHideChildren`
  - `click` -> `fClick`
  - `rightClick` -> `fRightClick`
- Error displayed on console + in node when `fData` is undefined.

## [1.3.5] - 2023-02-03

### Bug fixes

- Browser crash issue due to application of Proxy on Proxy fixed.

## [1.3.4] - 2023-02-03

### Bug fixes

- Debounce added on resize event

## [1.3.3] - 2023-02-01

### Bug fixes

- Proxy set bug fixed

## [1.3.2] - 2023-02-01

### Improvements

- debug statements removed.

## [1.3.1] - 2023-01-30

### Improvements

- Hot update feature improved and new object assignment support added.

## [1.3.0] - 2023-01-30

### Features

- 🔥 Hot update when user changes `templateData`.

## [1.2.3] - 2023-01-28

### Improvements

- Primary outline added when node is highlighted.
- `data` from node schema is renamed to `templateData`.
- `background` propetry added to customize background of `f-lineage`.

## [1.2.2] - 2023-01-24

### Improvements

- Show dashed hidden children links when node is focused.

## [1.2.1] - 2023-01-24

### Bug Fix

- Background link not shifting when we toggle children.

## [1.2.0] - 2023-01-23

### Improvements

- Outgoing backward connection's gap delta logic updated.

## [1.1.9] - 2023-01-23

### Improvements

- Same-level link logic implemented.

### Bug fixes

- Backward connection going though node
- Curve angle glitch fixed.
- When we exapnd collapse nodes were overlapping.
- Chart is dragged if root has backward connection. (Logic updated)

## [1.1.8] - 2023-01-20

### Improvements

- links plotting algorithm updated

## [1.1.7] - 2023-01-18

### Bug Fixes

- Retain zoom and drag levels if nodes or links updated.
- Extra gap issue fixed while plotting distant links.
- Chart is dragged if root has backward connection.

## [1.1.6] - 2023-01-17

### Bug Fixes

- Safari: zoom in/zoom out fixed

## [1.1.5] - 2023-01-17

### Bug Fixes

- `children` typescript type updated.

## [1.1.4] - 2023-01-17

### Bug Fixes

- `children` typescript type updated.

## [1.1.3] - 2023-01-17

### Improvements

- `children` data type `Array` converted to `Object`.

## [1.1.2] - 2023-01-12

### Bug Fixes

- Storybook control update not updating lineage component.

## [1.1.1] - 2023-01-11

### Bug Fixes

- Vue 2 : property name with hyphen support added.

## [1.1.0] - 2023-01-11

### Bug Fixes

- `links` vanishing bug resolved.

## [1.0.9] - 2023-01-10

### Bug Fixes

- `width` and `height` isssue solved when rendred other than `f-div`.

## [1.0.8] - 2023-01-9

### Bug Fixes

- `width` and `height` isssue solved when rendred other than `f-div`.

## [1.0.7] - 2023-01-9

### Improvements

- `max-childrens` renamed to `max-children`.
- `width` and `height` isssue solved when rendred in `f-div`.

## [1.0.6] - 2023-01-9

### Features

- Default node templates updated.

## [1.0.5] - 2023-01-4

### Features

- `rightClick` event support added in node schema.

### Improvements

- `isChildrenVisible` property changed to `hideChildren` with default value `true.`
- `degree` property changed to `stagger-load`.
- `template` field changed to `nodeTemplate` in node schema.

## [1.0.2] - 2023-01-4

### Improvements

- version added in console to debug

## [1.0.1] - 2023-01-4

### Improvements

- `README.md` updated with usage

## [1.0.0] - 2023-01-3

### Features

- Emitting `ready` event when plotting finishes.

## [0.2.3] - 2022-12-9

### Features

- `click` event support added in node schema.
- template updated to support multiple tags.

## [0.2.2] - 2022-12-8

### Improvements

- reposition nodes when children collpased.
- update flow-core and add `f-tag`.
- add node specific template.

## [0.2.1] - 2022-12-5

### Improvements

- show dot only for children links

## [0.2.0] - 2022-12-5

### Features

- Collapssible children in node

## [0.1.9] - 2022-12-2

### Features

- Auto load degree after intial render
- Show percentage of loaded

## [0.1.8] - 2022-12-2

### Improvements

- `Links` generation logic improved.
- Large data lineage story added for performance testing.

## [0.1.7] - 2022-11-28

### Improvements

- Throttle and `degree` implementation updated.

## [0.1.6] - 2022-11-28

### Improvements

- `center-node` and `degree` property added to support throttling.

## [0.1.5] - 2022-11-28

### Bug fixes

- Any node to root coonection bug fixed

## [0.1.4] - 2022-11-25

### Features

- Birectional link if `from` and `to` are swapped and added as additional link.

## [0.1.3] - 2022-11-25

### Bug fixes

- Incoming child connection error fixed.

## [0.1.2] - 2022-11-25

### Features

- `links` and `node` property support added for flat data structure.

## [0.1.1] - 2022-11-18

### Features

- `children-node-template` property support added.
- We can specify template on individual node as well (for more customization and advanced usecases)

## [0.1.0] - 2022-11-18

### Features

- `children` links features added.
- Whenever children scrolled their respective links removed.

## [0.0.9] - 2022-11-16

### Improvements

- `links` logic improved and it is not overlapping with any node

## [0.0.8] - 2022-11-15

### Features

- `links` added in node schema to support additional link to connect nth level node.
- `node-template` property added to customize node template.

## [0.0.7] - 2022-11-14

### Features

- Highlight on click of node.
- `console.time`, `console.group` added for better debugging metrices.

## [0.0.6] - 2022-11-09

### Improvements

- `children` pagination logic updated.

## [0.0.5] - 2022-11-08

### Features

- `children` with scrollbar support added.

## [0.0.4] - 2022-11-07

### Features

- `children` support added in `data` property.

## [0.0.3] - 2022-11-04

### Features

- `data`, `padding`, `gap`, `node-size` properties added.
- scroll to zoom in/out added.

## [0.0.2] - 2022-11-04

### Improvements

- `direction` feature added.

## [0.0.1] - 2022-11-01

### Improvements

- Initial release.
