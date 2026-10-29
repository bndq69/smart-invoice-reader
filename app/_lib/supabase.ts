import "server-only";

// Adds one row through Supabase's REST API with the publishable key, so the
// table's RLS insert-only policy decides what is allowed. Throws on failure.
export async function insertRow(table: string, row: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set");

  const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
}
