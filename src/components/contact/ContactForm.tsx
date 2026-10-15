"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "ready";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const mailSubject = subject
      ? `İletişim Formu — ${subject}`
      : `İletişim Formu — ${name}`;

    const body = [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      subject ? `Konu: ${subject}` : null,
      "",
      "Mesaj:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const mailto = `${site.contact.emailHref}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(body)}`;

    // Kullanıcının varsayılan e-posta uygulamasını, bilgiler dolu olarak açar.
    window.location.href = mailto;
    setStatus("ready");
  }

  if (status === "ready") {
    return (
      <div className="border border-line bg-bg-2 p-8">
        <p className="font-display text-2xl">E-posta uygulamanız açıldı.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Mesajınız hazır olarak e-posta uygulamanıza aktarıldı. Göndermek için
          yalnızca &quot;Gönder&quot;e basmanız yeterli. E-posta uygulaması açılmadıysa
          doğrudan{" "}
          <a href={site.contact.emailHref} className="text-ink underline underline-offset-4">
            {site.contact.email}
          </a>{" "}
          adresine yazabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-ink underline-offset-4 hover:underline"
        >
          Formu tekrar doldur
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Ad Soyad</span>
          <input
            name="name"
            required
            minLength={2}
            className="mt-2 w-full border border-line bg-bg px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">E-posta</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full border border-line bg-bg px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Telefon (isteğe bağlı)</span>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full border border-line bg-bg px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Konu (isteğe bağlı)</span>
          <input
            name="subject"
            className="mt-2 w-full border border-line bg-bg px-4 py-3 text-sm focus:border-ink focus:outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Mesaj</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          className="mt-2 w-full border border-line bg-bg px-4 py-3 text-sm focus:border-ink focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm text-bg transition-colors hover:bg-accent"
      >
        Mesajı gönder
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Gönder&apos;e bastığınızda mesajınız, bilgileriniz dolu olarak e-posta
        uygulamanızda açılır ve doğrudan {site.contact.email} adresine iletilir.
      </p>
    </form>
  );
}