import { ensureDirSync } from "fs-extra";
import { resolve } from "node:path";

interface Config {
  filename: string;
  source: string;
  output: string;
}

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

  console.log(CONFIGS);
  // TODO
}

main();
