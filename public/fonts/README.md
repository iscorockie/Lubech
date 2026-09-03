# Fonts

The site self-hosts its font families. The CSS in `src/app/globals.css`
references these paths, so no code changes are needed when adding/updating a
font file.

| Font | Used for                | Folder  |
|------|-------------------------|---------|
| Sora | Bold texts / headings   | `sora/` |
| Sen  | Body text / numbers     | `sen/`  |

## Files already committed

### `sora/` — bold text / headings
A **variable** font (weights 100–800), no per-weight files needed.
- `Sora-Variable.woff2` (also `LICENSE.txt` — SIL Open Font License, free for commercial use)

### `sen/` — body text & numbers / digits
Static weights 400–800 (latin subset, `woff2` only), sourced from
`@fontsource/sen` (SIL Open Font License).
- `sen-latin-400-normal.woff2`
- `sen-latin-500-normal.woff2`
- `sen-latin-600-normal.woff2`
- `sen-latin-700-normal.woff2`
- `sen-latin-800-normal.woff2`
- `LICENSE.txt`
