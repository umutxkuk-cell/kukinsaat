"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Gönderim başarısız.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-bg-2 p-8">
        <p className="font-display text-2xl">Mesajınız alındı.</p>
        <p className="mt-3 text-sm text-muted">
          Mesajınız Kuk İnşaat ekibine ulaştı. En kısa sürede size dönüş yapacağız.
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

      {status === "error" && error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm text-bg transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Mesajı gönder"}
      </button>
    </form>
  );
}