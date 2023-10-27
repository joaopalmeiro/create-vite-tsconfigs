import { ensureDirSync } from "fs-extra";
import { applyEdits, modify, stripComments } from "jsonc-parser";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { CONFIGS, DEFAULT_MOD_OPTIONS, VUE_OUTPUT } from "./constants";

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

    const output = resolve(config.output, config.filename);
    writeFileSync(output, configContent);
    console.log(`${output} ✓`);
  }
}

main();
