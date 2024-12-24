/* eslint-disable ts/no-unsafe-assignment, ts/no-unsafe-member-access */

import type { TypedFlatConfigItem } from "#/types/type";
import { reactHooksPlugin, reactPlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export const react = (): TypedFlatConfigItem[] => {
  return [
    {
      name: configName("react", "rules"),
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        "react": reactPlugin.configs.all.plugins["@eslint-react"],
        "react-dom": reactPlugin.configs.all.plugins["@eslint-react/dom"],
        "react-hooks": reactHooksPlugin,
        "react-hooks-extra": reactPlugin.configs.all.plugins["@eslint-react/hooks-extra"],
        "react-naming-convention": reactPlugin.configs.all.plugins["@eslint-react/naming-convention"],
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: "module",
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
      },
    },
  ];
};
