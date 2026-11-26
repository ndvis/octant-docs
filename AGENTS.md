# Fumadocs

This site is built with [Fumadocs](https://fumadocs.dev) on Next.js. The APIs and conventions of Fumadocs may differ from your training data, so check its docs for the task at hand:

- Writing pages: https://fumadocs.dev/docs/next/markdown.md
- Organizing pages and folders: https://fumadocs.dev/docs/next/page-conventions.md
- Customizing the UI: https://fumadocs.dev/docs/next/guides/customize-ui.md
- Changing the theme and colors: https://fumadocs.dev/docs/ui/theme.md
- Upgrading Fumadocs: https://fumadocs.dev/docs/next/upgrade.md
- Other tasks: https://fumadocs.dev/llms.txt lists every docs page.

# Project rules

- Gallery entries live in `content/gallery/*.mdx`, validated by `galleryEntrySchema` (`lib/gallery.ts`). Every entry carries `credit`, `license` and `source_page`; never add one without them.
- "Open in Octant" links are Octant share links (`octantLink`); the keys are documented in `content/docs/share-links.mdx` and implemented in Octant's `src/app/share/`.
- The site is a static export served under a base path on GitHub Pages: paths in `<img>` and `fetch` go through `asset()` (`lib/shared.ts`); `next/link` adds the base path itself.
- Docs text comes from what Octant does; check claims against the Octant repository and its README.
