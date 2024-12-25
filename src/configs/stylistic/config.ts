import type { ParamsStylistic } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { antfuPlugin, stylisticPlugin } from "#/utils/extension";

export const stylistic = ({ indent = 2, quotes = "double", semi = true, jsx = false }: ParamsStylistic = {}): TypedFlatConfigItem => {
  const config = stylisticPlugin.configs.customize({ indent, quotes, semi, jsx });

  return {
    name: "bluzzi/stylistic",
    plugins: {
      "antfu": antfuPlugin,
      "@stylistic": stylisticPlugin,
    },
    rules: {
      ...config.rules,

      "@stylistic/semi-style": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/function-call-spacing": "error",
      "@stylistic/generator-star-spacing": ["error", { before: false, after: true }],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/wrap-regex": "error",
      "@stylistic/nonblock-statement-body-position": "error",

      "@stylistic/jsx-props-no-multi-spaces": ["error"],
      "@stylistic/jsx-self-closing-comp": ["error", { component: true, html: true }],
      "@stylistic/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],

      "antfu/consistent-list-newline": "error",
    },
  };
};
