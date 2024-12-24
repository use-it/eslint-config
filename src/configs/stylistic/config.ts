import type { ParamsStylistic } from "./type";
import type { TypedFlatConfigItem } from "#/types/type";
import { antfuPlugin, stylisticPlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export const stylistic = ({ indent = 2, quotes = "double", semi = true, jsx = false }: ParamsStylistic = {}): TypedFlatConfigItem[] => {
  const config = stylisticPlugin.configs.customize({ pluginName: "style", indent, quotes, semi, jsx });

  return [{
    name: configName("stylistic", "rules"),
    plugins: {
      antfu: antfuPlugin,
      style: stylisticPlugin,
    },
    rules: {
      ...config.rules,

      "style/semi-style": "error",
      "style/no-extra-semi": "error",
      "style/function-call-spacing": "error",
      "style/generator-star-spacing": ["error", { before: false, after: true }],
      "style/implicit-arrow-linebreak": ["error", "beside"],
      "style/wrap-regex": "error",
      "style/nonblock-statement-body-position": "error",

      "style/jsx-props-no-multi-spaces": ["error"],
      "style/jsx-self-closing-comp": ["error", { component: true, html: true }],
      "style/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],

      "antfu/consistent-list-newline": "error",
    },
  }];
};
