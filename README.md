# create-vite-tsconfigs

TSConfig files for projects created with [create-vite](https://www.npmjs.com/package/create-vite).

- [Source code](https://github.com/joaopalmeiro/create-vite-tsconfigs)
- [npm package](https://www.npmjs.com/package/create-vite-tsconfigs)
- [Licenses](https://licenses.dev/npm/create-vite-tsconfigs)
- [Package Phobia](https://packagephobia.com/result?p=create-vite-tsconfigs)
- [npm trends](https://npmtrends.com/create-vite-tsconfigs)
- [Snyk Advisor](https://snyk.io/advisor/npm-package/create-vite-tsconfigs)

## Available TSConfig files

### [create-vite@5.5.2](https://www.npmjs.com/package/create-vite/v/5.5.2)

| Template                                                                                                            | Package TSConfig file                          | Source TSConfig file                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [template-qwik-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-qwik-ts)   | [tsconfig.app.json](qwik/tsconfig.app.json)    | [tsconfig.app.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-qwik-ts/tsconfig.app.json)    |
| [template-qwik-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-qwik-ts)   | [tsconfig.node.json](qwik/tsconfig.node.json)  | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-qwik-ts/tsconfig.node.json)  |
| [template-react-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-react-ts) | [tsconfig.app.json](react/tsconfig.app.json)   | [tsconfig.app.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-react-ts/tsconfig.app.json)   |
| [template-react-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-react-ts) | [tsconfig.node.json](react/tsconfig.node.json) | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-react-ts/tsconfig.node.json) |
| [template-solid-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-solid-ts) | [tsconfig.app.json](solid/tsconfig.app.json)   | [tsconfig.app.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-solid-ts/tsconfig.app.json)   |
| [template-solid-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-solid-ts) | [tsconfig.node.json](solid/tsconfig.node.json) | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-solid-ts/tsconfig.node.json) |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-vue-ts)     | [tsconfig.app.json](vue/tsconfig.app.json)     | [tsconfig.app.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-vue-ts/tsconfig.app.json)     |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%405.5.2/packages/create-vite/template-vue-ts)     | [tsconfig.node.json](vue/tsconfig.node.json)   | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%405.5.2/packages/create-vite/template-vue-ts/tsconfig.node.json)   |

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

- `"files"`
- `"include"`
- `"exclude"`
- `"references"`

### template-qwik-ts

```bash
npm create vite@5.5.2 qwik-template -- --template qwik-ts
```

```bash
cd qwik-template && npm install
```

```bash
npx tsc --project tsconfig.app.json --showConfig > ../qwik/tsconfig.app.json
```

```bash
npx tsc --project tsconfig.node.json --showConfig > ../qwik/tsconfig.node.json
```

```bash
cd ..
```

### template-react-ts

```bash
npm create vite@5.5.2 react-template -- --template react-ts
```

```bash
cd react-template && npm install
```

```bash
npx tsc --project tsconfig.app.json --showConfig > ../react/tsconfig.app.json
```

```bash
npx tsc --project tsconfig.node.json --showConfig > ../react/tsconfig.node.json
```

```bash
cd ..
```

### template-solid-ts

```bash
npm create vite@5.5.2 solid-template -- --template solid-ts
```

```bash
cd solid-template && npm install
```

```bash
npx tsc --project tsconfig.app.json --showConfig > ../solid/tsconfig.app.json
```

```bash
npx tsc --project tsconfig.node.json --showConfig > ../solid/tsconfig.node.json
```

```bash
cd ..
```

### template-vue-ts

```bash
npm create vite@5.5.2 vue-template -- --template vue-ts
```

```bash
cd vue-template && npm install
```

```bash
npx tsc --project tsconfig.app.json --showConfig > ../vue/tsconfig.app.json
```

```bash
npx tsc --project tsconfig.node.json --showConfig > ../vue/tsconfig.node.json
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
