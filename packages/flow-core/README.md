# Flow-core

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-core%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-core) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-form-builder%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-form-builder) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-table%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-table) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-lineage%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-lineage) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-log%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-log) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-code-editor%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-code-editor) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-md-editor%2Fpackage.json&query=%24.version&prefix=v&logo=npm&label=%40ollion%2Fflow-md-editor)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Follionorg%2Fflow-core%2Fmain%2Fpackages%2Fflow-core%2Fpackage.json&query=%24.license&label=license) ![build](https://github.com/ollionorg/flow-core/actions/workflows/build.yml/badge.svg) ![release](https://github.com/ollionorg/flow-core/actions/workflows/release.yml/badge.svg) ![CodeQL](https://github.com/ollionorg/flow-core/workflows/CodeQL/badge.svg) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=cldcvr_flow-core&metric=bugs)](https://sonarcloud.io/summary/new_code?id=cldcvr_flow-core)

Flow-core is the base library required by any flow dependecies. It consists mostly of building blocks such design + system tokens, atoms, molecules, base themes, etc.

- [Website](https://flow.ollion.com/)
- [Learn More](https://github.com/ollionorg/flow-core/blob/main/ABOUT.md)

## Table of contents

- [Starter-kits](#starter-kits)
- [Install for an existing project](#existing-project)
- [VScode Plugin and debuggers](#vscode-plugin-and-debuggers)
- [Components](https://flow.ollion.com/v2/index.html)
- [Templates](https://flow.ollion.com/templates/index.html)
- [Resources](#resources)
- [Figma for designers](https://www.figma.com/community/file/1240565037876928288/Flow-UI-Kit)
- [Get in touch](#get-in-touch)

## Getting started

### Starter kits

For a new project, Flow has put together starter kits with basic dependencies to get you going. Each starter kit will contain Flow core, [Flow system icons](https://github.com/ollionorg/flow-icon), Default google fonts and fully functional Flow templates (eg: top navigation, profile, left navigation, etc)

#### Kits

- [Vue JS](https://github.com/ollionorg/flow-starterkit-vue)
- [Aungular](https://github.com/ollionorg/flow-starterkit-angular)
- [React](https://github.com/ollionorg/flow-starterkit-react)

If you would like to contribute to an existing starter kit or write a new one for a different framework, write to <flow@nonfx.com> or ping on our slack channel.

**VScode Plugin**: [Install Flow's Plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) to access components, icons, values, etc, and documentation inside of VScode.

**Browser Debugger**: [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/), [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)

**Note:** For Typescript, make sure you are using version >4.5

---

### Existing project

#### 1️⃣ Install flow core

`npm i --save @nonfx/flow-core`

_Note:_ after installation re-start your application.

<br>

#### 2️⃣ Import flow-core into your project

Copy and import the below snippet into your startup file. In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)

```JavaScript
import "@nonfx/flow-core";
```

<br>

#### 3️⃣ If your project uses Typescript (>4.5) please include import types

**Vue:**
Copy paste below line in your `main.ts` file.

```JavaScript
import "@nonfx/flow-core/dist/types/vue2";
```

or

```JavaScript
import "@nonfx/flow-core/dist/types/vue3";
```

**React**
Include react type in `tsconfig.json` like below

```JSON
"include": ["src", "./node_modules/@nonfx/flow-core/dist/types/react.ts"]
```

**Note:** after adding the snippets, re-start your application.

## Flow icons

Icons are not packaged with Flow core to allow more flexibility and customization. We recommend that you install the system icon pack to get started.

### 1️⃣ Install the icon pack

```sh
npm i --save @ollion/flow-system-icon
```

### 2️⃣ Import the icon pack

```javascript
import "@nonfx/flow-core";
import "@ollion/flow-system-icon";
```

- [Icons Github repo](https://github.com/ollionorg/flow-icon)
- [View icons](https://flow.ollion.com/icons/index.html)

## VScode Plugin and debuggers

[Install Flow's Plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) to access components, icons, values, etc, and documentation inside of VScode.

**Browser Debugger**: [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/), [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)

## Components

Visit the [Flow components Storybook](https://flow.ollion.com/v2/index.html)

## Templates

Visit the [Flow templates Storybook](https://flow.ollion.com/templates/index.html)

## Dependencies

- Tables (In development)
- Logs (coming soon)
- Force graph (coming soon)
- Themes (coming soon)
- Time-series (coming soon)

## Resources

- [Documentation](https://drive.google.com/drive/u/0/folders/1K4TLqpqrY0BNjQZ4fwZK_ZF-9M69Q4is)
- [Figma for designers](https://www.figma.com/community/file/1240565037876928288/Flow-UI-Kit)
- [VS code plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode)
- Releases

## Get in touch

If you would like to get in touch or contribute, please write to <flow@nonfx.com>.
