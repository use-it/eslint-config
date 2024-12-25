import type { TypedFlatConfigItem } from "#/types/type";
import { reactPlugin } from "#/utils/extension";

export const react = (): TypedFlatConfigItem => {
  return {
    name: "bluzzi/react",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      ...reactPlugin.configs.recommended.plugins,
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
    },
  };
};
