import { eslintConfig } from "./dist/index.js";

export default eslintConfig(
  {
    typescript: { tsconfigPath: "./tsconfig.json" },
  },
  {
    rules: { "ts/no-explicit-any": "off" },
  },
);
