import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { format } from "prettier";

import { CONFIGS, PRETTIER_CONFIG_JSONC } from "./constants";

function minifyJson(content: string) {
  return JSON.stringify(JSON.parse(content));
}

async function main() {
  for (const config of CONFIGS) {
    const source = resolve(config.output, config.filename);
    let configContent = readFileSync(source, { encoding: "utf8" });

    // https://prettier.io/docs/en/options.html#trailing-commas
    // https://prettier.io/docs/en/options#parser
    // https://prettier.io/docs/en/options#quote-props
    configContent = await format(configContent, PRETTIER_CONFIG_JSONC);
    // console.log(configContent);

    // https://github.com/microsoft/node-jsonc-parser/issues/29
    configContent = minifyJson(configContent);
    // console.log(configContent);

    writeFileSync(source, configContent);
    console.log(`${source} ✓`);
  }
}

main();
