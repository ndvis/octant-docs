import { gallery } from "@/lib/gallery";

export const revalidate = false;

/** The gallery as data, for Octant's catalog to read one day instead of its built-in list. */
export function GET() {
  const entries = gallery.getPages().map(({ slugs, data: d }) => ({
    key: slugs[0],
    title: d.title,
    description: d.description,
    store: d.store,
    format: d.format,
    domain: d.domain,
    tags: d.tags,
    credit: d.credit,
    license: d.license,
    license_url: d.license_url,
    source_page: d.source_page,
    citation: d.citation,
    open: d.open,
    desktop_only: d.desktop_only,
  }));
  return Response.json({ version: 1, entries });
}
