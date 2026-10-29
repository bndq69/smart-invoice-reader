import type { Metadata } from "next";
import { requireAdmin } from "@/app/_lib/admin";
import {
  getContactRequests,
  getEventStats,
  getServerStatus,
  periods,
  statuses,
  type ContactRequest,
  type EventStats,
  type Period,
  type SiteStatus,
} from "@/app/_lib/admin-data";
import { getDictionary } from "@/app/_dictionaries";
import { WhatsAppIcon } from "@/app/_components/icons";
import { StatusSelect } from "./status-select";

export const metadata: Metadata = { title: "الإدارة" };

const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "اتكلمنا معاه",
  activated: "اتفعّل",
  rejected: "مرفوض",
};
const statusOptions = statuses.map((value) => ({ value, label: statusLabels[value] }));
const periodLabels: Record<Period, string> = { today: "النهارده", week: "آخر 7 أيام", month: "آخر 30 يوم" };
const buttonLabels: Record<string, string> = {
  header: "زرار الهيدر",
  trial: "التجربة المجانية",
  monthly: "الباقة الشهرية",
  yearly: "الباقة السنوية",
  contact: "قسم كلمنا",
  final_cta: "الدعوة الأخيرة",
  floating: "الزرار العايم",
};
const siteLabels = { new: "الموقع الجديد", backup: "الموقع الاحتياطي" };
const languageLabels = { ar: "عربي", en: "إنجليزي" };

const dateFormat = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" });
const numberFormat = new Intl.NumberFormat("ar-EG");

type Loaded<T> = { ok: true; data: T } | { ok: false };
async function load<T>(what: string, run: () => Promise<T>): Promise<Loaded<T>> {
  try {
    return { ok: true, data: await run() };
  } catch (err) {
    console.error(`Admin page: could not load ${what}:`, err);
    return { ok: false };
  }
}

// Egyptian mobile number -> wa.me number (country code, no plus, no leading zero).
function whatsappNumber(phone: string) {
  return "20" + phone.replace(/\D/g, "").replace(/^(20|0)/, "");
}

function whatsappHref(request: ContactRequest) {
  const message =
    request.language === "en"
      ? `Hi ${request.name}, this is Islam from Smart Invoice Reader. We received your request on the website.`
      : `أهلاً ${request.name}، معاك إسلام من قارئ الفواتير الذكي. وصلنا طلبك على الموقع.`;
  return `https://wa.me/${whatsappNumber(request.phone)}?text=${encodeURIComponent(message)}`;
}

export default async function AdminPage() {
  await requireAdmin();

  const [requests, stats, servers] = await Promise.all([
    load("contact requests", getContactRequests),
    load("site events", getEventStats),
    getServerStatus(),
  ]);

  return (
    <div className="container admin">
      <h1>الإدارة</h1>
      <ServerStatus servers={servers} />
      {stats.ok ? <Stats stats={stats.data} /> : <Unavailable what="الزيارات وضغطات الواتساب" />}
      {requests.ok ? <Requests requests={requests.data} /> : <Unavailable what="طلبات التواصل" />}
    </div>
  );
}

function Unavailable({ what }: { what: string }) {
  return (
    <section className="admin-section">
      <p className="admin-error">
        مقدرناش نحمّل {what}. اتأكد إن <code>SUPABASE_SECRET_KEY</code> متحط في متغيرات البيئة، وبعدين حدّث الصفحة.
      </p>
    </section>
  );
}

function ServerStatus({ servers }: { servers: SiteStatus[] }) {
  return (
    <section className="admin-section">
      <h2>وضع السيرفرات</h2>
      <ul className="status-grid">
        {servers.map((server) => (
          <li key={server.name} className="card status-card">
            <span className={server.ok ? "dot ok" : "dot fail"} aria-hidden="true" />
            <div>
              <strong>{server.name}</strong>
              <div className="muted">{server.detail}</div>
              <div className={server.ok ? "state ok" : "state fail"}>
                {server.ok ? "شغال" : "واقع أو بيرد ببطء"}
                {server.ok && server.ms ? ` · ${numberFormat.format(server.ms)} م.ث` : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stats({ stats }: { stats: EventStats }) {
  const buttons = Object.keys(buttonLabels);
  return (
    <section className="admin-section">
      <h2>الزيارات</h2>
      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              {periods.map((p) => (
                <th key={p}>{periodLabels[p]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["ar", "en"] as const).map((lang) => (
              <tr key={lang}>
                <th scope="row">{languageLabels[lang]}</th>
                {periods.map((p) => (
                  <td key={p}>{numberFormat.format(stats.visits[lang][p])}</td>
                ))}
              </tr>
            ))}
            <tr className="total">
              <th scope="row">الإجمالي</th>
              {periods.map((p) => (
                <td key={p}>{numberFormat.format(stats.visits.ar[p] + stats.visits.en[p])}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <h2>ضغطات الواتساب</h2>
      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>الزرار</th>
              {periods.map((p) => (
                <th key={p}>{periodLabels[p]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buttons.map((button) => (
              <tr key={button}>
                <th scope="row">{buttonLabels[button]}</th>
                {periods.map((p) => (
                  <td key={p}>{numberFormat.format(stats.clicks[button]?.[p] ?? 0)}</td>
                ))}
              </tr>
            ))}
            <tr className="total">
              <th scope="row">الإجمالي</th>
              {periods.map((p) => (
                <td key={p}>{numberFormat.format(buttons.reduce((sum, b) => sum + (stats.clicks[b]?.[p] ?? 0), 0))}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Requests({ requests }: { requests: ContactRequest[] }) {
  const businessTypes = getDictionary("ar").contact.form.types as Record<string, string>;
  return (
    <section className="admin-section">
      <h2>طلبات التواصل ({numberFormat.format(requests.length)})</h2>
      {requests.length === 0 && <p className="muted">مفيش طلبات لسه.</p>}
      <ul className="request-list">
        {requests.map((request) => (
          <li key={request.id} className="card request">
            <div className="request-head">
              <strong>{request.name}</strong>
              <time dateTime={request.created_at} className="muted">
                {dateFormat.format(new Date(request.created_at))}
              </time>
            </div>
            <dl className="request-fields">
              <div>
                <dt>الموبايل</dt>
                <dd dir="ltr">{request.phone}</dd>
              </div>
              {request.shop_name && (
                <div>
                  <dt>المحل</dt>
                  <dd>{request.shop_name}</dd>
                </div>
              )}
              {request.city && (
                <div>
                  <dt>المدينة</dt>
                  <dd>{request.city}</dd>
                </div>
              )}
              <div>
                <dt>النشاط</dt>
                <dd>{businessTypes[request.business_type] ?? request.business_type}</dd>
              </div>
            </dl>
            {request.message && <p className="request-message">{request.message}</p>}
            <div className="request-foot">
              <span className="chips">
                <span className="chip">{languageLabels[request.language]}</span>
                <span className="chip">{siteLabels[request.site]}</span>
              </span>
              <StatusSelect id={request.id} status={request.status} options={statusOptions} />
              <a className="btn btn-whatsapp btn-sm" href={whatsappHref(request)} target="_blank" rel="noopener">
                <WhatsAppIcon />
                واتساب
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
