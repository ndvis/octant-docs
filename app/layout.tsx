import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ndvis.github.io/octant-docs/"),
  title: { default: "Octant", template: "%s · Octant" },
  description:
    "An interactive viewer for N-dimensional datasets, stored locally or in cloud object storage.",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
