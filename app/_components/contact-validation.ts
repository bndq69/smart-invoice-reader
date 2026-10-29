// Shared by the form (instant feedback) and the server action (the real check).
// The phone pattern is the same one the `contact_requests` table enforces.

export const normalizeDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[\s\-()]/g, "");

export const isEgyptianMobile = (phone: string) => /^(\+?20|0)?1[0125]\d{8}$/.test(phone);
