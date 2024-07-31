# Integration of Flow in Nuxt 3

## Prerequisites

Before we dive into the integration process, make sure you have a basic understanding of Nuxt.js and have set up a Nuxt project on your machine.

## Integration Steps

### Step 1: Installation

To get started, install the Flow Web Component library in your Nuxt project using your preferred package manager:

```bash
npm i --save @nonfx/flow-core
```

### Step 2: Register Flow components through a Nuxt plugin

To register all Flow components, we need to create a plugin in the `plugins` folder. Create a file named `flow.ts` and paste the following content:

```typescript
import { defineNuxtPlugin } from "nuxt";

export default defineNuxtPlugin({
	name: "flow",
	enforce: "pre",
	async setup(_nuxtApp) {
		await Promise.all([
			import("@nonfx/flow-core"),
			import("@nonfx/flow-form-builder"),
			import("@ollion/flow-system-icon")
		]).then(() => {
			console.log("Flow components loaded");
		});
	}
});
```

**Note:** You can check out the details about Flow Core [here](https://github.com/ollionorg/flow-core).

### Step 3: Update `nuxt.config.ts`

We need to inform Vite about the web components and the location of the Flow plugin. Update your `nuxt.config.ts` with the following configuration:

```typescript
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	vue: {
		compilerOptions: {
			isCustomElement: tag => tag.startsWith("f-")
		}
	},
	plugins: [
		{
			src: "~/plugins/flow",
			mode: "client"
		}
	]
});
```

## Caveats

### 1: `client-only` components

Some components require the `window` or `document` object to function properly. For such cases, wrap these components inside a `client-only` tag. An example is the `f-carousel` component:

```html
<template>
	<client-only fallback="Loading...">
		<f-div height="500px">
			<f-carousel :auto-play="true">
				<f-carousel-content v-for="slide in slides" :content-id="slide">
					<f-div
						height="300px"
						width="100%"
						padding="large"
						gap="large"
						variant="curved"
						state="secondary"
						align="middle-center"
						overflow="hidden"
					>
						<f-text size="x-large" variant="heading" align="center">
							This is client only component {{ slide }}
						</f-text>
					</f-div>
				</f-carousel-content>
			</f-carousel>
		</f-div>
	</client-only>
</template>
<script setup>
	const slides = ref(["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"]);
</script>
```

### 2: `f-form-builder`

The `f-form-builder` component accepts `field` and `values` as an `Object`. If you need support for server-side rendering (SSR), you'll have to wrap it inside a `client-only` tag for now.
