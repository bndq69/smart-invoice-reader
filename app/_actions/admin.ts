"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/app/_lib/admin";
import { statuses } from "@/app/_lib/admin-data";
import { adminRest } from "@/app/_lib/supabase-admin";

// Changes a contact request's status. It checks for the developer itself,
// because a Server Action can be called without going through the page.
export async function updateRequestStatus(id: number, status: string): Promise<{ ok: boolean }> {
  if (!(await isAdmin())) return { ok: false };
  if (!Number.isInteger(id) || !(statuses as readonly string[]).includes(status)) return { ok: false };
  try {
    const res = await adminRest(`contact_requests?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status }),
    });
    const updated: unknown[] = await res.json();
    if (!updated.length) return { ok: false };
  } catch (err) {
    console.error("Admin status update error:", err);
    return { ok: false };
  }
  revalidatePath("/admin");
  return { ok: true };
}
