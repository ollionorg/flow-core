# Flow Table

The Flow table is built on the Flow design framework ([website](https://flow.cldcvr.com/) / [github](https://github.com/cldcvr/flow-core))

# Installation

### 1️⃣ Install flow table dependency

```
npm i --save @cldcvr/flow-table
```

**Note:** after installation, re-start your application.

<br>

### 2️⃣ Import flow-table into your project

Paste the below snippet in your project and add your application startup/runtime code to it.

```javascript
import "@cldcvr/flow-core";
import "@cldcvr/flow-table";
```

<br>

### 3️⃣ For a typescript enabled project (optional)

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
