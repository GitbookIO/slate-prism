> ⚠️  This repository is archived and has moved to [GitBook's fork](https://github.com/GitbookIO/slate) of [ianstormtaylor/slate](https://github.com/ianstormtaylor/slate).
> Previous versions are still [available on NPM](https://www.npmjs.com/package/slate-edit-table)
> All the versions using GitBook's fork of slate are now published under the `@gitbook` NPM scope.
> To learn more about why we forked Slate, read [our manifest](https://github.com/GitbookIO/slate/blob/master/Forked.md)


# slate-prism

[![NPM version](https://badge.fury.io/js/slate-prism.svg)](http://badge.fury.io/js/slate-prism)

A Slate plugin to highlight code blocks using PrismJS

### Install

```
npm install slate-prism
```

### Simple Usage

```js
import Prism from 'slate-prism'

const plugins = [
  Prism()
]
```

**Note:** You have to add a Prism theme CSS to your application.

#### Arguments

- ``[onlyIn: (Node) => boolean]`` — a filtering function to select code blocks.
- ``[getSyntax: (Node) => string]`` — a function to determine syntax for a code block.
