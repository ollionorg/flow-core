### Method 1

- To register all component of `@ollion/flow-core`, use the following snippet.

```javascript
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);
```

### Method 2

- Suppose you are only going to use f-div and f-button, and you want to import and package only these 2 components in your project, then use the following snippet.

```javascript
import { register, FDiv, FButton } from "@ollion/flow-core";
register([FDiv, FButton]);
```

<hr/>

### Note 1

- Following packages has single element hence you need to import single element from it.

```javascript
import { FLog } from "@ollion/flow-log";
import { FCodeEditor } from "@ollion/flow-code-editor";
import { FMDEditor } from "@ollion/flow-md-editor";
import { FLineage } from "@ollion/flow-lineage";

register([FLog, FCodeEditor, FMDEditor, FLineage]);
```

### Note 2

- Following packages has 2 or more element, and almost all time all elements are required to register along with flow-core

```javascript
import { flowTableElements } from "@ollion/flow-table";
import { flowFormBuilderElements } from "@ollion/flow-form-builder";

register([...flowTableElements, ...flowFormBuilderElements]);
```
