import "server-only";

// Reads and updates Supabase with the SECRET key, which skips RLS. It runs only
// on the server and only after the caller has checked `isAdmin()`. The key has
// no NEXT_PUBLIC_ prefix and never reaches the browser.
export async function adminRest(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL or SUPABASE_SECRET_KEY is not set");

  const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Supabase HTTP ${res.status}: ${await res.text()}`);
  return res;
}
