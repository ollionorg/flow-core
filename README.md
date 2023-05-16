# Flow/flow-core 
![npm](https://badgen.net/npm/v/@cldcvr/flow-core) ![license](https://badgen.net/npm/license/@cldcvr/flow-core) ![types](https://badgen.net/npm/types/@cldcvr/flow-core) ![downloads](https://badgen.net//npm/dw/@cldcvr/flow-core) ![build](https://github.com/cldcvr/flow-core/actions/workflows/build.yml/badge.svg) ![release](https://github.com/cldcvr/flow-core/actions/workflows/release.yml/badge.svg) ![CodeQL](https://github.com/cldcvr/flow-core/workflows/CodeQL/badge.svg) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@cldcvr/flow-core?style=flat-square) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=bugs)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core)



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

**Note:** For Typescript, make sure you are using version >4.5

---

### Existing project

#### 1️⃣ Install flow core
```yarn add @cldcvr/flow-core```

*Note:* after installation re-start your application.

<br>

#### 2️⃣ Import CSS 
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

<br>

#### 3️⃣ Import flow-core into your project

Copy and import the below snippet into your startup file. In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)
```JavaScript
import("@cldcvr/flow-core").then(async () => {
  //your application startup code
});
```

<br>

#### 4️⃣ If your project is typescript enabled please include import types to
**Note:** For Typescript, make sure you are using version >4.5

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

### 1️⃣ Install the icon pack 
```
yarn add @cldcvr/flow-system-icon
```

### 2️⃣ Import the icon pack 

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-system-icon');
	//add your application startup code here
});
```
* [Icons Github repo](https://github.com/cldcvr/flow-icon)
* [View icons](https://flow.cldcvr.com/icons/index.html)


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
