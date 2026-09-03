# Fonts

The site self-hosts three font families. The CSS in `src/app/globals.css`
references these paths, so no code changes are needed when adding/updating a
font file.

| Font     | Used for                | Folder     |
|----------|-------------------------|------------|
| Sora     | Bold texts / headings   | `sora/`    |
| PolySans | Body / other text       | `polysans/`|
| Nexa     | Numbers & digits        | `nexa/`    |

## Files already committed

The following are checked into the repo:

### `sora/` — bold text (already present)
A **variable** font (weights 100–800), no per-weight files needed.
- `Sora-Variable.woff2` (also `LICENSE.txt` — SIL Open Font License, free for commercial use)

## Files you need to provide

Drop the licensed files in with these names (woff2 preferred; the `@font-face`
rules also try `.woff` and `.ttf` as fallbacks where applicable):

### `polysans/` — body text
- `PolySans-Median.woff2`
- `PolySans-Bold.woff2` *(optional — used for bold body emphasis)*

### `nexa/` — numbers & digits
- `Nexa-Bold.woff2`

> If your downloaded copies use different file names, either rename them to the
> names above or update the `src` paths in `src/app/globals.css`.
