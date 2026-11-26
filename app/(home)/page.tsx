import Link from "next/link";
import { asset, octantWebApp, releases } from "@/lib/shared";

const primary =
  "inline-flex items-center justify-center rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90";
const secondary =
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-fd-accent";

const downloads = [
  ["macOS", "Apple silicon", `${releases}/Octant-macOS-arm64.dmg`],
  ["Windows", "x64", `${releases}/Octant-Windows-x64-setup.exe`],
  ["Linux", "AppImage", `${releases}/Octant-Linux-x86_64.AppImage`],
] as const;

const features = [
  {
    title: "Climate to microscopy",
    body: "Zarr, Icechunk, OME-Zarr, NetCDF, HDF5, GRIB and Cloud-Optimized GeoTIFF, in one app.",
  },
  {
    title: "Straight from the cloud",
    body: "Reads S3, Google Cloud Storage, Azure or HTTP directly, fetching only the chunks on screen. No server, no download.",
  },
  {
    title: "Every view, one click",
    body: "Heatmaps, line plots, globes, surfaces, GPU volume rendering and point clouds, on the same data.",
  },
  {
    title: "Desktop and browser",
    body: "A native app, and the same Rust code in the browser, so a shared link opens the same view anywhere.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-4">
      <section className="flex flex-col items-center text-center max-w-3xl pt-20 pb-12">
        <img
          src={asset("/octant-app-icon.svg")}
          alt=""
          width={88}
          height={88}
          className="mb-6"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Octant
        </h1>
        <p className="text-lg text-fd-muted-foreground mb-8">
          An interactive viewer for N-dimensional datasets, stored locally or in
          cloud object storage. Built in Rust with GPU rendering, on desktop and
          in the browser.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link href="/docs" className={primary}>
            Get started
          </Link>
          <a href={octantWebApp} className={secondary}>
            Try it in your browser
          </a>
          <Link href="/gallery" className={secondary}>
            Gallery
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {downloads.map(([os, arch, url]) => (
            <a
              key={os}
              href={url}
              className="rounded-md border px-3 py-1.5 hover:bg-fd-accent"
            >
              <span className="font-medium">{os}</span>{" "}
              <span className="text-fd-muted-foreground">{arch}</span>
            </a>
          ))}
        </div>
      </section>

      <img
        src={asset("/screenshot.png")}
        alt="Octant showing global 10 m wind speed as a heatmap with coastlines, a colorbar and the playback bar"
        className="w-full max-w-5xl rounded-xl border shadow-lg"
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl py-16">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-fd-card p-5">
            <h2 className="font-semibold mb-2">{f.title}</h2>
            <p className="text-sm text-fd-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
