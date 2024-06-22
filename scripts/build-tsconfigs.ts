import { ensureDirSync } from "fs-extra";
import type { EditResult, JSONPath } from "jsonc-parser";
import { applyEdits, modify, stripComments } from "jsonc-parser";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  CONFIGS,
  DEFAULT_MOD_OPTIONS,
  TOP_LEVEL_REMOVE,
  VUE_OUTPUT,
} from "./constants";

function removePath(content: string, path: JSONPath): EditResult {
  return modify(content, path, undefined, DEFAULT_MOD_OPTIONS);
}

function main() {
  ensureDirSync(VUE_OUTPUT);

  for (const config of CONFIGS) {
    let configContent = readFileSync(config.source, { encoding: "utf8" });

    configContent = stripComments(configContent);

    for (const option of TOP_LEVEL_REMOVE) {
      const removeOption = removePath(configContent, [option]);
      configContent = applyEdits(configContent, removeOption);
    }

    const addComposite = modify(
      configContent,
      ["compilerOptions", "composite"],
      true,
      DEFAULT_MOD_OPTIONS,
    );
    configContent = applyEdits(configContent, addComposite);

    const output = resolve(config.output, config.filename);
    writeFileSync(output, configContent);
    console.log(`${output} ✓`);
  }
}

main();
