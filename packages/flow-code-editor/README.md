# Flow Code Editor
The Flow code editor is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core)) using [Monaco Editor](https://microsoft.github.io/monaco-editor/)

# Installation

### 1️⃣ Install flow code editor dependency
```
yarn add @cldcvr/flow-code-editor
```
**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import styles/CSS 
For **Vue JS:** 
Paste the below snippet after the closing `<template>` tag in your `App.vue` file
```html
<style>
 @import "@cldcvr/flow-code-editor/dist/style.css";
</style> 
```
<details>
<summary>For React</summary>

**React:** Paste the below snippet in `src/index.tsx` or `index.jsx` file
```Javascript
import "@cldcvr/flow-code-editor/dist/style.css";
```
</details>

<details><summary>For Angular</summary>

**Angular:** Add css file path in `angular.json` in `styles` property array.

```json
"styles": ["@cldcvr/flow-code-editor/dist/style.css"],
```
</details>

<br>

### 3️⃣ Import flow-code-editor into your project

Paste the below snippet in your project and add your application startup/runtime code to it. 

**Note:** This is required to register Flow elements error-free. We achieve this by importing all flow packages asynchronously and then starting up your application.

For **Vue JS:** 
Paste the below snippet in your project, for `src/main.ts` or `main.js`
```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-code-editor');
	//add your application startup/runtime code here **
});
```

<details>
<summary>For React</summary>

Paste the below snippet in your project, for `src/main.ts`

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import("@cldcvr/flow-code-editor");
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
import "@cldcvr/flow-code-editor/dist/types/vue3";
```
<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-code-editor/dist/types/vue2";
```
</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.
```json
"include": ["src", "./node_modules/@cldcvr/flow-code-editor/dist/types/react.ts"]
```
</details>
<br>

# Integration in Vite App

### Add following code snippet in `vite.config.ts`

```typescript
import * as fs from "fs";
import * as path from "path";

const copyDir = (src, dest, callback?: (er: Error) => void) => {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err);
        return;
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item);
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);

            if (stat.isFile()) {
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
            } else if (stat.isDirectory()) {
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};

copyDir("node_modules/@cldcvr/flow-code-editor/dist/assets", "assets");
```

### add specify `assets` folder in `assetsInclude` property.

For example

```typescript
export default defineConfig({
  plugins: [vue()],
  base: "",
  // `assets` folder specified here 👇 
  assetsInclude: ["assets"],
});
```