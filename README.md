# Octant docs and gallery

The documentation and dataset gallery for [Octant](https://github.com/ndvis/octant),
built with [Fumadocs](https://fumadocs.dev) and published at
<https://ndvis.github.io/octant-docs/>.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Layout

| Path                        | What                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `app/(home)/page.tsx`       | Home page                                                    |
| `content/docs/`             | Documentation pages (MDX); order and sections in `meta.json` |
| `content/gallery/`          | One MDX file per gallery dataset                             |
| `lib/gallery.ts`            | The gallery entry schema and the "Open in Octant" link       |
| `app/(home)/gallery/`       | Gallery grid and dataset pages                               |
| `app/gallery.json/route.ts` | The gallery as JSON (`/gallery.json`)                        |
| `tools/thumbnails/`         | Makes the gallery's thumbnails with Octant (Rust)            |

## Add a dataset to the gallery

Add `content/gallery/<key>.mdx`. The front matter is checked against
`galleryEntrySchema` in `lib/gallery.ts`, and the build fails on a missing field:

```mdx
---
title: NASA MUR Sea Surface Temperature
description: One sentence for the card.
store: https://mur-sst.s3.us-west-2.amazonaws.com/zarr-v1/
format: zarr            # zarr | icechunk | ome-zarr | geotiff | netcdf | hdf5 | grib
domain: ocean           # climate | weather | ocean | earth-observation | microscopy | medical | scivis | other
tags: [sst, satellite]
credit: NASA JPL PO.DAAC          # as the provider asks to be credited
license: NASA open data           # SPDX id where one exists
license_url: https://...
source_page: https://...          # the provider's page for the dataset
citation: Optional citation or DOI
open:                              # optional share-link keys after src
  var: analysed_sst
desktop_only: false                # true when the server sends no CORS headers
thumbnail: /gallery/mur-sst.webp   # optional, under public/
---

A paragraph or two about the dataset, shown on its page.
```

Open the store in Octant before sending the pull request, and only add data whose
license allows linking to it publicly.

### Add a thumbnail

A thumbnail is an 800x450 WebP under `public/gallery/`, named by the entry's
`thumbnail` field; make it any way you like, such as a screenshot of the plot in
Octant. For convenience, a small Rust tool makes it with Octant itself. With
[Rust](https://rust-lang.org/tools/install/) and Octant installed (`cargo install octant`):

```bash
cargo run --release --manifest-path tools/thumbnails/Cargo.toml -- <key>
```

This opens the entry in Octant from the same share link as its "Open in Octant" button,
waits until the plot has loaded, and saves an 800x450 WebP with its axes and colorbar
where `thumbnail` points (`/gallery/<key>.webp` when the entry has none: add that
line). A window shows while it captures. Without a key it remakes every thumbnail;
`--octant <path>` uses another Octant build, and `--no-colorbar` or `--no-axes` leave
those out. See the docs page [Thumbnails and scripting](content/docs/snapshots.mdx).
