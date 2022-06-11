# DEV FAQ

Here are the problems that are easy to encounter in development.

## If you encounter dependency related issues

```bash
pnpm i
```

## Link local dependencies

```bash
# get dist
pnpm build
cd dist/bootstrap-vue-plus
# set cur bootstrap-vue-plus to global `node_modules`
pnpm link --global
# for esm we also need link bootstrap-vue-plus for dist
pnpm link --global bootstrap-vue-plus

# go to your project, link to `bootstrap-vue-plus`
cd your-project
pnpm link --global bootstrap-vue-plus
```

> More info see [pnpm link](https://pnpm.io/cli/link).

## Theme

We should not write Chinese comments in scss files.

It will generate warning `@charset "UTF-8";` in the header of css file when built with vite.

