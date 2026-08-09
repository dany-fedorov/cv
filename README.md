# CV

**Published:** [dany-fedorov.github.io/cv](https://dany-fedorov.github.io/cv/) · [PDF](https://dany-fedorov.github.io/cv/Danylo_Fedorov_CV_Aug_2026.pdf)

Data-driven CV builder. Base content lives in `data/base.mjs`; each vacancy gets a
small override file on top of it (`data/<company>.mjs`, kept private).

## Build

```sh
node build.mjs            # build all variants
node build.mjs <company>  # build one variant
```

Outputs go to `dist/`: `<variant>.html` and `<basename>.pdf`
(e.g. `Danylo_Fedorov_CV.pdf`, `Danylo_Fedorov_CV_Company.pdf`).

Requires Google Chrome (used headless for PDF rendering).

## Adding a variant

1. Create `data/<company>.mjs`:

```js
import { cv as base } from './base.mjs';
export const cv = structuredClone(base);
cv.target = '<b>Applying for:</b> Role — Company';
// tweak cv.summary / cv.skills / anything else
cv.outputBasename = 'Danylo_Fedorov_CV_Company';
```

2. `node build.mjs <company>`

Vacancy variants are private: `.gitignore` excludes everything in `data/` except
`base.mjs`, and the whole `dist/` output directory.
