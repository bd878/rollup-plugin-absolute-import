## Package that ease you into file resolution in rollup bundler!

Usage:

```js
import absoluteImport from 'rollup-plugin-absolute-import';
/* ... */
plugins: [
  /* ... */
  absoluteImport('src'),
]
```

`absoluteImport` options:
1. base dir, current dirrectory by default
2. extentions, `['.ts', '.tsx', '.js', '.jsx', '.d.ts']` by default
