"use client";

import { useEffect } from "react";

// Fades `.reveal` blocks in as they scroll into view, like the old page.
export function RevealOnScroll() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    items.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden if the observer is throttled
    const timer = setTimeout(() => items.forEach((el) => el.classList.add("in")), 3000);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return null;
}
