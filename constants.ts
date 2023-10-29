import type { ModificationOptions } from "jsonc-parser";
import { resolve } from "node:path";
import type { Options } from "prettier";
import type { TsConfigJson } from "type-fest";

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

export const PRETTIER_CONFIG_MIN_JSONC: Options = {
  parser: "json5",
  trailingComma: "none",
  quoteProps: "preserve",
  singleQuote: false,
};

// https://github.com/sindresorhus/type-fest/blob/v4.6.0/source/tsconfig-json.d.ts#L1130
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
// https://www.typescriptlang.org/tsconfig#extends
export const TOP_LEVEL_REMOVE: (keyof TsConfigJson)[] = ["references"];
