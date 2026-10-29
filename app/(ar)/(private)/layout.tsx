import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import type { Metadata } from "next";

// The developer's pages: sign-in and the admin page. Clerk loads only here, not
// on the public site (ADR 0001), and search engines are told to stay out.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider localization={arSA}>{children}</ClerkProvider>;
}
