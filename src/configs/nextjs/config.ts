/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */

import type { TypedFlatConfigItem } from "#/types/type";
import { nextjsPlugin } from "#/utils/extension";
import { configName } from "#/utils/naming";

export const nextjs = (): TypedFlatConfigItem[] => {
  return [
    {
      name: configName("nextjs", "rules"),
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        nextjs: nextjsPlugin,
      },
      rules: {
        ...nextjsPlugin.configs.recommended.rules,
        ...nextjsPlugin.configs["core-web-vitals"].rules,
      },
    },
  ];
};
