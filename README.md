
# @cldcvr/flow-core
A design system for enterprise-level products. Create an efficient and enjoyable work experience.


## Quick Start Install

1.  First, install the Clarity Core package from npm.

    ```bash
    yarn add @cldcvr/flow-core
    ```

2.  Import Web Componentsr into your JavaScript or TypeScript

    ```typescript
    import '@cldcvr/flow-core';
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

## VSCode plugin

 Install [Flow intellisense](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode) for best editing experience.