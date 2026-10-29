import type { Dictionary } from "@/app/_dictionaries";

type DiagramText = Dictionary["exchange"]["diagram"];

// The old page's diagram is drawn right-to-left (rep on the right, owner on the
// left). In English it's mirrored so the file still travels in reading order.
export function ExchangeDiagram({ text, rtl }: { text: DiagramText; rtl: boolean }) {
  const x = (pos: number, width = 0) => (rtl ? pos : 700 - pos - width);
  return (
    <div className="sync-diagram reveal" aria-label={text.label}>
      <svg viewBox="0 0 700 215" xmlns="http://www.w3.org/2000/svg" role="img">
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--primary)" />
          </marker>
        </defs>
        {/* Rep phone */}
        <g transform={`translate(${x(560, 90)} 25)`}>
          <rect x="0" y="0" width="90" height="140" rx="16" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="2" />
          <rect x="10" y="14" width="70" height="100" rx="8" fill="var(--bg-elev)" />
          <text x="45" y="60" textAnchor="middle" fontSize="28">👤</text>
          <text x="45" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">{text.rep}</text>
          <circle cx="45" cy="126" r="5" fill="var(--border)" />
        </g>
        {/* Owner phone */}
        <g transform={`translate(${x(50, 90)} 25)`}>
          <rect x="0" y="0" width="90" height="140" rx="16" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="2" />
          <rect x="10" y="14" width="70" height="100" rx="8" fill="var(--bg-elev)" />
          <text x="45" y="60" textAnchor="middle" fontSize="28">👑</text>
          <text x="45" y="98" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">{text.owner}</text>
          <circle cx="45" cy="126" r="5" fill="var(--border)" />
        </g>
        {/* Arrow rep -> File */}
        <path d={`M${x(555)} 95 L${x(445)} 95`} stroke="var(--primary)" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr1)" />
        {/* Multi-platform File Hub */}
        <g transform={`translate(${x(350, 86)} 50)`}>
          <rect x="0" y="0" width="86" height="86" rx="22" fill="var(--bg-elev)" stroke="var(--primary)" strokeWidth="2" />
          <rect x="8" y="8" width="70" height="70" rx="16" fill="var(--primary-soft)" />
          <path
            transform="translate(29 20) scale(1.2)"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M13 2v7h7"
          />
          <text x="43" y="67" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--primary)" fontFamily="var(--font-sans)">
            أي تطبيق 📤
          </text>
        </g>
        {/* Top file capsule */}
        <g transform={`translate(${x(295, 196)} 10)`}>
          <rect x="0" y="0" width="196" height="30" rx="15" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="1" />
          <text x="98" y="20" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--primary)" fontFamily="var(--font-sans)">
            ملف مشفر للمحل 🔒
          </text>
        </g>
        {/* Arrow File -> owner */}
        <path d={`M${x(345)} 95 L${x(150)} 95`} stroke="var(--primary)" strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arr1)" />
        {/* Labels nicely spaced without overlap */}
        <text x={x(495)} y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">
          {text.send}
        </text>
        <text x={x(245)} y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--text)" fontFamily="var(--font-sans)">
          استلام وتأكيد فوري
        </text>
        <text x={x(245)} y="145" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--green)" fontFamily="var(--font-sans)">
          ✓ من المندوب وبدون تكرار
        </text>
      </svg>
    </div>
  );
}
