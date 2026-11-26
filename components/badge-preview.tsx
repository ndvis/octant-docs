import { asset } from "@/lib/shared";

/** The two "Open in Octant" badges, as other pages will show them. */
export function BadgePreview() {
  return (
    <div className="not-prose flex items-center gap-4 rounded-lg border p-4">
      <img src={asset("/badge/open-in-octant.svg")} alt="Open in Octant" />
      <img src={asset("/badge/octant.svg")} alt="Open in Octant" />
    </div>
  );
}
