"use server";

import { headers } from "next/headers";
import { localeSettings, type Locale } from "@/app/_dictionaries";
import { insertRow } from "@/app/_lib/supabase";
import { isEgyptianMobile, normalizeDigits } from "@/app/_components/contact-validation";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; fields: ("name" | "phone" | "business_type")[] }
  | { status: "sent"; name: string }
  | { status: "failed" };

const businessTypes = ["retail", "wholesale", "distributor", "other"];

const text = (form: FormData, key: string, max: number) => {
  const value = String(form.get(key) ?? "").trim();
  return value ? value.slice(0, max) : null;
};

// Saves a contact request in Supabase's `contact_requests` table. The insert
// goes through the publishable key, so the table's RLS policy still applies.
export async function submitContactRequest(locale: Locale, _prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden field, people don't. Pretend it worked.
  if (form.get("website")) return { status: "sent", name: "" };

  const name = text(form, "name", 100) ?? "";
  const phone = normalizeDigits(String(form.get("phone") ?? "").trim());
  const businessType = String(form.get("business_type") ?? "");

  const invalid: ("name" | "phone" | "business_type")[] = [];
  if (name.length < 2) invalid.push("name");
  if (!isEgyptianMobile(phone)) invalid.push("phone");
  if (!businessTypes.includes(businessType)) invalid.push("business_type");
  if (invalid.length) return { status: "invalid", fields: invalid };

  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const sourcePage = host ? `${proto}://${host}${localeSettings[locale].home}` : null;

  try {
    await insertRow("contact_requests", {
      name,
      phone,
      shop_name: text(form, "shop_name", 120),
      city: text(form, "city", 80),
      business_type: businessType,
      message: text(form, "message", 1000),
      source_page: sourcePage?.slice(0, 300) ?? null,
      language: locale,
      site: "new",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return { status: "failed" };
  }
  return { status: "sent", name };
}
