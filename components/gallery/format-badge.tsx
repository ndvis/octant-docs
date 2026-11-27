/**
 * A store format as a colored label, one color per format so each is told
 * apart at a glance (the formats of `galleryEntrySchema`). Class names are
 * written out in full so Tailwind finds them.
 */
const colors: Record<string, string> = {
  icechunk: "bg-sky-500/10 text-sky-700 ring-sky-500/30 dark:text-sky-300",
  zarr: "bg-violet-500/10 text-violet-700 ring-violet-500/30 dark:text-violet-300",
  "ome-zarr":
    "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
  geotiff:
    "bg-amber-500/10 text-amber-800 ring-amber-500/30 dark:text-amber-300",
  netcdf:
    "bg-indigo-500/10 text-indigo-700 ring-indigo-500/30 dark:text-indigo-300",
  hdf5: "bg-lime-500/10 text-lime-800 ring-lime-500/30 dark:text-lime-300",
  grib: "bg-rose-500/10 text-rose-700 ring-rose-500/30 dark:text-rose-300",
};

const neutral =
  "bg-fd-muted text-fd-muted-foreground ring-fd-border dark:text-fd-muted-foreground";

export function FormatBadge({ format }: { format: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[format] ?? neutral}`}
    >
      {format}
    </span>
  );
}
