# Flow/flow-core

Flow-core is the base library required by any flow dependecies. It consists mostly of building blocks such design + system tokens, atoms, molecules, base themes, etc.

You learn more about flow [here](https://github.com/cldcvr/flow-core/blob/main/ABOUT.md)

## Getting started

### New project

Flow has put together starter kits with basic dependencies to get you going. Each starter kit will contain
* Flow core
* [Flow Icons](https://github.com/cldcvr/flow-icon)
  * **Note**: There are various packs for icons, the starter kit only has the essential pack (@cldcvr/flow-system-icon)
* Default google fonts (add default font names here)
* Functional Flow templates (eg: top navigation, profile interactions, responsiveness)

#### Starter kits
* [Vue JS](https://github.com/cldcvr/flow-starterkit-vue)
* [Aungular](https://github.com/cldcvr/flow-starterkit-angular)
* [React](https://github.com/cldcvr/flow-starterkit-react)

If you would like to contribute to an existing starter kit or write a new one for a different framework, write to flow@cldcvr.com or ping on our slack channel.

**VScode Plugin**: [Install Flow's Plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) to access components, icons, values, etc, and documentation inside of VScode.

**Browser Debugger**: [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/), [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)


### Existing project

Flow is aimed at being framework agnostic, but we need help getting there. So far we have only validated it on Vue JS, Angular, React.

## Getting started

Copy paste the below snippets in **VueJS:** (src/main.ts or main.js), **Angular:** @vikas?, **React:** @vikas?

#### Step 1: Install flow core + flow icons dependency
1. **flow-core**  ```yarn add @cldcvr/flow-core```
2. **f-icon** ```yarn add @cldcvr/flow-system-icon``` | [Github](https://github.com/cldcvr/flow-icon)

*Note:* after adding the snippets, re-start your application.

#### Step 2: Import flow-core and it's dependecies into your project

Copy and important the below snippet into your configuration file. In **VueJS:** (src/main.ts or main.js), **Angular:** @vikas?, **React:** @vikas?
```
import '@cldcvr/flow-core';
import "@cldcvr/flow-core/dist/style.css";
import "@cldcvr/flow-system-icon";
```

*Note:* If you are *using Vue 3*, please copy paste the below snippet *after the closing `<template>`* in your `App.vue` 

```
<style>
@import "@cldcvr/flow-core/dist/style.css";
</style> 
```

#### If you typescript enabled please include import types to

**Vue Js:** 
Copy paste below line in your `main.ts` file.
```
import "@cldcvr/flow-core/dist/types/vue2";
```
or 
```
import "@cldcvr/flow-core/dist/types/vue3";
```

**React**
Include react type in `tsconfig.json` like below
```
"include": ["src", "./node_modules/@cldcvr/flow-core/dist/types/react.ts"]
```

## Dependencies (coming soon)
* Tabs (coming soon)
* Form builder (coming soon)
* Pipelines (coming soon)
* Logs (coming soon)
* Tables (coming soon)
* Themes (coming soon)
* Time-series widgets (coming soon)
* Lineage (coming soon)
* Auth flow (coming soon)
* Admin flow (coming soon)


## Components
* Button - [documentation](https://docs.google.com/document/d/1jwpo28kx61ybL3AOVzD2XaJ-aogZSThCTHtFWeqqMp8/edit?usp=sharing) |  Storybook
* Icon - [documentation](https://docs.google.com/document/d/1kLruoml15fZCo8XUoo48xsNDVgzaDe9freI6XeP7HOs/edit#heading=h.b81ibd1zmiy) |  Storybook
* Layout (f-div) - [documentation](https://docs.google.com/document/d/1X2i89A34pOnnTarzDDbEfP_GdK7sUBshr4gvX5ZEcPY/edit?usp=sharing) |  Storybook
* Icon-button - [documentation](https://docs.google.com/document/d/1kLruoml15fZCo8XUoo48xsNDVgzaDe9freI6XeP7HOs/edit#heading=h.b81ibd1zmiy) |  Storybook
* Typography (f-text) - [documentation](https://docs.google.com/document/d/1gc2pg9aZd1NsYvTXjAREsJkVYUsuin0-BiRa9vX9QNY/edit?usp=sharing)  |  Storybook
* Tooltip - [documentation](https://docs.google.com/document/d/15k1dfr1wU3xaOj7tuxIQQcGFM5jz1SuX2_x6-91PSZo/edit?usp=sharing) |  Storybook
* Colors - [documentation](https://docs.google.com/document/d/18EwptEUyenxyj1kC_kfdYsDfETZnWQF8EqEHLdwRQv0/edit?usp=sharing) |  Storybook


## Resources
* [Documentation](https://drive.google.com/drive/u/0/folders/1K4TLqpqrY0BNjQZ4fwZK_ZF-9M69Q4is)
* Figma for designers
* Releases
