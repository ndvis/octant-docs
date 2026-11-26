import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, asset, octantRepo, octantWebApp } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src={asset("/octant-app-icon.svg")}
            alt=""
            width={24}
            height={24}
          />
          <span className="font-semibold">{appName}</span>
        </>
      ),
    },
    links: [
      { text: "Docs", url: "/docs", active: "nested-url" },
      { text: "Gallery", url: "/gallery", active: "nested-url" },
      { text: "Web app", url: octantWebApp, external: true },
    ],
    githubUrl: octantRepo,
  };
}
