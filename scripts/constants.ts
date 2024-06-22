import type { ModificationOptions } from "jsonc-parser";
import { resolve } from "node:path";
import type { TsConfigJson } from "type-fest";

interface Config {
  filename: string;
  source: string;
  output: string;
}

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

export const TOP_LEVEL_REMOVE: (keyof TsConfigJson)[] = [
  "references",
  "files",
  "include",
  "exclude",
];
