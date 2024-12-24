export type ParamsStylistic = {
  /**
   * Indentation level
   * Similar to the `tabWidth` and `useTabs` options in Prettier
   *
   * @default 2
   */
  indent?: number | "tab";

  /**
   * Quote style
   * Similar to `singleQuote` option in Prettier
   *
   * @default 'double'
   */
  quotes?: "single" | "double";

  /**
   * Whether to enable semicolons
   * Similar to `semi` option in Prettier
   *
   * @default true
   */
  semi?: boolean;

  /**
   * Whether to enable JSX
   *
   * @default false - enabled if "react" package is found
   */
  jsx?: boolean;
};
