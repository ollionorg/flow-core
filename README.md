# Flow/flow-core

A design system that consists of principles, patterns, guidelines, and processes to enable design at scale; without compromising on the developer experience and design standards of CloudCover. 

It serves as a shared language for all involved in design and product.

## Benefits
* Framework agnostic - Flow will work with most modern JavaScript frameworks.
* Developer experience is a core value for Flow. Learn more here. 
  * Flow Figma and Flow front-end framework speak the same language. 
  * VScode intellisense plugin
  * Slack community
  * Create easy layouts with f-layout
* Flow dependencies - you can pick and choose what packages are specifically required for your build. 
* Flow bundles (coming soon)

## Resources
* [Documentation](https://drive.google.com/drive/u/0/folders/1K4TLqpqrY0BNjQZ4fwZK_ZF-9M69Q4is)
* Figma for designers
* Releases

## Pre-requisites

##### 1) A Javascript front-end language
Flow works with most languages; we have covered the popular ones in this document. 
* VueJS [Quickstart guide](https://vuejs.org/guide/quick-start.html#with-build-tools) (Required - TypeScript, JSX Support, and what else)
* Angular
* React

##### 2) VScode plugin
Flow's VScode plugin allows you to quickly access components' properties, its values, and documentation without leaving the editor.  
[Flow intellisense](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) 

##### 3) Browser debugger
* [Chrome](https://chrome.google.com/webstore/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/web-component-devtools/)
* [Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/adding_a_web_development_tool_to_safari_web_inspector)


## Getting started - developers

#### Step 1: Install the flow core package
* Using npm: ```npm install @cldcvr/flow-core```
* Using yarn: ```yarn add @cldcvr/flow-core```

#### Step 2: Install required dependencies 
* [Icon (required for flow core)](https://github.com/cldcvr/flow-icon) ```yarn add @cldcvr/flow-icon```
* Form builder (coming soon)
* Pipelines (coming soon)
* Logs (coming soon)
* Tables (coming soon)
* Themes (coming soon)
* Time-series widgets (coming soon)
* Lineage (coming soon)
* Auth flow (coming soon)
* Admin flow (coming soon)


#### Step 3: Import flow-core and it's dependecies into your project

1. **VueJS:** main.ts / main.js
2. **Angular:** ?
3. **React:** ?

##### For flow-core
```
import '@cldcvr/flow-core';
import "@cldcvr/flow-core/dist/style.css";
```

##### For flow-icon
```
import "@cldcvr/flow-icon";
```

Note: after importing, re-run your application.

## Components
* Button [documentation](https://docs.google.com/document/d/1jwpo28kx61ybL3AOVzD2XaJ-aogZSThCTHtFWeqqMp8/edit?usp=sharing)
* Icon [documentation](https://docs.google.com/document/d/1kLruoml15fZCo8XUoo48xsNDVgzaDe9freI6XeP7HOs/edit#heading=h.b81ibd1zmiy)
* Tooltip [documentation](https://docs.google.com/document/d/15k1dfr1wU3xaOj7tuxIQQcGFM5jz1SuX2_x6-91PSZo/edit?usp=sharing)
* Colors [documentation]()

