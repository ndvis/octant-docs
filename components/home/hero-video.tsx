"use client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/shared";

/**
 * The reel of Octant at work: muted and looping, with a pause button (WCAG 2.2.2,
 * motion longer than 5 s). Starts paused when motion is reduced or autoplay is refused.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // React does not render `muted` into the HTML, and browsers only autoplay muted video.
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        className="w-full aspect-video rounded-2xl border bg-black shadow-2xl"
        poster={asset("/hero-poster.jpg")}
        muted
        loop
        playsInline
        preload="auto"
        src={asset("/hero.mp4")}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Octant at work: a wind globe in time, a satellite image zoomed, a cut-open sphere, 3D slices, microscopy, a head volume, a point cloud and atmospheric flow"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
      >
        {playing ? (
          <Pause className="size-4" fill="currentColor" />
        ) : (
          <Play className="size-4" fill="currentColor" />
        )}
      </button>
    </div>
  );
}
