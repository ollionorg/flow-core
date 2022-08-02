
# @cldcvr/flow-core
A design system for enterprise-level products. Create an efficient and enjoyable work experience.


## Quick Start Install

1.  First, install the Flow Core package from npm.

    ```bash
    yarn add @cldcvr/flow-core
    ```

2.  Import Web Components into your JavaScript or TypeScript

    ```typescript
    import '@cldcvr/flow-core';
	import "@cldcvr/flow-core/dist/style.css";
    ```
## Usage

### No Framework

```html
<f-button label="submit">
  
</f-button>
<script>
  const button = document.querySelector('f-button');
  button.addEventListener('click', event => console.log(event));
  button.loading = true;
</script>
```

### Angular

```html
<!--
  - `label` is set as an HTML attribute so no binding syntax is used
  - [loading] is setting a property on the element
  - (click) is listening for the `click` event
-->

<f-button label="submit" [loading]="booleanValue" (click)="log($event.detail)">
</f-button>
```

### Vue

```html
<!--
  - `label` is set as an HTML attribute so no binding syntax is used
  - :loading is setting a property on the element
  - @click is listening for the `click` custom event
-->

<f-button label="submit" :loading="booleanValue" @click="log($event.detail)">
</f-button>
```
## Icon package
Icons are packaged separately . you can find more info [here](https://github.com/cldcvr/flow-icon)  
### Install 
```
yarn add @cldcvr/flow-icon
```

### Usage 
Register icon pack in your applilcation startup file like below.
```JavaScript
	import IconPack from "@cldcvr/flow-icon" ;
	import { ConfigUtil } from "@cldcvr/flow-core" ;
	ConfigUtil.setConfig({ iconPack: IconPack });
```
## VSCode plugin

 Install [Flow intellisense](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) for best editing experience.
