import type { ModificationOptions } from "jsonc-parser";
import { resolve } from "node:path";
import type { Options } from "prettier";

interface Config {
  filename: string;
  source: string;
  output: string;
}

// https://github.com/microsoft/node-jsonc-parser#utilities
export const DEFAULT_MOD_OPTIONS: ModificationOptions = {
  isArrayInsertion: false,
};

export const VUE_OUTPUT: string = resolve(__dirname, "vue");

export const CONFIGS: Config[] = [
  {
    filename: "tsconfig.json",
    source: resolve(
      __dirname,
      "node_modules/create-vite/template-vue-ts/tsconfig.json",
    ),
    output: VUE_OUTPUT,
  },
  {
    filename: "tsconfig.node.json",
    source: resolve(
      __dirname,
      "node_modules/create-vite/template-vue-ts/tsconfig.node.json",
    ),
    output: VUE_OUTPUT,
  },
];

export const PRETTIER_CONFIG_JSONC: Options = {
  parser: "json5",
  trailingComma: "none",
  quoteProps: "preserve",
  singleQuote: false,
};
