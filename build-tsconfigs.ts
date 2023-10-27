import { ensureDirSync } from "fs-extra";
import type { ModificationOptions } from "jsonc-parser";
import { applyEdits, modify, stripComments } from "jsonc-parser";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

interface Config {
  filename: string;
  source: string;
  output: string;
}

function minifyJson(content: string) {
  return JSON.stringify(JSON.parse(content));
}

// https://github.com/microsoft/node-jsonc-parser#utilities
const DEFAULT_MOD_OPTIONS: ModificationOptions = {
  isArrayInsertion: false,
};

const VUE_OUTPUT: string = resolve(__dirname, "vue");

const CONFIGS: Config[] = [
  {
    filename: "tsconfig.json",
    source: resolve(
      __dirname,
      "node_modules/create-vite/template-vue-ts/tsconfig.json",
    ),
    output: VUE_OUTPUT,
  },
];

function main() {
  ensureDirSync(VUE_OUTPUT);

  for (const config of CONFIGS) {
    let configContent = readFileSync(config.source, { encoding: "utf8" });
    // console.log(configContent);

    configContent = stripComments(configContent);
    // console.log(configContent)

    // https://www.typescriptlang.org/tsconfig#extends
    const removeReferences = modify(
      configContent,
      ["references"],
      undefined,
      DEFAULT_MOD_OPTIONS,
    );
    configContent = applyEdits(configContent, removeReferences);
    // console.log(configContent);

    // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.app.json
    // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.node.json
    // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.json
    const addComposite = modify(
      configContent,
      ["compilerOptions", "composite"],
      true,
      DEFAULT_MOD_OPTIONS,
    );
    configContent = applyEdits(configContent, addComposite);
    // console.log(configContent);

    // https://github.com/microsoft/node-jsonc-parser/issues/29
    configContent = minifyJson(configContent);
    console.log(configContent);

    writeFileSync(resolve(config.output, config.filename), configContent);
  }
}

main();
