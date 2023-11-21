# create-vite-tsconfigs

TSConfig files for projects created with [create-vite](https://www.npmjs.com/package/create-vite).

- [Source code](https://github.com/joaopalmeiro/create-vite-tsconfigs)
- [npm package](https://www.npmjs.com/package/create-vite-tsconfigs)

## Available TSConfig files

### [create-vite@4.4.1](https://www.npmjs.com/package/create-vite/v/4.4.1)

| Template                                                                                                        | TSConfig file                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%404.4.1/packages/create-vite/template-vue-ts) | [tsconfig.json](https://github.com/vitejs/vite/blob/create-vite%404.4.1/packages/create-vite/template-vue-ts/tsconfig.json)           |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%404.4.1/packages/create-vite/template-vue-ts) | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%404.4.1/packages/create-vite/template-vue-ts/tsconfig.node.json) |

## Development

```bash
fnm install && fnm use && node --version
```

```bash
npm install
```

```bash
npm run format
```

```bash
npm run build
```

```bash
npm pack --dry-run
```

## Deployment

```bash
npm version --no-git-tag-version patch
```

```bash
npm version --no-git-tag-version minor
```

```bash
npm version --no-git-tag-version major
```

- Commit and push changes.
- Create a tag on [GitHub Desktop](https://github.blog/2020-05-12-create-and-push-tags-in-the-latest-github-desktop-2-5-release/).
- Check [GitHub](https://github.com/joaopalmeiro/create-vite-tsconfigs/actions) and [npm](https://www.npmjs.com/package/create-vite-tsconfigs).
