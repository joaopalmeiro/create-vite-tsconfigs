# Notes

- https://github.com/joaopalmeiro/create-vue-tsconfigs
- https://codeberg.org/joaopalmeiro/misc-tsconfigs
- Changelogs:
  - https://github.com/prettier/prettier/blob/main/CHANGELOG.md
  - https://github.com/vitejs/vite/blob/main/packages/create-vite/CHANGELOG.md
- https://www.typescriptlang.org/tsconfig ("A TSConfig file (...)")
- https://github.com/bluwy/create-vite-extra
- https://github.com/developit/microbundle
- https://github.com/vitejs/vite/tree/main/packages/create-vite
- https://github.com/json5/json5
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
- https://www.npmjs.com/package/@vue/tsconfig/v/0.1.3?activeTab=code
- https://www.typescriptlang.org/docs/handbook/compiler-options.html (`--showConfig`)
- https://github.com/vuejs/tsconfig
- https://github.com/joaopalmeiro/social-media-icons
- https://www.typescriptlang.org/tsconfig#extends:
  - "Currently, the only top-level property that is excluded from inheritance is `references`."
  - "(...) `files`, `include`, and `exclude` from the inheriting config file overwrite those from the base config file (...)"
  - "All relative paths found in the configuration file will be resolved relative to the configuration file they originated in."
- https://github.com/sindresorhus/tsconfig
- https://www.npmjs.com/package/@sindresorhus/tsconfig?activeTab=code
- https://github.com/json5/json5
- https://nodejs.org/download/release/
- https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md
- https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md?plain=1
- https://github.com/rayepps/chiller (for documentation)
- https://moderndash.io/
- https://mobily.github.io/ts-belt/
- https://github.com/rayepps/radash/blob/master/src/typed.ts
- https://github.com/rayepps/durhuman
- https://github.com/microsoft/node-jsonc-parser
  - "In general multiple `EditResults` must not be concatenated because they might impact each other, producing incorrect or malformed JSON data."
- https://github.com/fabiospampinato/jsonc-simple-parser
- https://ultimatecourses.com/blog/remove-object-properties-destructuring
- https://www.samanthaming.com/tidbits/13-skip-values-in-destructuring/
- https://radash-docs.vercel.app/docs/object/omit
- https://github.com/fkei/JSON.minify
- https://github.com/Josee9988/MinifyAllCli
- [tsconfig.json: Specify <root> in "include" and "exclude" for extends configs](https://github.com/microsoft/TypeScript/issues/51213) issue.
- [Add {root} helper for tsconfig.json (for avoiding multiple ../../)](https://github.com/microsoft/TypeScript/issues/37227) issue.
- https://github.com/ouuan/tsconfig/commit/770c1c2e057ae69474d02d93d9a14895ee799fcf ("The paths are relative to the tsconfig.json file, making them useless.").
- [The `compilerOptions.outDir` config is incorrectly resolved when in a shareable config](https://github.com/Microsoft/TypeScript/issues/29172) issue.
- https://github.com/Microsoft/TypeScript/issues/29172#issuecomment-450966221: "Path-based compiler options (`outDir`, `outFile`, `rootDir`, `include`, `files`) are resolved from the config file they're found in (...)"
- https://github.com/milesj/packemon
- https://github.com/microsoft/node-jsonc-parser#utilities
- https://github.com/sindresorhus/type-fest/blob/v4.6.0/source/tsconfig-json.d.ts#L1130
- https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
- https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.app.json
- https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.node.json
- https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.json
- [fix(create-vite): update tsconfig with moduleDetection force](https://github.com/vitejs/vite/pull/17468/files)

## Commands

```bash
npm install -D \
npm-package-json-lint \
npm-package-json-lint-config-package \
npm-run-all2 \
prettier \
rimraf \
sort-package-json
```

```bash
npm install -D "@types/node@$(cat .nvmrc | cut -d . -f 1-2)"
```

```bash
rm -rf node_modules/ && npm install
```

```bash
npx tsc --project tsconfig.json --showConfig
```

```bash
npm init --yes
```

```bash
npm install -D prettier create-vite jiti fs-extra @types/fs-extra
```

```bash
npm install -D @types/node@18.18
```

```bash
fnm ls-remote
```

```bash
npm install -D json5 radash
```

```bash
npm install -D jsonc-parser npm-run-all type-fest
```

```bash
npx minifyall vue/tsconfig.json
```

## Snippets

### `minify-tsconfigs.ts` file

```ts
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { format } from "prettier";

import { CONFIGS, PRETTIER_CONFIG_MIN_JSONC } from "./constants";

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
    configContent = await format(configContent, PRETTIER_CONFIG_MIN_JSONC);
    // console.log(configContent);

    // https://github.com/microsoft/node-jsonc-parser/issues/29
    configContent = minifyJson(configContent);
    // console.log(configContent);

    writeFileSync(source, configContent);
    console.log(`${source} ✓`);
  }
}

main();
```

#### `constants.ts` file

```ts
export const PRETTIER_CONFIG_MIN_JSONC: Options = {
  parser: "json5",
  trailingComma: "none",
  quoteProps: "preserve",
  singleQuote: false,
};
```

### `deprecated/build-tsconfigs.ts` file

```ts
import { ensureDir } from "fs-extra";
import { parse, stringify } from "json5";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { TsConfigJson } from "type-fest";

interface Config {
  filename: string;
  source: string;
  output: string;
}

// https://stackoverflow.com/a/40029170
// https://nodejs.org/api/util.html#utilpromisifycustom
// https://nodejs.org/api/util.html#custom-promisified-functions
const promisifyCustom = (
  text: Parameters<typeof parse>[0],
  reviver: Parameters<typeof parse>[1],
) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log(text, reviver);
      const result = parse(text, reviver);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

parse[promisify.custom] = promisifyCustom;

// https://www.skovy.dev/blog/typescript-filter-array-with-type-guard
// https://dmitripavlutin.com/typescript-unknown-vs-any/
function isRejectedPromise(
  result: PromiseSettledResult<any>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}
function isFulfilledPromise(
  result: PromiseSettledResult<any>,
): result is PromiseFulfilledResult<any> {
  return result.status === "fulfilled";
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
// https://www.builder.io/blog/promises
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
// https://bobbyhadz.com/blog/typescript-function-that-throws-error#functions-that-throw-an-error-only-some-of-the-time
function handleResults(results: PromiseSettledResult<any>[]): any[] | never {
  // console.log(results);
  const errors = results
    // .filter((result) => result.status === "rejected")
    .filter(isRejectedPromise)
    .map((result) => result.reason);

  if (errors.length) {
    throw new AggregateError(errors);
  }

  // return results.map((result) => result.value);
  return results.filter(isFulfilledPromise).map((result) => result.value);
}

const VUE_OUTPUT = resolve(__dirname, "vue");

const OUTPUT = [VUE_OUTPUT];

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

// https://bobbyhadz.com/blog/delete-all-files-in-a-directory-using-node-js
// https://stackoverflow.com/a/70390856
// https://github.com/nodejs/help/issues/1840#issuecomment-478091824
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// https://www.aleksandrhovhannisyan.com/blog/javascript-promise-all/
// https://www.learnwithjason.dev/blog/keep-async-await-from-blocking-execution
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
async function main() {
  // const ensureDirResults = await Promise.allSettled([
  //   ...OUTPUT.map((outputDir) => ensureDir(outputDir)),
  //   Promise.reject(new Error("Example 1")),
  //   Promise.reject(new Error("Example 2")),
  // ]);
  const ensureDirResults: PromiseSettledResult<void>[] =
    await Promise.allSettled(OUTPUT.map((outputDir) => ensureDir(outputDir)));
  // console.log(ensureDirResults);

  try {
    handleResults(ensureDirResults);
  } catch (err) {
    for (const error of err.errors) {
      console.log(error);
    }
  }

  // https://nodejs.org/api/util.html#utilpromisifyoriginal
  // https://blog.logrocket.com/promise-chaining-is-dead-long-live-async-await-445897870abc/
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#nested_try_blocks
  // https://www.npmjs.com/package/no-try
  // https://github.com/sindresorhus/pify
  // https://byby.dev/node-promisify
  // https://github.com/sindresorhus/type-fest/blob/main/source/tsconfig-json.d.ts
  // https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
  const readFileResults: PromiseSettledResult<string>[] =
    await Promise.allSettled(
      CONFIGS.map((config) => readFile(config.source, { encoding: "utf8" })),
    );
  // console.log(readFileResults);

  try {
    const configContent: string[] = handleResults(readFileResults);
    // console.log(configContent);

    const parseAsync = promisify(parse);
    // [...configContent, "{"]
    const parseResults: PromiseSettledResult<TsConfigJson>[] =
      await Promise.allSettled(
        configContent.map((config) => parseAsync(config)),
      );
    // console.log(parseResults);

    try {
      const parsedConfigs: TsConfigJson[] = handleResults(parseResults);
      // console.log(parsedConfigs);
      console.log(stringify(parsedConfigs[0]));

      // https://www.typescriptlang.org/tsconfig#extends
      // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.app.json
      // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.node.json
      // https://github.com/vuejs/create-vue/blob/main/template/tsconfig/base/tsconfig.json
      // https://github.com/tsconfig/bases/blob/main/bases/node18.json
    } catch (err) {
      for (const error of err.errors) {
        console.log(error);
      }
    }
  } catch (err) {
    for (const error of err.errors) {
      console.log(error);
    }
  }
}

// async function mainPromiseAll() {
//   try {
//     await Promise.all([
//       Promise.reject(new Error("Example 1")),
//       Promise.reject(new Error("Example 2")),
//       Promise.reject(new Error("Example 3")),
//     ]);
//   } catch (err) {
//     console.error(err);
//   }

//   console.log("Hello darkness, my old friend");
// }

main();
// mainPromiseAll();
```

### `.github/workflows/publish-npm.yml` file

```yml
# https://github.com/joaopalmeiro/vitepress-social-media-icons/blob/main/.github/workflows/publish-npm.yml

name: Publish package to npm

on:
  push:
    tags:
      - "v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v3
        with:
          node-version-file: ".nvmrc"
          registry-url: "https://registry.npmjs.org/"
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

### `package.json` file

```json
{
  "scripts": {
    "format": "prettier . --write --log-level debug"
  }
}
```

```json
{
  "name": "create-vite-tsconfigs",
  "version": "0.2.0",
  "description": "TSConfig files for projects created with create-vite.",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/joaopalmeiro/create-vite-tsconfigs.git"
  },
  "keywords": ["tsconfig", "typescript", "ts", "config", "configuration"],
  "author": "João Palmeiro",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/joaopalmeiro/create-vite-tsconfigs/issues"
  },
  "homepage": "https://github.com/joaopalmeiro/create-vite-tsconfigs#readme",
  "files": ["vue"],
  "scripts": {
    "build": "jiti scripts/build-tsconfigs.ts"
  },
  "devDependencies": {
    "@types/fs-extra": "11.0.3",
    "@types/node": "18.18.7",
    "create-vite": "4.4.1",
    "fs-extra": "11.1.1",
    "jiti": "1.20.0",
    "jsonc-parser": "3.2.0",
    "npm-run-all": "4.1.5",
    "type-fest": "4.6.0"
  }
}
```

### `scripts/build-tsconfigs.ts` file

```ts
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
```

### `scripts/constants.ts` file

```ts
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

export const VUE_OUTPUT: string = resolve(__dirname, "../vue");

export const CONFIGS: Config[] = [
  {
    filename: "tsconfig.json",
    source: resolve(
      __dirname,
      "../node_modules/create-vite/template-vue-ts/tsconfig.json",
    ),
    output: VUE_OUTPUT,
  },
  {
    filename: "tsconfig.node.json",
    source: resolve(
      __dirname,
      "../node_modules/create-vite/template-vue-ts/tsconfig.node.json",
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
```
