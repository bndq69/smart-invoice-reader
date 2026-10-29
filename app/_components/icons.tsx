// SVG icons from the old page (branch `landing-html`).
type IconProps = { className?: string };

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.9.5a2.5 2.5 0 0 0 1.6-1.1c.2-.6.2-1 .1-1.1l-.6-.3z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...stroke} strokeWidth="2.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg {...stroke} strokeWidth="2.5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PlusIcon({ strokeWidth = "2.5" }: { strokeWidth?: string }) {
  return (
    <svg {...stroke} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg {...stroke} strokeWidth="2.2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function BoltIcon() {
  return (
    <svg {...stroke} width="16" height="16" strokeWidth="2.2" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

export function SignalIcon() {
  return (
    <svg {...stroke} strokeWidth="2.2" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

export function PowerIcon() {
  return (
    <svg {...stroke} strokeWidth="2.2" aria-hidden="true">
      <path d="M18.4 5.6a9 9 0 1 1-12.8 0" />
      <path d="M12 2v10" />
    </svg>
  );
}

// Trust bar icons, in the order of `trust` in the dictionaries.
export const trustIcons = [
  <svg key="offline" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M5 12.5a7 7 0 0 1 14 0" />
    <path d="M8.5 15a3.5 3.5 0 0 1 7 0" />
    <circle cx="12" cy="18" r="1" />
    <path d="M2 2l20 20" />
  </svg>,
  <svg key="code" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 12h.01M11 12h.01M15 12h.01" />
  </svg>,
  <svg key="scan" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <path d="M8 12h8" />
  </svg>,
  <svg key="shield" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
];

// Problem card icons, in the order of `problems.cards` in the dictionaries.
export const problemIcons = [
  <svg key="lock" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>,
  <svg key="user-plus" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M19 8v6M16 11h6" />
  </svg>,
  <svg key="phone-off" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
    <path d="M4 8l16 8" />
  </svg>,
  <svg key="trend" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>,
  <svg key="camera" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M4 7a2 2 0 0 1 2-2h2l1.5-2h5L16 5h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>,
  <svg key="card" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M4 6h16v12H4z" />
    <path d="M4 10h16" />
    <path d="M8 15h3" />
  </svg>,
  <svg key="swap" {...stroke} strokeWidth="2.2" aria-hidden="true">
    <path d="M7 7h11l-3-3" />
    <path d="M17 17H6l3 3" />
  </svg>,
];
