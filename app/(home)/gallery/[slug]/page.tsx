import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormatBadge } from "@/components/gallery/format-badge";
import { OpenButtons } from "@/components/gallery/open-buttons";
import { getMDXComponents } from "@/components/mdx";
import { gallery, octantLink } from "@/lib/gallery";
import { asset } from "@/lib/shared";

export default async function EntryPage(props: PageProps<"/gallery/[slug]">) {
  const { slug } = await props.params;
  const page = gallery.getPage([slug]);
  if (!page) notFound();
  const d = page.data;
  const Body = d.body;

  const facts: [string, React.ReactNode][] = [
    ["Format", <FormatBadge key="f" format={d.format} />],
    ["Credit", d.credit],
    [
      "License",
      d.license_url ? (
        <a key="l" href={d.license_url}>
          {d.license}
        </a>
      ) : (
        d.license
      ),
    ],
    [
      "Source",
      <a key="s" href={d.source_page}>
        {new URL(d.source_page).hostname}
      </a>,
    ],
    [
      "Store",
      <code key="c" className="break-all">
        {d.store}
      </code>,
    ],
  ];
  if (d.citation) facts.push(["Cite as", d.citation]);

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <Link
        href="/gallery"
        className="text-sm text-fd-muted-foreground hover:underline"
      >
        ← Gallery
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{d.title}</h1>
      <p className="text-fd-muted-foreground mb-6">{d.description}</p>
      <OpenButtons
        href={octantLink(d)}
        store={d.store}
        desktopOnly={d.desktop_only}
      />
      {d.thumbnail && (
        <img
          src={asset(d.thumbnail)}
          alt=""
          className="mt-8 w-full rounded-xl border"
        />
      )}
      <div className="prose mt-8">
        <Body components={getMDXComponents()} />
      </div>
      <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm border-t pt-6 [&_a]:underline">
        {facts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-fd-muted-foreground">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}

export function generateStaticParams() {
  return gallery.getPages().map((p) => ({ slug: p.slugs[0] }));
}

export async function generateMetadata(
  props: PageProps<"/gallery/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = gallery.getPage([slug]);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
