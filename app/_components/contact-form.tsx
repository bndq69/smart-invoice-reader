"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { submitContactRequest, type ContactState } from "@/app/_actions/contact";
import type { Dictionary, Locale } from "@/app/_dictionaries";
import { isEgyptianMobile, normalizeDigits } from "./contact-validation";

type FormText = Dictionary["contact"]["form"];
type Field = "name" | "phone" | "business_type";

const errorIds: Record<Field, string> = { name: "err-name", phone: "err-phone", business_type: "err-type" };

// The contact form. It checks the required fields here for instant feedback,
// then the server action checks them again and saves the request in Supabase.
export function ContactForm({ locale, text, whatsappUrl }: { locale: Locale; text: FormText; whatsappUrl: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContactRequest.bind(null, locale),
    { status: "idle" },
  );
  const [clientInvalid, setClientInvalid] = useState<Field[]>([]);
  // The server re-checks too; show its verdict when the browser check passed.
  const invalid = clientInvalid.length ? clientInvalid : state.status === "invalid" ? state.fields : [];
  const invalidKey = invalid.join();

  const errorText: Record<Field, string> = { name: text.errName, phone: text.errPhone, business_type: text.errType };

  useEffect(() => {
    if (state.status === "sent") formRef.current?.reset();
  }, [state]);

  useEffect(() => {
    if (invalidKey) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [invalidKey, state]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Submitting by hand keeps what the visitor typed if sending fails;
    // a plain form action would clear the fields every time.
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const bad: Field[] = [];
    if (String(data.get("name") ?? "").trim().length < 2) bad.push("name");
    if (!isEgyptianMobile(normalizeDigits(String(data.get("phone") ?? "").trim()))) bad.push("phone");
    if (!data.get("business_type")) bad.push("business_type");
    setClientInvalid(bad);
    if (bad.length) return;
    startTransition(() => formAction(data));
  }

  const fieldProps = (field: Field) => ({
    "aria-invalid": invalid.includes(field),
    "aria-describedby": errorIds[field],
  });
  const fieldError = (field: Field) => (
    <div className="err" id={errorIds[field]}>
      {invalid.includes(field) ? errorText[field] : ""}
    </div>
  );

  let status: React.ReactNode = null;
  let statusKind = "";
  if (!pending && state.status === "sent") {
    statusKind = "ok";
    status = state.name ? text.sentNamed.replace("{name}", state.name) : text.sent;
  } else if (!pending && state.status === "failed") {
    statusKind = "fail";
    status = (
      <>
        {text.failStart}
        <a href={whatsappUrl} target="_blank" rel="noopener">
          {text.failLink}
        </a>
        {text.failEnd}
      </>
    );
  }

  return (
    <form ref={formRef} className="card form reveal" id="contactForm" noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">
          {text.name} <span className="req">*</span>
        </label>
        <input id="cf-name" name="name" type="text" autoComplete="name" maxLength={100} required {...fieldProps("name")} />
        {fieldError("name")}
      </div>
      <div className="field">
        <label htmlFor="cf-phone">
          {text.phone} <span className="req">*</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder={text.phonePlaceholder}
          maxLength={20}
          required
          {...fieldProps("phone")}
        />
        {fieldError("phone")}
      </div>
      <div className="field">
        <label htmlFor="cf-shop">{text.shop}</label>
        <input id="cf-shop" name="shop_name" type="text" maxLength={120} />
        <div className="err"></div>
      </div>
      <div className="field">
        <label htmlFor="cf-city">{text.city}</label>
        <input id="cf-city" name="city" type="text" maxLength={80} />
        <div className="err"></div>
      </div>
      <div className="field full">
        <label htmlFor="cf-type">
          {text.type} <span className="req">*</span>
        </label>
        <select id="cf-type" name="business_type" required defaultValue="" {...fieldProps("business_type")}>
          <option value="">{text.typePlaceholder}</option>
          <option value="retail">{text.types.retail}</option>
          <option value="wholesale">{text.types.wholesale}</option>
          <option value="distributor">{text.types.distributor}</option>
          <option value="other">{text.types.other}</option>
        </select>
        {fieldError("business_type")}
      </div>
      <div className="field full">
        <label htmlFor="cf-msg">{text.message}</label>
        <textarea id="cf-msg" name="message" maxLength={1000} placeholder={text.messagePlaceholder}></textarea>
        <div className="err"></div>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">{text.honeypot}</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-actions full">
        <button className="btn btn-primary" type="submit" id="cf-submit" disabled={pending}>
          {pending ? text.sending : text.submit}
        </button>
      </div>
      <div className={`form-status full ${statusKind}`} id="cf-status" role="status" aria-live="polite">
        {status}
      </div>
    </form>
  );
}
