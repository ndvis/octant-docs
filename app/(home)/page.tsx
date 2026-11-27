import Link from "next/link";
import { AnimatedLogo } from "@/components/home/animated-logo";
import { DownloadButton } from "@/components/home/download-button";
import { HeroVideo } from "@/components/home/hero-video";
import { RotatingWord } from "@/components/home/rotating-word";
import { asset, octantWebApp } from "@/lib/shared";

const primary =
  "inline-flex items-center justify-center rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90";
const secondary =
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent";

const WORDS = [
  "climate",
  "oceans",
  "forecasts",
  "satellite imagery",
  "microscopy",
  "volumes",
];

const ROWS = [
  {
    title: "Straight from the cloud",
    body: "Zarr, Icechunk, OME-Zarr, NetCDF, HDF5, GRIB and GeoTIFF from S3, Google Cloud, Azure or HTTP. Only the chunks on screen are read.",
  },
  {
    title: "Every view, one click",
    body: "Heatmap, globe, surface, volume or point cloud: switch on the same data, and animate along any dimension.",
  },
  {
    title: "One link, any screen",
    body: "Share what you see. The link opens the same view in the browser, or in the desktop app.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-4">
      {/* Stacked and centered on narrow screens; text left, reel right on wide ones. */}
      <section className="grid w-full max-w-7xl items-center gap-12 pt-16 pb-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-24">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <AnimatedLogo />
          <h1
            className="octant-rise mt-6 text-5xl sm:text-6xl font-semibold tracking-tight"
            style={{ animationDelay: "0.9s" }}
          >
            Octant
          </h1>
          <p
            className="octant-rise mt-4 text-xl sm:text-2xl text-fd-muted-foreground"
            style={{ animationDelay: "1.1s" }}
          >
            N-dimensional data, in motion. <br />
            Explore <RotatingWord words={WORDS} />
          </p>
          <div
            className="octant-rise mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
            style={{ animationDelay: "1.3s" }}
          >
            <a href={octantWebApp} className={primary}>
              Try in browser
            </a>
            <DownloadButton
              className={secondary}
              fallback={asset("/docs/installation")}
            />
            <Link href="/gallery" className={secondary}>
              Gallery
            </Link>
          </div>
        </div>

        <div className="octant-rise w-full" style={{ animationDelay: "1.5s" }}>
          <HeroVideo />
        </div>
      </section>

      <section className="w-full max-w-3xl py-24 flex flex-col gap-16">
        {ROWS.map((r) => (
          <div key={r.title} className="octant-reveal text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {r.title}
            </h2>
            <p className="mt-3 text-fd-muted-foreground text-lg">{r.body}</p>
          </div>
        ))}
        <p className="octant-reveal text-center">
          <Link href="/docs" className="text-sm underline">
            Read the docs
          </Link>
        </p>
      </section>
    </main>
  );
}
