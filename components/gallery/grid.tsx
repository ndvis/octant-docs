"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormatBadge } from "./format-badge";
import { OpenButtons } from "./open-buttons";

export interface CardData {
  url: string;
  title: string;
  description: string;
  format: string;
  domain: string;
  tags: string[];
  credit: string;
  store: string;
  href: string;
  desktopOnly: boolean;
  thumbnail?: string;
}

const chip = "rounded-full border px-3 py-1 text-sm transition-colors";

export function GalleryGrid({ cards }: { cards: CardData[] }) {
  const [domain, setDomain] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const domains = useMemo(
    () => [...new Set(cards.map((c) => c.domain))].sort(),
    [cards],
  );

  const q = query.trim().toLowerCase();
  const shown = cards.filter(
    (c) =>
      (!domain || c.domain === domain) &&
      (!q ||
        [c.title, c.description, c.credit, c.format, ...c.tags].some((t) =>
          t.toLowerCase().includes(q),
        )),
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search datasets"
          aria-label="Search datasets"
          className="rounded-md border bg-fd-background px-3 py-1.5 text-sm min-w-56 flex-1 sm:flex-none"
        />
        {[null, ...domains].map((d) => (
          <button
            key={d ?? "all"}
            type="button"
            aria-pressed={domain === d}
            onClick={() => setDomain(d)}
            className={`${chip} ${domain === d ? "bg-fd-primary text-fd-primary-foreground" : "hover:bg-fd-accent"}`}
          >
            {d ? d.replace("-", " ") : "all"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <article
            key={c.url}
            className="flex flex-col rounded-xl border bg-fd-card overflow-hidden transition duration-200 hover:border-fd-primary/30 hover:shadow-md motion-safe:hover:-translate-y-0.5"
          >
            <Link href={c.url} className="block aspect-video bg-fd-muted">
              {c.thumbnail ? (
                <img
                  src={c.thumbnail}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <FormatBadge format={c.format} />
                </div>
              )}
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <Link href={c.url} className="font-semibold hover:underline">
                  {c.title}
                </Link>
                <span className="shrink-0 pt-0.5">
                  <FormatBadge format={c.format} />
                </span>
              </div>
              <p className="text-sm text-fd-muted-foreground flex-1">
                {c.description}
              </p>
              <p className="text-xs text-fd-muted-foreground">{c.credit}</p>
              <OpenButtons
                href={c.href}
                store={c.store}
                desktopOnly={c.desktopOnly}
              />
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="text-fd-muted-foreground">No dataset matches.</p>
      )}
    </>
  );
}
