import type { Dictionary } from "@/app/_dictionaries";

type DiagramText = Dictionary["exchange"]["diagram"];

// The old page's diagram is drawn right-to-left (rep on the right, owner on the
// left). In English it's mirrored so the file still travels in reading order.
export function ExchangeDiagram({ text, rtl }: { text: DiagramText; rtl: boolean }) {
  const x = (pos: number, width = 0) => (rtl ? pos : 700 - pos - width);
  return (
    <div className="sync-diagram reveal" aria-label={text.label}>
      <svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" role="img">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--primary)" />
          </marker>
        </defs>
        {/* Rep phone */}
        <g transform={`translate(${x(560, 90)} 30)`}>
          <rect x="0" y="0" width="90" height="140" rx="16" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="2" />
          <rect x="10" y="14" width="70" height="100" rx="8" fill="var(--bg-elev)" />
          <text x="45" y="60" textAnchor="middle" fontSize="28">👤</text>
          <text x="45" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">{text.rep}</text>
          <circle cx="45" cy="126" r="5" fill="var(--border)" />
        </g>
        {/* Owner phone */}
        <g transform={`translate(${x(50, 90)} 30)`}>
          <rect x="0" y="0" width="90" height="140" rx="16" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="2" />
          <rect x="10" y="14" width="70" height="100" rx="8" fill="var(--bg-elev)" />
          <text x="45" y="60" textAnchor="middle" fontSize="28">👑</text>
          <text x="45" y="98" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">{text.owner}</text>
          <circle cx="45" cy="126" r="5" fill="var(--border)" />
        </g>
        {/* Arrow rep -> WhatsApp */}
        <path d={`M${x(555)} 100 L${x(430)} 100`} stroke="var(--primary)" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr)" />
        {/* WhatsApp bubble */}
        <g transform={`translate(${x(350, 80)} 60)`}>
          <rect x="0" y="0" width="80" height="80" rx="20" fill="var(--whatsapp)" />
          <path transform="translate(16 16) scale(2)" fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.9.5a2.5 2.5 0 0 0 1.6-1.1c.2-.6.2-1 .1-1.1l-.6-.3z" />
        </g>
        {/* File label */}
        <g transform={`translate(${x(300, 180)} 20)`}>
          <rect x="0" y="0" width="180" height="30" rx="15" fill="var(--primary-soft)" />
          <text x="90" y="21" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--primary)" fontFamily="var(--font-sans)">{text.file}</text>
        </g>
        {/* Arrow WhatsApp -> owner */}
        <path d={`M${x(345)} 100 L${x(150)} 100`} stroke="var(--primary)" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr)" />
        <text x={x(245)} y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-muted)" fontFamily="var(--font-sans)">{text.receive}</text>
        <text x={x(490)} y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-muted)" fontFamily="var(--font-sans)">{text.send}</text>
      </svg>
    </div>
  );
}
