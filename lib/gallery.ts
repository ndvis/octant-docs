import { loader } from "fumadocs-core/source";
import { defineCollections } from "fumadocs-mdx/macro";
import { z } from "zod";
import { octantWebApp } from "./shared";

/** Schemes Octant's share links accept for `src` (`src/app/share/mod.rs` `SCHEMES`). */
const storeUrl = z
  .string()
  .regex(/^(https?|s3|gs):\/\//, "an http(s), s3 or gs address");

/**
 * One store in the gallery. The build fails on an entry missing any required
 * field, so every store carries its credit and license.
 */
export const galleryEntrySchema = z.object({
  title: z.string(),
  description: z.string(),
  store: storeUrl,
  format: z.enum([
    "zarr",
    "icechunk",
    "ome-zarr",
    "geotiff",
    "netcdf",
    "hdf5",
    "grib",
  ]),
  domain: z.enum([
    "climate",
    "weather",
    "ocean",
    "earth-observation",
    "microscopy",
    "medical",
    "other",
  ]),
  tags: z.array(z.string()).default([]),
  /** Who made the data, as they ask to be credited. */
  credit: z.string(),
  /** License name (SPDX id where one exists) and where its terms are stated. */
  license: z.string(),
  license_url: z.url().optional(),
  /** The provider's own page for the dataset. */
  source_page: z.url(),
  citation: z.string().optional(),
  /** Share-link keys applied after `src`: `var`, `plot`, `cmap`, a dimension's value... */
  open: z.record(z.string(), z.string()).default({}),
  /** The server sends no CORS headers: opens in the desktop app only. */
  desktop_only: z.boolean().default(false),
  /** Path under `public/`, e.g. `/gallery/seasfire.webp`. */
  thumbnail: z.string().optional(),
});

export type GalleryEntry = z.infer<typeof galleryEntrySchema>;

const entries = defineCollections({
  type: "doc",
  dir: "content/gallery",
  schema: galleryEntrySchema,
});

export const gallery = loader({
  baseUrl: "/gallery",
  source: entries.toFumadocsSource(),
});

/** A link that opens the entry in Octant's web app, as a share link does. */
export function octantLink(
  entry: Pick<GalleryEntry, "store" | "open">,
): string {
  const query = new URLSearchParams({ src: entry.store, ...entry.open });
  return `${octantWebApp}?${query}`;
}
