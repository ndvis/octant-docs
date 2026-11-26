"use client";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { asset } from "@/lib/shared";

const button =
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground";

function CopyButton({
  text,
  label,
  icon,
}: {
  text: string;
  label: string;
  icon: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={button}
      title={text}
      onClick={() =>
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
      }
    >
      {copied ? <Check className="size-4" /> : icon}
      {copied ? "Copied" : label}
    </button>
  );
}

/** Open in Octant's web app, or copy its link or the bare store address. */
export function OpenButtons({
  href,
  store,
  desktopOnly,
}: {
  href: string;
  store: string;
  desktopOnly: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {desktopOnly ? (
        <span
          className={`${button} cursor-not-allowed opacity-60`}
          title="This server sends no CORS headers, so browsers cannot read it. Paste the store address into the desktop app."
        >
          <img src={asset("/octant-app-icon.svg")} alt="" className="size-4" />
          Desktop only
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`${button} bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 hover:text-fd-primary-foreground`}
        >
          <img src={asset("/octant-app-icon.svg")} alt="" className="size-4" />
          Open in Octant
        </a>
      )}
      {!desktopOnly && (
        <CopyButton
          text={href}
          label="Copy link"
          icon={<LinkIcon className="size-4" />}
        />
      )}
      <CopyButton
        text={store}
        label="Copy store URL"
        icon={<Copy className="size-4" />}
      />
    </div>
  );
}
