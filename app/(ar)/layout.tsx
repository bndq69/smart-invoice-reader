import { SiteShell, siteMetadata, siteViewport } from "@/app/_components/site-shell";

// Root layout for the Arabic site at `/` (and the developer's sign-in and admin pages).
export const metadata = siteMetadata("ar");
export const viewport = siteViewport;

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="ar">{children}</SiteShell>;
}
