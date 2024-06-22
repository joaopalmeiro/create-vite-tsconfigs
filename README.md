# create-vite-tsconfigs

TSConfig files for projects created with [create-vite](https://www.npmjs.com/package/create-vite).

- [Source code](https://github.com/joaopalmeiro/create-vite-tsconfigs)
- [npm package](https://www.npmjs.com/package/create-vite-tsconfigs)
- [Licenses](https://licenses.dev/npm/create-vite-tsconfigs/0.2.0)
- [Package Phobia](https://packagephobia.com/result?p=create-vite-tsconfigs@0.2.0)
- [npm trends](https://npmtrends.com/create-vite-tsconfigs)
- [Snyk Advisor](https://snyk.io/advisor/npm-package/create-vite-tsconfigs)

## Available TSConfig files

### [create-vite@5.3.0](https://www.npmjs.com/package/create-vite/v/5.3.0)

| Template                                                                                                        | Package TSConfig file                        | Source TSConfig file                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%405.3.0/packages/create-vite/template-vue-ts) | [tsconfig.app.json](vue/tsconfig.app.json)   | [tsconfig.app.json](https://github.com/vitejs/vite/blob/create-vite%405.3.0/packages/create-vite/template-vue-ts/tsconfig.app.json)   |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%405.3.0/packages/create-vite/template-vue-ts) | [tsconfig.node.json](vue/tsconfig.node.json) | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%405.3.0/packages/create-vite/template-vue-ts/tsconfig.node.json) |

## Development

```bash
fnm install && fnm use && node --version && npm --version
```

```bash
npm install
```

```bash
npm run lint
```

```bash
npm run format
```

Delete the following [top-level options](https://www.typescriptlang.org/tsconfig#extends) (if necessary):

- `"references"`
- `"files"`
- `"include"`
- `"exclude"`

Remove the following [`compilerOptions` options](https://www.typescriptlang.org/tsconfig) (if necessary):

- `"tsBuildInfoFile"`

### template-vue-ts

```bash
npm create vite@5.3.0 vue-template -- --template vue-ts
```

```bash
cd vue-template && npm install
```

```bash
npx tsc --project tsconfig.app.json --showConfig
```

```bash
npx tsc --project tsconfig.node.json --showConfig
```

```bash
cd ..
```

## Deployment

```bash
npm pack --dry-run
```

```bash
npm version patch
```

```bash
npm version minor
```

```bash
npm version major
```

- Update the version in the `Licenses` and `Package Phobia` links at the top.

```bash
echo "v$(npm pkg get version | tr -d \")" | pbcopy
```

- Commit and push changes.
- Create a tag on [GitHub Desktop](https://github.blog/2020-05-12-create-and-push-tags-in-the-latest-github-desktop-2-5-release/).
- Check [GitHub](https://github.com/joaopalmeiro/create-vite-tsconfigs/tags).

```bash
npm login
```

```bash
npm publish
```

- Check [npm](https://www.npmjs.com/package/create-vite-tsconfigs).
