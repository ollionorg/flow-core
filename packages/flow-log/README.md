# Flow Log

The Flow Log is built on the Flow design framework ([website](https://flow.ollion.com/) / [github](https://github.com/ollionorg/flow-core)) using [Monaco Editor](https://microsoft.github.io/monaco-editor/)

# Installation

### 1️⃣ Install flow code editor dependency

```
npm i --save @nonfx/flow-log
```

**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import flow-log into your project

Paste the below snippet in your project and add your application startup/runtime code to it.

```javascript
import "@nonfx/flow-core";
import "@nonfx/flow-log";
```

<br>

### 3️⃣ For a typescript enabled project (optional)

**Note:** After adding, re-start your application. Make sure you are using version >4.5

**For Vue 3:**
Copy paste below import types in your `main.ts` file.

```Javascript
import "@nonfx/flow-log/dist/types/vue3";
```

<details>
<summary>For Vue 2</summary>

Copy paste below import types in your `main.ts` file.

```Javascript
import "@nonfx/flow-log/dist/types/vue2";
```

</details>

<details>
<summary>For React</summary>

**React**: Include react type in `tsconfig.json` file like below.

```json
"include": ["src", "./node_modules/@nonfx/flow-log/dist/types/react.ts"]
```

</details>
<br>
