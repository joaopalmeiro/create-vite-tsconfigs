# Notes

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

## Commands

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
rm -rf node_modules/ && npm install
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
