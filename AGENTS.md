# AGENTS.md — jtd-inks

A fork of Just the Docs (MIT) for Grace Commons' docs site: keep its nav
tree, search and page features; replace its Sass with Tailwind v4 and INKs
(`../inks`, branch `light-is-tailwind`). Frankenstein is fine this round:
keep what works, swap what doesn't. Read this before touching a class.

## Rules (Scott, 2026-11-12)

1. Straight Tailwind classes only. No custom classes, no Sass, no `@apply`.
   One exception, by Scott's word: the `raised` utility in `_tailwind/app.css`
   (glass surfaces), and `reveal-on-scroll` (the back-to-top button, from grace-commons).
2. One breakpoint, `md:`, and only in the global grid of the main layout.
   Components carry no breakpoints; the shell rearranges, they don't.
   Components set no width either: they fill their grid area, as blocks
   do natively. The grid decides every width.
3. Style light mode only. Never write `dark:`; INKs mirrors every color and
   the page follows the reader's system. A surface that must hold one
   scheme gets `scheme-light` or `scheme-dark`.
4. A background is set in one place per layer: the page once, a region
   (sidebar, card) at most once more; everything else is transparent.
5. Build with npm (INKs uses npm; Tailwind's compiler is Rust, so the
   runner does not matter). Deploy through GitHub Actions.

## Style (Scott's, read from ~/Develop/Compos, 2026-11-12)

- Grays are `neutral`, never `gray` (Scott, 2026-11-12: Tailwind's gray leans blue).
- Secondary text is `opacity-50`/`opacity-60` on inherited color, not a gray step.
- Borders and hovers are mid gray at low alpha, which read in light and dark alike:
  plain `border` (base color is neutral-500 at 25%), `hover:bg-neutral-500/20`; a glass
  surface is the `raised` utility (Compos' `.raised`).
- Sidebar 14rem; nav `flex flex-col gap-0.5 px-2`; a link is
  `flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-neutral-500/20`.
- Tables: a card `rounded-lg border overflow-hidden`; head row
  `border-b text-xs uppercase tracking-wide opacity-50`, cells `px-4 py-3 text-left font-medium`;
  body rows `border-b`, cells `px-4 py-3`.
- Emphasis is elevation (Scott, 2026-11-12: "if you want something to stand out .raise it.
  Material design."): what must stand out gets `raised`, not a new color, weight or size.
  Raised: the sidebar nav, the header bar, the current nav link, tables, the pattern card.
  Not raised: the search input (Scott, 2026-11-12).
- The header is one full-width row above the nav and the page: logo and title, search,
  links, menu button. The search is the icon in a border until focused, then fills the space
  between (Scott, 2026-11-12); its `w-11` collapsed width is the one width a component sets,
  by his word. Below `md` the layout hides the title text when there is a logo, and the links
  (the menu carries them): `[logo] [search] [menu]`. The logo goes at `assets/images/icon.svg`
  with `logo:` set in `_config.yml`.
- Glass is only glass over texture (Scott, 2026-11-12): `raised` needs something behind
  it; over a plain page it reads as tint, border and sheen.
- Texture: `assets/js/topology.js` (+ worker), Compos' flow-field canvas fixed behind everything (Scott 2026-11-12: fixed;
  parallax was tried and was jumpy), brand green, fades after its run; skipped under reduced motion.
- Content is `prose` (@tailwindcss/typography) on `<main>`, at prose's own measure, 65ch
  (Scott, 2026-11-12: "remove your unset to proses max-width and we will have typography"). Its colors are re-pointed once in `_tailwind/app.css` (the plugin bakes literal
  grays INKs cannot flip); never `prose-invert`.
- GRACE rule blocks are colored by `assets/js/grace-highlight.js`; its words are generated
  (`npm run grace-words`) from GRACE-lang.md's `Term` lines, never hand-written. Color only,
  as highlighters do (no weight changes): MUST, MAY, MUST NOT orange; other reserved words
  violet; [Actions] sky; labels and WHY/UX/NOTE lines dimmed. Brand stays for the one action.
- Sizes are rem, always (Scott, 2026-11-12: "always REM"): em compounds where elements nest
  (code in a table cell). Code is `prose-code:text-[0.75rem]`: the mono face reads larger than
  Alliance at the same size.
- Font: Alliance (licensed, web use included), `assets/fonts/`, wired as `--font-sans`.
- Brand green for the one action and focus: `bg-brand-600`, `border-brand-600`.

## Off in this site's config (the templates keep them)

Back-to-top footer link, footer license line, edit-on-GitHub link, the sidebar credit line
(`nav_footer_custom.html` empty), and the automatic child-page list (`children_nav: true` turns
it on). Scott, 2026-11-12: the footer stuff "needs to go away".

## Plan

Done 2026-11-12: Tailwind + INKs build (`npm run dev`); Just the Docs' Sass, its three
color-scheme stylesheets, the nav-activation CSS and the theme-switch JS deleted. Its
utility classes reused Tailwind's names with !important (Scott: "I had no idea JTD built
it's own tailwind"), so the Sass went whole. The site is now unstyled HTML on Tailwind's
preflight, styled only by Tailwind classes.

Done 2026-11-12 (later): shell grid; Compos style; Alliance; `raised`; the fixed texture;
prose with its colors re-pointed; the GRACE highlighter; the nav (`aria-current`,
`<details>`, ancestors open, rendered per page, `activateNav()` gone); breadcrumbs from
front matter (the old ones string-parsed the cached nav HTML); tables as `raised` cards;
WHY toggles; search dropdown and overlay; config title Grace Commons.

Next:
1. JS shell: `addEventListener` and `fetch`; drop the IE shims.
2. Check every page type against the fixtures: real Grace pages (The Corpus > Atomic
   Concepts > Gift Card, Cart; Conceptual Compositions > Shared Cart; The Method >
   Execution Contract; Glossary), copied from grace-commons, which stays their home.
3. Later, not now (Scott, 2026-11-12: "Leave it"): search as a native `popover` with CSS anchor
   positioning, `::backdrop` as the scrim, once Firefox ships anchor positioning.
4. A deploy workflow for a live demo (Just the Docs' CI, gem publishing, deploy, funding,
   issue templates and dependabot were deleted 2026-11-12; they built a different stack).
   Blocked until INKs' new branch is on GitHub: CI cannot see `file:../inks`, so the
   dependency must point at the pushed INKs first.
5. Wire the fork into grace-commons (after the IA sweep decides the front doors).

Keep: the nav tree includes, lunr search and its index, breadcrumbs, the
child-page TOC, heading anchors, the copy-code button, Mermaid, callouts,
the skip link.
