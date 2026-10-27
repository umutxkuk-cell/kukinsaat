"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Netlify bot tuzağı doluysa (spam) sessizce başarı göster.
    if (String(data.get("bot-field") ?? "")) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload: Record<string, string> = {
      "form-name": "contact",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      // POST, Next.js SSR'ın karşıladığı "/" yerine statik "/__forms.html"
      // dosyasına gönderilir; böylece Netlify'ın form yakalayıcısı devreye girer.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!res.ok) throw new Error("Gönderim başarısız.");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-bg-2 p-8">
        <p className="font-display text-2xl">Mesajınız gönderildi.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Mesajınız Kuk İnşaat ekibine ulaştı. En kısa sürede size dönüş yapacağız.
          Dilerseniz doğrudan{" "}
          <a href={site.contact.emailHref} className="text-ink underline underline-offset-4">
            {site.contact.email}
          </a>{" "}
          adresinden de yazabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-ink underline-offset-4 hover:underline"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
    >
      {/* Netlify için gerekli gizli alanlar */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Boş bırakın: <input name="bot-field" />
        </label>
      </p>

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

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin ya da doğrudan{" "}
          <a href={site.contact.emailHref} className="underline">
            {site.contact.email}
          </a>{" "}
          adresine yazın.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm text-bg transition-colors hover:bg-ink-hover disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Mesajı gönder"}
      </button>

      <p className="text-xs leading-relaxed text-muted">
        Formu göndererek, paylaştığınız bilgilerin talebinizin değerlendirilmesi
        amacıyla işlenmesini kabul etmiş olursunuz. Ayrıntılar için{" "}
        <Link href="/gizlilik" className="underline underline-offset-2 hover:text-ink">
          Gizlilik &amp; KVKK Aydınlatma Metni
        </Link>
        &apos;ni inceleyebilirsiniz.
      </p>
    </form>
  );
}