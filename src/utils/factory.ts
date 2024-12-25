import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from "#/types/type";
import type { Linter } from "eslint";
import { isPackageExists } from "local-pkg";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import { javascript } from "#/configs/javascript/config";
import { typescript } from "#/configs/typescript/config";
import { stylistic } from "#/configs/stylistic/config";
import { node } from "#/configs/node";
import { logger } from "#/utils/logger";
import { ignore } from "#/configs/ignore";
import { nextjs } from "#/configs/nextjs";
import { react } from "#/configs/react";

export const eslintConfig = async (
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> => {
  const configs: (TypedFlatConfigItem[])[] = [];

  const enabled = {
    typescript: isPackageExists("typescript"),
    react: isPackageExists("react"),
    nextjs: isPackageExists("next"),
  };

  // Ignore:
  logger.info("ignore - config enabled");
  configs.push(ignore());

  // JS:
  logger.info("javascript - config enabled");
  configs.push(javascript());

  // TS:
  if (enabled.typescript) {
    logger.info("typescript - config enabled (typescript package found)");
    configs.push(typescript(options.typescript));
  }

  // Node:
  logger.info("node - config enabled");
  configs.push(node());

  // Stylistic:
  logger.info("stylistic - config enabled");
  configs.push(stylistic({ ...options.stylistic, jsx: enabled.react }));

  // React:
  if (enabled.react) {
    logger.info("react - config enabled");
    configs.push(react());
  }

  // NextJS:
  if (enabled.nextjs) {
    logger.info("nextjs - config enabled");
    configs.push(nextjs());
  }

  // Compose:
  const composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

  // eslint-disable-next-line ts/no-unsafe-argument
  void composer.append(...configs, ...userConfigs as any);
  void composer.renamePlugins({
    "@stylistic": "style",
    "@typescript-eslint": "ts",
    "n": "node",

    "@eslint-react": "react",
    "@eslint-react/dom": "react-dom",
    "@eslint-react/hooks-extra": "react-hooks-extra",
    "@eslint-react/naming-convention": "react-naming-convention",
  });

  return composer;
};
