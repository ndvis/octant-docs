"use client";
import { useEffect, useState } from "react";

/** Cycles through `words`, each fading up in place; holds the first one when motion is reduced. */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-block text-fd-foreground">
      {/* the longest word holds the width, so the line does not jump */}
      <span className="invisible">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span
        key={i}
        className="octant-word absolute inset-0 text-center lg:text-left"
      >
        {words[i]}
      </span>
    </span>
  );
}
