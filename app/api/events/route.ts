import { after } from "next/server";
import { insertRow } from "@/app/_lib/supabase";

const languages = ["ar", "en"];
const buttons = ["header", "trial", "monthly", "yearly", "contact", "final_cta", "floating"];

// Records a visit or a WhatsApp click in Supabase's `site_events` table
// (ADR 0003). The browser sends it with sendBeacon and never waits for the
// answer, so this always replies 204 straight away and saves afterwards.
// Nothing personal is stored: no cookies, IP or user agent.
export async function POST(request: Request) {
  // Don't count local development or Render's pull-request previews.
  if (process.env.NODE_ENV !== "production" || process.env.IS_PULL_REQUEST === "true") {
    return new Response(null, { status: 204 });
  }

  let event: Record<string, unknown> = {};
  try {
    event = await request.json();
  } catch {}

  const { kind, language, button, referrer } = event;
  const valid =
    typeof language === "string" &&
    languages.includes(language) &&
    (kind === "visit" || (kind === "whatsapp_click" && typeof button === "string" && buttons.includes(button)));

  if (valid) {
    after(async () => {
      try {
        await insertRow("site_events", {
          kind,
          language,
          button: kind === "whatsapp_click" ? button : null,
          referrer_host: kind === "visit" ? referrerHost(referrer, request) : null,
        });
      } catch (err) {
        console.error("Site event error:", err);
      }
    });
  }
  return new Response(null, { status: 204 });
}

// Only the other site's host name, and nothing when the visitor came from this site.
function referrerHost(referrer: unknown, request: Request) {
  if (typeof referrer !== "string" || !referrer) return null;
  try {
    const host = new URL(referrer).hostname;
    return host && host !== new URL(request.url).hostname ? host.slice(0, 255) : null;
  } catch {
    return null;
  }
}
