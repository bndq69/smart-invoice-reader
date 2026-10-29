import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Cairo } from "next/font/google";
import { getDictionary, localeSettings, type Locale } from "@/app/_dictionaries";
import { WhatsAppIcon } from "./icons";
import { BurgerButton, MobileMenu, MobileMenuProvider } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import { whatsappLink } from "./whatsapp";
import "@/app/globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

// Runs before paint so a saved theme never flashes the other one first.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

// Cached so the page stays static; refreshed daily so the year rolls over on its own.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function siteMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: meta.author }],
    openGraph: { title: meta.ogTitle, description: meta.ogDescription, type: "website" },
    icons: { icon: "/assets/app-icon.png", apple: "/assets/app-icon.png" },
    alternates: { languages: { ar: "/", en: "/en" } },
  };
}

export const siteViewport: Viewport = {
  themeColor: "#1d4ed8",
};

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  const { dir, home } = localeSettings[locale];
  const other: Locale = locale === "ar" ? "en" : "ar";
  const waUrl = whatsappLink(dict.whatsapp.defaultMessage);
  // Section anchors point at the home page so they also work from /sign-in.
  const onHome = (links: { href: string; label: string }[]) =>
    links.map((link) => ({ ...link, href: home + link.href }));

  return (
    <html lang={locale} dir={dir} className={cairo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="header">
          <MobileMenuProvider>
            <div className="container">
              <nav className="nav" aria-label={dict.header.navLabel}>
                <a href={home + "#top"} className="brand">
                  <span className="brand-icon" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/app-icon.png" width={192} height={192} alt="" />
                  </span>
                  <span>{dict.header.brand}</span>
                </a>
                <ul className="nav-links">
                  {onHome(dict.header.nav).map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
                <div className="nav-cta">
                  <a className="btn btn-whatsapp btn-sm" href={waUrl} target="_blank" rel="noopener" data-wa="header">
                    <WhatsAppIcon />
                    {dict.header.cta}
                  </a>
                  <div className="nav-tools">
                    <Link
                      href={localeSettings[other].home}
                      hrefLang={other}
                      lang={other}
                      className="lang-switch"
                      aria-label={dict.header.switchLanguageLabel}
                    >
                      {dict.header.switchLanguage}
                    </Link>
                    <ThemeToggle label={dict.header.themeToggle} />
                    <BurgerButton label={dict.header.openMenu} />
                  </div>
                </div>
              </nav>
              <MobileMenu links={onHome(dict.header.mobileNav)} />
            </div>
          </MobileMenuProvider>
        </header>
        <main id="top">{children}</main>
        <footer className="footer">
          <div className="container row">
            <div>
              © <CurrentYear /> {dict.footer.copyright} <strong>{dict.footer.developer}</strong>
            </div>
            <div className="links">
              {onHome(dict.footer.links).map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
              <Link href="/sign-in" className="footer-signin">
                {dict.footer.signIn}
              </Link>
            </div>
          </div>
        </footer>
        <a
          className="fab-wa"
          href={waUrl}
          target="_blank"
          rel="noopener"
          aria-label={dict.whatsapp.fabLabel}
          data-wa="floating"
        >
          <WhatsAppIcon />
        </a>
      </body>
    </html>
  );
}
