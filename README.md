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

## Add a dataset to the gallery

Add `content/gallery/<key>.mdx`. The front matter is checked against
`galleryEntrySchema` in `lib/gallery.ts`, and the build fails on a missing field:

```mdx
---
title: NASA MUR Sea Surface Temperature
description: One sentence for the card.
store: https://mur-sst.s3.us-west-2.amazonaws.com/zarr-v1/
format: zarr            # zarr | icechunk | ome-zarr | geotiff | netcdf | hdf5 | grib
domain: ocean           # climate | weather | ocean | earth-observation | microscopy | medical | other
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
