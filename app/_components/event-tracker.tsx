"use client";

import { useEffect } from "react";
import type { Locale } from "@/app/_dictionaries";

function send(event: Record<string, string>) {
  const body = JSON.stringify(event);
  try {
    // sendBeacon survives the page being left, so a WhatsApp click is never held up.
    if (navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }))) return;
    fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(
      () => {},
    );
  } catch {}
}

// Counts one visit per page load and every click on a WhatsApp button marked
// with `data-wa`. Tracking failures are ignored on purpose.
export function EventTracker({ locale }: { locale: Locale }) {
  useEffect(() => {
    send({ kind: "visit", language: locale, referrer: document.referrer });

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLElement>("[data-wa]");
      if (link?.dataset.wa) send({ kind: "whatsapp_click", language: locale, button: link.dataset.wa });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);
  return null;
}
