import type { TypedFlatConfigItem } from "#/types/type";
import { reactPlugin } from "#/utils/extension";
import { configName, renameRules } from "#/utils/naming";

export const react = (): TypedFlatConfigItem[] => {
  const recommendedRules = renameRules(
    reactPlugin.configs.recommended.rules,
    {
      "@eslint-react/naming-convention": "react-naming-convention",
      "@eslint-react/hooks-extra": "react-hooks-extra",
      "@eslint-react/dom": "react-dom",
      "@eslint-react": "react",
    },
  );

  return [
    {
      name: configName("react", "rules"),
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        "react": reactPlugin.configs.all.plugins["@eslint-react"],
        "react-dom": reactPlugin.configs.all.plugins["@eslint-react/dom"],
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
        ...recommendedRules,
      },
    },
  ];
};
