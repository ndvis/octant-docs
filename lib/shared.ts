import { createGetUrl } from "fumadocs-core/source";

export const appName = "Octant";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";

/** Prefix for files and fetches outside Next's router (`<img>`, `fetch`), which basePath does not rewrite. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

/** The Octant web app; its share-link query (`?src=…&var=…`) opens a store. */
export const octantWebApp = "https://ndvis.github.io/octant/";
export const octantRepo = "https://github.com/ndvis/octant";
export const releases = `${octantRepo}/releases/latest/download`;

// Where "Edit on GitHub" points: this docs repository.
export const gitConfig = {
  user: "ndvis",
  repo: "octant-docs",
  branch: "main",
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
