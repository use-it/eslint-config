// NEED REVIEW

import process from "node:process";
import type { ConfigItem, OptionsComponentExts, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from "#/utils/type";
import { GLOB_SRC } from "#/utils/glob";
import { parserTs, pluginAntfu, pluginImport, pluginTs } from "#/utils/plugin";
import { renameRules, toArray } from "#/utils/util";

export function typescript(
  options?: OptionsComponentExts & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions,
): ConfigItem[] {
  const {
    componentExts = [],
    overrides = {},
    parserOptions = {},
  } = options ?? {};

  const typeAwareRules: ConfigItem["rules"] = {
    "dot-notation": "off",
    "no-implied-eval": "off",
    "no-throw-literal": "off",
    "ts/await-thenable": "error",
    "ts/dot-notation": ["error", { allowKeywords: true }],
    "ts/no-floating-promises": "error",
    "ts/no-for-in-array": "error",
    "ts/no-implied-eval": "error",
    "ts/no-misused-promises": "error",
    "ts/no-throw-literal": "error",
    "ts/no-unnecessary-type-assertion": "error",
    "ts/no-unsafe-argument": "error",
    "ts/no-unsafe-assignment": "error",
    "ts/no-unsafe-call": "error",
    "ts/no-unsafe-member-access": "error",
    "ts/no-unsafe-return": "error",
    "ts/restrict-plus-operands": "error",
    "ts/restrict-template-expressions": "error",
    "ts/unbound-method": "error",
    "ts/consistent-type-exports": "error", // ok
  };

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined;

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: "bluzzi:typescript:setup",
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport,
        ts: pluginTs as any,
      },
    },
    {
      files: [
        GLOB_SRC,
        ...componentExts.map(ext => `**/*.${ext}`),
      ],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: "module",
          ...tsconfigPath
            ? {
                project: tsconfigPath,
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as any,
        },
      },
      name: "bluzzi:typescript:rules",
      rules: {
        ...renameRules(
          pluginTs.configs["eslint-recommended"].overrides![0].rules!,
          "@typescript-eslint/",
          "ts/",
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          "@typescript-eslint/",
          "ts/",
        ),

        "antfu/generic-spacing": "error",
        "antfu/named-tuple-spacing": "error",
        "antfu/no-cjs-exports": "error",

        "no-dupe-class-members": "off",
        "no-invalid-this": "off",
        "no-loss-of-precision": "off",
        "no-redeclare": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",

        "ts/explicit-function-return-type": ["error", { allowExpressions: true }], // ok
        "ts/no-unused-vars": [ // ok
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],

        "ts/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
        "ts/ban-types": ["error", { types: { Function: false } }],
        "ts/consistent-type-definitions": ["error", "interface"],
        "ts/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports", fixStyle: "separate-type-imports" }], // ok
        "ts/no-dupe-class-members": "error",
        "ts/no-dynamic-delete": "off",
        "ts/no-explicit-any": "off",
        "ts/no-extraneous-class": "off",
        "ts/no-import-type-side-effects": "error",
        "ts/no-invalid-this": "error",
        "ts/no-invalid-void-type": "off",
        "ts/no-loss-of-precision": "error",
        "ts/no-non-null-assertion": "off",
        "ts/no-redeclare": "error",
        "ts/no-require-imports": "error",
        "ts/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
        "ts/no-useless-constructor": "off",
        "ts/prefer-ts-expect-error": "error",
        "ts/triple-slash-reference": "off",
        "ts/unified-signatures": "off",

        "ts/consistent-type-assertions": ["error", { assertionStyle: "as" }], // ok

        ...tsconfigPath ? typeAwareRules : {},
        ...overrides,
      },
    },
    {
      files: ["**/*.d.ts"],
      name: "bluzzi:typescript:dts-overrides",
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.{test,spec}.ts?(x)"],
      name: "bluzzi:typescript:tests-overrides",
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      name: "bluzzi:typescript:javascript-overrides",
      rules: {
        "ts/no-require-imports": "off",
        "ts/no-var-requires": "off",
      },
    },
  ];
}