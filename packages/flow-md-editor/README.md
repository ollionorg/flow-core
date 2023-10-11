# Flow MD Editor

The Flow md editor is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core)) using [Monaco Editor](https://microsoft.github.io/monaco-editor/)

# Installation

### 1️⃣ Install flow code editor dependency

```
npm i --save @cldcvr/flow-md-editor
```

**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import flow-md-editor into your project

Paste the below snippet in your project and add your application startup/runtime code to it.

**Note:** This is required to register Flow elements error-free. We achieve this by importing all flow packages asynchronously and then starting up your application.

For **Vue JS:**
Paste the below snippet in your project, for `src/main.ts` or `main.js`

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import("@cldcvr/flow-md-editor");
	//add your application startup/runtime code here **
});
```

<details>
<summary>For React</summary>

Paste the below snippet in your project, for `src/main.ts`

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import("@cldcvr/flow-md-editor");
	//add your application startup/runtime code here **
});
```

</details>

<details><summary>For Angular</summary>

Paste the below snippet in your project, for `src/index.tsx` or `index.jsx`

</details>

<br>

### 3️⃣ For a typescript enabled project (optional)

**Note:** After adding, re-start your application. Make sure you are using version >4.5

**For Vue 3:**
Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-md-editor/dist/types/vue3";
```

<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@cldcvr/flow-md-editor/dist/types/vue2";
```

</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.

```json
"include": ["src", "./node_modules/@cldcvr/flow-md-editor/dist/types/react.ts"]
```

</details>
<br>
