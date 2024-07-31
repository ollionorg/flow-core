# Known Solutions

## Typescript error when you import Flow lineage in an existing project `@nonfx/flow-lineage`

![Screenshot 2023-01-09 at 9 25 04 PM](https://user-images.githubusercontent.com/67629551/211354086-3c10adb4-cd67-4cf5-8c69-cd79ac5fa095.png)

Solution : copy following snippet in any shims.d.ts file, if you don't have then create new one.

```javascript
	declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
	}

	declare module "*.css" {
	const content: Record<string, string>;
	export default content;
	}
```

<br>

## Missing icons

<img width="1170" alt="Screenshot 2023-01-05 at 5 13 48 PM" src="https://user-images.githubusercontent.com/67629551/211354190-54d9b575-a106-44c0-b80d-74f4f9d2a874.png">

Solution : You might be using old version of a flow package, you need to cross check your package.json with the latest [this](https://www.npmjs.com/search?q=%40ollion%2Fflow)

<br>

## Issue with `.npmrc` (For CloudCover developers only)

1. If you are using `@nonfx/flow` package with Azure registry then please update your `.npmrc` with following content.

```
@nonfx:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<YOUR_PERSONAL_ACCESS_TOKEN>
```

Generate your PAT (Personal access token) by using this [document](https://npm.pkg.github.com/)

2. If you are consuming any `@nonfx/` scoped private package from any different registry then publish that to [Github Registry](https://npm.pkg.github.com/), So that all `@nonfx/` scoped packages consumed from single registry.

<br>

## Width and height not applied properly.

Solution : Use `f-div` as wrapper element for Flow Lineage instead of a native element. The `f-div` can define the desired width and height.
