# Fonts

The site self-hosts its type. `src/app/globals.css` declares the `@font-face`
rules and the design tokens (`--font-sans`, `--font-heading`, `--font-display`),
so swapping a family only touches that file plus this folder.

| Family                  | Used for                                        | Folder        |
|-------------------------|-------------------------------------------------|---------------|
| Quicksand               | body copy, UI labels, numbers (`font-sans`)     | `quicksand/`  |
| Bricolage Grotesque     | headings (`font-heading`, `font-display`)       | `bricolage/`  |

Both are SIL Open Font License (see the `LICENSE.txt` in each folder).

## Files

### `quicksand/` — body text
`quicksand-{400,500,600,700}.woff2` — static weights, latin subset (~15 KB each).

### `bricolage/` — headings
Bricolage Grotesque ships in optical sizes; we keep two:

- `bricolage-text-{400,500,600,700,800}.woff2` — the 14 pt cut, registered as
  **"Bricolage Text"** → `--font-heading`, used for h3–h6, card titles, nav,
  footer headings and small caps labels.
- `bricolage-display-{400,600,700,800}.woff2` — the 36 pt cut (800 = the 48 pt
  Bold), registered as **"Bricolage Display"** → `--font-display`, used for h1/h2
  and the oversized numerals. Tighter spacing and more contrast, built for big sizes.

## Regenerating from TTFs

The `.woff2` files are subset + compressed from the upstream TTFs with
[fonttools](https://github.com/fonttools/fonttools) (`pip install fonttools brotli`):

```sh
pyftsubset Quicksand-Regular.ttf \
  --output-file=public/fonts/quicksand/quicksand-400.woff2 \
  --flavor=woff2 --layout-features='*' --no-hinting --desubroutinize \
  --unicodes='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-21FF,U+2212,U+2215,U+2713,U+FEFF,U+FFFD'
```

(That unicode range is the Google Fonts latin subset plus arrows and the check mark.)
Do not commit the raw `.ttf` sources — they are 80–90 KB each and unused at runtime.
