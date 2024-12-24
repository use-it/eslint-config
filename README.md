# @bluzzi/eslint-config
A ready-to-use ESLint config preset that's highly opinionated and strict on best practices, allowing you to both lint and [format](https://eslint.style/guide/why) any file that can be used in the JavaScript ecosystem.

- 📖 formatting (Prettier alternative) with only basic configurations (semi, quotes, indent)
- ⚒️ very strict rules for JS and TS, which encourages best practices
- 🌏 designed to work with TS, JSX, React, JSON, YAML, TOML, GraphQL, CSS, HTML and Markdown
- ✅ automatically enables specific rules based on your dependencies
- 🧲 uses the recommended shared configs (ESLint, TSLint, Stylistic...)

If you're looking for a less opinionated configuration with more customization possibilities, we recommend the [Antfu preset](https://github.com/antfu/eslint-config).

## Installation
Installing the config preset in your project.

### Packages
```
npm install -D eslint @bluzzi/eslint-config
```
```
yarn add --dev eslint @bluzzi/eslint-config
```
```
pnpm install -D eslint @bluzzi/eslint-config
```

### Configuration file
Create the `eslint.config.mjs` file at the root of the project and add the minimum configuration:
```js
import { eslintConfig } from "@bluzzi/eslint-config";

export default eslintConfig();
```

### Scripts
In your package.json file, you can optionally add the following scripts to easily run ESLint in your project:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support
Installation and configuration of the VS Code plugin to take advantage of an automatic correction when saving a file, as well as a display of problems.

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and add the following settings to your `.vscode/settings.json`:
```jsonc
{
  // Enable the ESlint flat config support:
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead:
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix:
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them:
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages:
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "gql",
    "graphql"
  ]
}
```

## Customization
To enable TS [type aware rules](https://typescript-eslint.io/getting-started/typed-linting) (recommended for best practice with TS), you need to define the relative path to your `tsconfig.json`:
```js
export default eslintConfig({
  typescript: { tsconfigPath: `./tsconfig.json` },
});
```

You can adjust some formatting options for your code, but we recommend sticking to [Stylistic](https://eslint.style/guide/config-presets)'s default rules for consistency within the JS community:
```js
export default eslintConfig({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
});
```

Finally, you can make full use of the power of [ESLint's flat configs](https://eslint.org/docs/latest/use/configure/configuration-files) to extend the configuration as much as you like:
```js
export default eslintConfig(
  {
    // The configuration options offered by our package
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs:
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
);
```

## Thanks
- [Anthony Fu](https://github.com/antfu), for his [config preset](https://github.com/antfu/eslint-config) and its work on [Stylistic](https://eslint.style/)
- [ESLint team](https://eslint.org/team/), for this [amazing project](https://eslint.org/) that pushes the whole JS ecosystem forward

## License
This package is MIT licensed.