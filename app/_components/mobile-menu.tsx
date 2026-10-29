"use client";

import { createContext, useContext, useState } from "react";
import { MenuIcon } from "./icons";

type NavLink = { href: string; label: string };

// The burger button sits in the nav row and the menu opens under it, so they
// share their open state through this provider.
const MenuState = createContext<[boolean, (open: boolean) => void]>([false, () => {}]);

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const state = useState(false);
  return <MenuState.Provider value={state}>{children}</MenuState.Provider>;
}

export function BurgerButton({ label }: { label: string }) {
  const [open, setOpen] = useContext(MenuState);
  return (
    <button
      type="button"
      className="burger"
      aria-label={label}
      aria-expanded={open}
      aria-controls="mobileMenu"
      onClick={() => setOpen(!open)}
    >
      <MenuIcon />
    </button>
  );
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useContext(MenuState);
  return (
    <div className={open ? "mobile-menu open" : "mobile-menu"} id="mobileMenu">
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
