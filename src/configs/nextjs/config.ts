/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { TypedFlatConfigItem } from "#/types/type";
import { nextjsPlugin } from "#/utils/extension";

export const nextjs = (): TypedFlatConfigItem => {
  return {
    name: "bluzzi/nextjs",
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextjsPlugin,
    },
    rules: {
      // https://github.com/vercel/next.js/blob/7a47ed5123b8dac03e9483cb823e224370da2667/packages/eslint-plugin-next/src/index.ts#L26
      ...nextjsPlugin.configs.recommended.rules,
      ...nextjsPlugin.configs["core-web-vitals"].rules,
    },
  };
};
