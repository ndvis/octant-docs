"use client";
import { useEffect, useState } from "react";
import { releases } from "@/lib/shared";

const INSTALLERS = {
  macOS: `${releases}/Octant-macOS-arm64.dmg`,
  Windows: `${releases}/Octant-Windows-x64-setup.exe`,
  Linux: `${releases}/Octant-Linux-x86_64.AppImage`,
} as const;

type Os = keyof typeof INSTALLERS;

function detectOs(): Os | null {
  const ua = navigator.userAgent;
  if (/Mac/.test(ua) && !/iPhone|iPad/.test(ua)) return "macOS";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua) && !/Android/.test(ua)) return "Linux";
  return null;
}

/** The installer for the visitor's system; every installer on the docs page otherwise (and before hydration). */
export function DownloadButton({
  className,
  fallback,
}: {
  className: string;
  fallback: string;
}) {
  const [os, setOs] = useState<Os | null>(null);
  useEffect(() => setOs(detectOs()), []);

  return (
    <a href={os ? INSTALLERS[os] : fallback} className={className}>
      {os ? `Download for ${os}` : "Download"}
    </a>
  );
}
