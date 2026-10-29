"use client";

import { useState, useTransition } from "react";
import { updateRequestStatus } from "@/app/_actions/admin";

export type StatusOption = { value: string; label: string };

// Saves the new status as soon as it is chosen, and says whether it worked.
export function StatusSelect({ id, status, options }: { id: number; status: string; options: StatusOption[] }) {
  const [value, setValue] = useState(status);
  const [note, setNote] = useState<"saved" | "failed" | null>(null);
  const [pending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const previous = value;
    const next = e.target.value;
    setValue(next);
    setNote(null);
    startTransition(async () => {
      const { ok } = await updateRequestStatus(id, next);
      if (!ok) setValue(previous);
      setNote(ok ? "saved" : "failed");
    });
  }

  return (
    <span className="status-control">
      <select value={value} onChange={onChange} disabled={pending} aria-label="حالة الطلب" className={`status-select s-${value}`}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className={`status-note ${note ?? ""}`} role="status" aria-live="polite">
        {pending ? "بيتحفظ..." : note === "saved" ? "اتحفظ" : note === "failed" ? "ما اتحفظش" : ""}
      </span>
    </span>
  );
}
