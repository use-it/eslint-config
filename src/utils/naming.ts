/* eslint-disable ts/no-explicit-any */

export const configName = (name: string, category: "rules" | "parsers" | "plugins"): string => `bluzzi/${name}/${category}`;

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 * import { renameRules } from '@antfu/eslint-config'
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export const renameRules = (rules: Record<string, any>, map: Record<string, string>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(`${from}/`)) return [to + key.slice(from.length), value];
        }

        return [key, value];
      }),
  );
};
