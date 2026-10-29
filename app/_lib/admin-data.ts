import "server-only";
import { adminRest } from "./supabase-admin";

export const statuses = ["new", "contacted", "activated", "rejected"] as const;
export type Status = (typeof statuses)[number];

export type ContactRequest = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  shop_name: string | null;
  city: string | null;
  business_type: string;
  message: string | null;
  language: "ar" | "en";
  site: "new" | "backup";
  status: Status;
};

export async function getContactRequests(): Promise<ContactRequest[]> {
  const columns = "id,created_at,name,phone,shop_name,city,business_type,message,language,site,status";
  const res = await adminRest(`contact_requests?select=${columns}&order=created_at.desc&limit=300`);
  return res.json();
}

export type Period = "today" | "week" | "month";
export const periods: Period[] = ["today", "week", "month"];
type PeriodCounts = Record<Period, number>;
const zero = (): PeriodCounts => ({ today: 0, week: 0, month: 0 });

export type EventStats = {
  visits: { ar: PeriodCounts; en: PeriodCounts };
  clicks: Record<string, PeriodCounts>;
};

// Midnight in Cairo, as a Date. "Today" means Cairo's day, whatever the server's clock zone is.
function startOfCairoDay(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, Number(p.value)]),
  );
  const wallClockAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  const offset = wallClockAsUtc - Math.floor(now.getTime() / 60000) * 60000;
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day) - offset);
}

type EventRow = { kind: "visit" | "whatsapp_click"; language: "ar" | "en"; button: string | null; created_at: string };

export async function getEventStats(): Promise<EventStats> {
  const now = new Date();
  const since = {
    today: startOfCairoDay(now).getTime(),
    week: now.getTime() - 7 * 86400000,
    month: now.getTime() - 30 * 86400000,
  };
  const stats: EventStats = { visits: { ar: zero(), en: zero() }, clicks: {} };

  // Counted here in pages of 1000 rows: one small site, so this stays cheap.
  for (let offset = 0; offset < 50000; offset += 1000) {
    const query = `site_events?select=kind,language,button,created_at&created_at=gte.${new Date(since.month).toISOString()}&order=id&limit=1000&offset=${offset}`;
    const rows: EventRow[] = await (await adminRest(query)).json();
    for (const row of rows) {
      const time = new Date(row.created_at).getTime();
      const target = row.kind === "visit" ? stats.visits[row.language] : (stats.clicks[row.button ?? ""] ??= zero());
      if (!target) continue;
      for (const period of periods) if (time >= since[period]) target[period]++;
    }
    if (rows.length < 1000) break;
  }
  return stats;
}

export type SiteStatus = { name: string; detail: string; ok: boolean; ms: number | null };

async function check(name: string, detail: string, run: () => Promise<unknown>): Promise<SiteStatus> {
  const started = Date.now();
  try {
    await run();
    return { name, detail, ok: true, ms: Date.now() - started };
  } catch {
    return { name, detail, ok: false, ms: null };
  }
}

async function ping(url: string) {
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(4000) });
  await res.body?.cancel();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// Checked every time the page loads, each with a 4-second limit.
export async function getServerStatus(): Promise<SiteStatus[]> {
  return Promise.all([
    // This page is being served by the new site, so it is up.
    Promise.resolve<SiteStatus>({ name: "الموقع الجديد", detail: "الصفحة دي شغالة منه", ok: true, ms: 0 }),
    check("Supabase", "قاعدة البيانات", () =>
      adminRest("contact_requests?select=id&limit=1", { signal: AbortSignal.timeout(4000) }),
    ),
    check("Cloudflare", "الموقع الاحتياطي", () => ping("https://smart-invoice-reader.islambndq.workers.dev/")),
    check("GitHub Pages", "الموقع الاحتياطي", () => ping("https://bndq69.github.io/smart-invoice-reader/")),
  ]);
}
