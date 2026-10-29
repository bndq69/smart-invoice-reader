import { SiteShell, siteMetadata, siteViewport } from "@/app/_components/site-shell";

// Root layout for the English site at `/en`.
export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
