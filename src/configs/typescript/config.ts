import type { ParamsTS } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { typescriptParser, typescriptPlugin } from "#/utils/extension";
import { cwd } from "node:process";

export const typescript = ({ tsconfigPath }: ParamsTS = {}): TypedFlatConfigItem => {
  const isTypeChecked = typeof tsconfigPath !== "undefined";

  const recommendedRules = isTypeChecked
    ? typescriptPlugin.configs["strict-type-checked"]?.rules ?? []
    : typescriptPlugin.configs.strict?.rules ?? [];

  const stylisticRules = typescriptPlugin.configs["stylistic-type-checked"]?.rules;

  return {
    name: "bluzzi/typescript",
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: isTypeChecked
        ? {
            projectService: { defaultProject: tsconfigPath },
            tsconfigRootDir: cwd(),
          }
        : {},
    },
    files: ["**/*.?([cm])[jt]s?(x)"],
    rules: {
      ...recommendedRules as Record<string, string>,
      ...stylisticRules,
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports", fixStyle: "separate-type-imports" }],
      "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: false }],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off", // TODO: Check if this rule is relevant
      "@typescript-eslint/no-invalid-void-type": "off", // TODO: for undefined generics types (temporary?)
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-find": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-regexp-exec": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "no-return-await": "off",
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/strict-boolean-expressions": "off", // TODO: Check if this rule is relevant
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }], // https://github.com/orgs/react-hook-form/discussions/8622
      "@typescript-eslint/no-non-null-assertion": "off", // TODO: Check if this rule is relevant
      "@typescript-eslint/no-confusing-void-expression": "off", // TODO: Check if this rule is relevant
      "@typescript-eslint/prefer-nullish-coalescing": "off", // TODO: Check if this rule is relevant
    },
  };
};
