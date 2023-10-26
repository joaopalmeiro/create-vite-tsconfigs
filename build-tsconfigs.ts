import { ensureDir } from "fs-extra";
import { resolve } from "node:path";

interface Config {
  filename: string;
  source: string;
  output: string;
}

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
    filename: "",
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

  // TODO
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
