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
        // https://github.com/vercel/next.js/blob/7a47ed5123b8dac03e9483cb823e224370da2667/packages/eslint-plugin-next/src/index.ts#L26
        ...nextjsPlugin.configs.recommended.rules,
        ...nextjsPlugin.configs["core-web-vitals"].rules,
      },
    },
  ];
};
