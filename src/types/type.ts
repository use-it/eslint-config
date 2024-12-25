/* eslint-disable ts/no-explicit-any */

import type { Linter } from "eslint";
import type { ConfigNames, RuleOptions } from "./gen";
import type { ParamsTS } from "#/configs/typescript";
import type { ParamsStylistic } from "#/configs/stylistic";

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, "plugins"> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * [NOTE] Relax plugins type limitation, as most of the plugins did not have correct type info yet.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
};

export type OptionsConfig = {
  /**
   * Enable TypeScript Language Server support.
   */
  typescript?: ParamsTS;

  /**
   * Definitions of basic formatting rules.
   */
  stylistic?: ParamsStylistic;
};
