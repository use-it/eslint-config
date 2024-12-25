import type { TypedFlatConfigItem } from "#/types/type";
import { nodePlugin } from "#/utils/extension";

export const node = (): TypedFlatConfigItem => {
  return {
    name: "bluzzi/node",
    plugins: {
      n: nodePlugin,
    },
    rules: {
      "n/no-deprecated-api": "error",
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
    },
  };
};
