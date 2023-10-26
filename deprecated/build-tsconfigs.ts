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
