# create-vite-tsconfigs

TSConfig files for projects created with [create-vite](https://www.npmjs.com/package/create-vite).

- [Source code](https://github.com/joaopalmeiro/create-vite-tsconfigs)
- [npm package](https://www.npmjs.com/package/create-vite-tsconfigs)
- [Licenses](https://licenses.dev/npm/create-vite-tsconfigs/0.2.0)
- [Package Phobia](https://packagephobia.com/result?p=create-vite-tsconfigs@0.2.0)
- [npm trends](https://npmtrends.com/create-vite-tsconfigs)
- [Snyk Advisor](https://snyk.io/advisor/npm-package/create-vite-tsconfigs)

## Available TSConfig files

### [create-vite@4.4.1](https://www.npmjs.com/package/create-vite/v/4.4.1)

| Template                                                                                                        | TSConfig file                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%404.4.1/packages/create-vite/template-vue-ts) | [tsconfig.json](https://github.com/vitejs/vite/blob/create-vite%404.4.1/packages/create-vite/template-vue-ts/tsconfig.json)           |
| [template-vue-ts](https://github.com/vitejs/vite/tree/create-vite%404.4.1/packages/create-vite/template-vue-ts) | [tsconfig.node.json](https://github.com/vitejs/vite/blob/create-vite%404.4.1/packages/create-vite/template-vue-ts/tsconfig.node.json) |

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
