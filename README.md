# Flow/flow-core

Flow-core is the base library required by any flow dependecies. It consists mostly of building blocks such design + system tokens, atoms, molecules, base themes, etc.

You learn more about flow [here](https://github.com/cldcvr/flow-core/blob/main/ABOUT.md)

## Getting started

### For a new project

Flow has put together starter kits with basic dependencies to get you going. Each starter kit will contain Flow core, [Flow system icons](https://github.com/cldcvr/flow-icon), Default google fonts and fully functional Flow templates (eg: top navigation, profile, left navigation, etc)

#### Starter kits
* [Vue JS](https://github.com/cldcvr/flow-starterkit-vue)
* [Aungular](https://github.com/cldcvr/flow-starterkit-angular)
* [React](https://github.com/cldcvr/flow-starterkit-react)

If you would like to contribute to an existing starter kit or write a new one for a different framework, write to flow@cldcvr.com or ping on our slack channel.

**VScode Plugin**: [Install Flow's Plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) to access components, icons, values, etc, and documentation inside of VScode.

**Browser Debugger**: [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/), [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)

---

### Existing project

#### Step 1: Install flow core
```yarn add @cldcvr/flow-core```

*Note:* after installation re-start your application.


#### Step 2 : Import CSS 
**Vue:**
Paste the below snippet *after the closing `<template>`* in your `App.vue` 

```html
<style>
@import "@cldcvr/flow-core/dist/style.css";
</style> 
```
**React:** Paste the below snippet in `src/index.tsx` or `index.jsx`

```JavaScript
import "@cldcvr/flow-core/dist/style.css";
```
**Angular:** Add css file path in `angular.json` in `styles` property array.

```JSON
"styles": ["@cldcvr/flow-core/dist/style.css"],

```
#### Step 3: Import flow-core into your project

Copy and import the below snippet into your startup file. In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)
```JavaScript
import("@cldcvr/flow-core").then(async () => {
  //your application startup code
});
```
#### Step 4 : If your project is typescript enabled please include import types to

**Vue:** 
Copy paste below line in your `main.ts` file.
```JavaScript
import "@cldcvr/flow-core/dist/types/vue2";
```
or 
```JavaScript
import "@cldcvr/flow-core/dist/types/vue3";
```

**React**
Include react type in `tsconfig.json` like below
```JSON
"include": ["src", "./node_modules/@cldcvr/flow-core/dist/types/react.ts"]
```

**Note:** after adding the snippets, re-start your application.


## Flow icons

Icons are not packaged with Flow core to allow more flexibility and customization. We recommend that you install the system icon pack to get started.

### Step 1: Install the icon pack 
```
yarn add @cldcvr/flow-system-icon
```

### Step 2: Import the icon pack 

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-system-icon');
	//add your application startup code here
});
```

#### Icon packs

* Product icons (logos of other products)
* AWS cloud
* GCP cloud
* [View all](https://github.com/cldcvr/flow-icon)


## VScode Plugin and debuggers
[Install Flow's Plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) to access components, icons, values, etc, and documentation inside of VScode.

**Browser Debugger**: [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/), [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)


## Dependencies
* [Lineage](https://github.com/cldcvr/flow-lineage)
* [Form builder](https://github.com/cldcvr/flow-form-builder)
* Logs (coming soon)
* Force graph (coming soon)
* Tables (coming soon)
* Themes (coming soon)
* Time-series (coming soon)


## Components
Visit the [Flow components Storybook](https://flow.cldcvr.com/v2/index.html)


## Templates
Visit the [Flow templates Storybook](https://flow.cldcvr.com/templates/index.html)


## Resources
* [Documentation](https://drive.google.com/drive/u/0/folders/1K4TLqpqrY0BNjQZ4fwZK_ZF-9M69Q4is)
* Figma for designers
* Releases
