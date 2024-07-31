Follow these steps to create flow theme in your project.

1. Download the theme template file with the .scss extension from [here](https://github.com/ollionorg/flow-core/blob/main/packages/flow-core/custom-theme.scss).

2. Open the downloaded file and replace the `<your-theme-name>` keyword with your desired theme name.

3. Modify all SCSS variables with your theme colors. These variables have names that start with the `$` keyword. For example, if you want to change the primary color to `#cc8899`, update the variable as follows:

```scss
$color-primary-default: #cc8899;
```

4. Once you have finished updating the color tokens, include this file in your project.

5. If your project does not support SCSS files, use the Sass [CLI](https://sass-lang.com/guide) to compile and generate a CSS file.

6. Once you have successfully added the theme file to your project, use the following API to apply the theme to your startup file.In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)

```javascript
import { ConfigUtil } from "@nonfx/flow-core";

ConfigUtil.setConfig({ theme: "<your-theme-name>" });
```
