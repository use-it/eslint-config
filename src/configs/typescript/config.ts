import type { ParamsTS } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { typescriptParser, typescriptPlugin } from "#/utils/extension";
import { configName, renameRules } from "#/utils/naming";
import { cwd } from "node:process";

export const typescript = ({ tsconfigPath }: ParamsTS = {}): TypedFlatConfigItem[] => {
  const isTypeChecked = typeof tsconfigPath !== "undefined";

  const recommendedRules = isTypeChecked
    ? renameRules(typescriptPlugin.configs["strict-type-checked"]?.rules ?? [], { "@typescript-eslint": "ts" })
    : renameRules(typescriptPlugin.configs.strict?.rules ?? [], { "@typescript-eslint": "ts" });

  const stylisticRules = typescriptPlugin.configs["stylistic-type-checked"]?.rules;

  return [
    {
      name: configName("typescript", "plugins"),
      plugins: {
        ts: typescriptPlugin,
      },
    },
    {
      name: configName("typescript", "parsers"),
      languageOptions: {
        parser: typescriptParser,
        parserOptions: isTypeChecked
          ? {
              projectService: { defaultProject: tsconfigPath },
              tsconfigRootDir: cwd(),
            }
          : {},
      },
    },
    {
      name: configName("typescript", "rules"),
      files: ["**/*.?([cm])[jt]s?(x)"],
      rules: {
        ...recommendedRules,
        ...stylisticRules,
        "ts/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports", fixStyle: "separate-type-imports" }],
        "ts/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: false }],
        "ts/no-import-type-side-effects": "error",
        "ts/method-signature-style": ["error", "property"],
        "ts/no-require-imports": "error",
        "no-loss-of-precision": "off",
        "ts/no-loss-of-precision": "error",
        "ts/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
        "no-use-before-define": "off",
        "ts/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
        // "ts/explicit-function-return-type": ["error", { allowExpressions: true }], // TODO: really effective? It's often annoying on the frontend.
        "ts/explicit-member-accessibility": "error",
        "ts/explicit-module-boundary-types": "error",
        "ts/no-invalid-void-type": "off", // TODO: for undefined generics types (temporary?)
        "ts/prefer-enum-initializers": "error",
        "ts/prefer-find": "error",
        "ts/prefer-readonly": "error",
        "ts/prefer-regexp-exec": "error",
        "ts/promise-function-async": "error",
        "ts/require-array-sort-compare": "error",
        "no-return-await": "off",
        "ts/return-await": "error",
        "ts/strict-boolean-expressions": "error",
        "ts/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }], // https://github.com/orgs/react-hook-form/discussions/8622
      },
    },
  ];
};
