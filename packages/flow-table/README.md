# Flow Table
The Flow table is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core))

# Installation

### 1️⃣ Install flow table dependency
```
npm i --save @cldcvr/flow-table
```
**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import styles/CSS
For **Vue JS:**
Paste the below snippet after the closing `<template>` tag in your `App.vue` file
```html
<style>
 @import "@cldcvr/flow-table/dist/style.css";
</style>
```
<details>
<summary>For React</summary>

**React:** Paste the below snippet in `src/index.tsx` or `index.jsx` file
```Javascript
import "@cldcvr/flow-table/dist/style.css";
```
</details>

<details><summary>For Angular</summary>

**Angular:** Add css file path in `angular.json` in `styles` property array.

```json
"styles": ["@cldcvr/flow-table/dist/style.css"],
```
</details>

<br>

### 3️⃣ Import flow-table into your project

Paste the below snippet in your project and add your application startup/runtime code to it.

**Note:** This is required to register Flow elements error-free. We achieve this by importing all flow packages asynchronously and then starting up your application.

For **Vue JS:**
Paste the below snippet in your project, for `src/main.ts` or `main.js`
```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-table');
	//add your application startup/runtime code here **
});
```

<details>
<summary>For React</summary>

Paste the below snippet in your project, for `src/main.ts`

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import("@cldcvr/flow-table");
	//add your application startup/runtime code here **
});
```
</details>

<details><summary>For Angular</summary>

Paste the below snippet in your project, for `src/index.tsx` or `index.jsx`

</details>

<br>

### 4️⃣ For a typescript enabled project (optional)

**Note:** After adding, re-start your application. Make sure you are using version >4.5

**For Vue 3:**
Copy paste below import types in your `main.ts` file.
```Javascript
import "@cldcvr/flow-table/dist/types/vue3";
```
<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-table/dist/types/vue2";
```
</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.
```json
"include": ["src", "./node_modules/@cldcvr/flow-table/dist/types/react.ts"]
```
</details>
<br>
