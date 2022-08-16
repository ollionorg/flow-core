# Flow/flow-core

A design system that consists of principles, patterns, guidelines, and processes to enable design at scale; without compromising on the developer experience and design standards of CloudCover. 

It serves as a shared language for all involved in design and product.

## Benefits
* Framework agnostic - Flow will work with most modern JavaScript frameworks.
* Developer experience is a core value for Flow. Learn more here. 
  * Flow Figma and Flow front-end framework speak the same language. 
  * VScode intellisense plugin
  * Slack community
  * Create easy layouts with f-div
* Flow dependencies - you can pick and choose what packages are specifically required for your build. 
* Flow bundles (coming soon)

## Pre-requisites

##### 1) A Javascript front-end language
Flow works with most languages; we have covered the popular ones in this document. 
* VueJS | [Quickstart guide](https://vuejs.org/guide/quick-start.html#with-build-tools)
* Angular
* React

##### 2) VScode plugin
Flow's VScode plugin allows you to quickly access components' properties, its values, and documentation without leaving the editor. You can find the plugin here → [Flow intellisense](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) 

##### 3) Browser debugger - developers
* [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/)
* [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)


## Getting started - developers

Copy paste the below snippets in **VueJS:** (src/main.ts or main.js), **Angular:** ?, **React:** ?

Note: after adding the snippets; re-start your application.

#### Step 1: Install the flow core + flow icons dependency
1. **flow-core**  ```yarn add @cldcvr/flow-core```
2. **f-icon** ```yarn add @cldcvr/flow-icon``` | [Github](https://github.com/cldcvr/flow-icon)


#### Step 2: Import flow-core and it's dependecies into your project

```
import '@cldcvr/flow-core';
import "@cldcvr/flow-core/dist/style.css";
import "@cldcvr/flow-icon";
```


#### Step 3 (optional): Install dependencies 
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