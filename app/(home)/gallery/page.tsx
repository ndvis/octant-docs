import type { Metadata } from "next";
import { type CardData, GalleryGrid } from "@/components/gallery/grid";
import { gallery, octantLink } from "@/lib/gallery";
import { asset, gitConfig } from "@/lib/shared";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Public datasets to open in Octant, each credited to its provider.",
};

export default function GalleryPage() {
  const cards: CardData[] = gallery
    .getPages()
    .map(({ url, data: d }) => ({
      url,
      title: d.title,
      description: d.description,
      format: d.format,
      domain: d.domain,
      tags: d.tags,
      credit: d.credit,
      store: d.store,
      href: octantLink(d),
      desktopOnly: d.desktop_only,
      thumbnail: d.thumbnail && asset(d.thumbnail),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="container max-w-6xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Gallery</h1>
      <p className="text-fd-muted-foreground mb-8 max-w-2xl">
        Public datasets read straight from cloud storage. Open one in Octant's
        web app, or copy its link and paste it into the desktop app. Each
        dataset belongs to its provider: follow the credit and license on its
        page.{" "}
        <a
          className="underline"
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/tree/${gitConfig.branch}/content/gallery`}
        >
          Add a dataset
        </a>
        .
      </p>
      <GalleryGrid cards={cards} />
    </main>
  );
}
