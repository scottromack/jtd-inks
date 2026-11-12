# jtd-inks

[Just the Docs](https://github.com/just-the-docs/just-the-docs) on Tailwind v4 and
[INKs](https://github.com/scottromack/inks): the same nav tree, search and page features,
with every style rebuilt in straight Tailwind classes. Light and dark mode follow the
reader's system; nothing is written twice.

Built for the [Grace Commons](https://gracecommons.dev) docs site.

## What changed from Just the Docs

- **No Sass.** Just the Docs' utility classes reused Tailwind's names with `!important`,
  so the Sass went whole. Tailwind + INKs is the only stylesheet.
- **Dark mode for free.** Style light mode only; INKs flips every Tailwind color. No
  `dark:` classes, no theme switch, no separate color-scheme stylesheets.
- **One grid.** The page is one CSS grid, and the only breakpoint (`md:`) lives there.
- **Glass.** A `raised` surface for the current nav link, tables and inputs, over a
  flow-field texture.
- **Nav state in the HTML.** The current page carries `aria-current`, folders are
  `<details>`, ancestors start open. Breadcrumbs and child-page lists read front matter.
  No JavaScript needed for any of it.
- **Content in `prose`,** with the typography plugin's colors re-pointed so INKs can flip
  them.
- **GRACE highlighting** for rule blocks, its words generated from GRACE-lang.md.

The rules every change follows are in [AGENTS.md](AGENTS.md).

## Run it

```sh
brew install ruby          # macOS ships a Ruby too old for Jekyll
bundle install
npm install
npm run dev                # Tailwind watcher + jekyll serve, at localhost:4000
```

`npm run grace-words` regenerates the GRACE highlighter's word list from
`../grace-commons/GRACE-lang.md`. A change to `_config.yml` needs a restart of
`npm run dev`.

## Credit

Forked from [Just the Docs](https://github.com/just-the-docs/just-the-docs) by Patrick
Marsceill and its contributors, whose history this repository keeps. MIT licensed: see
[LICENSE.txt](LICENSE.txt).
