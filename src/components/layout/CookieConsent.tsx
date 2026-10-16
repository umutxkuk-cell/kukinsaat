"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/data/site";

const STORAGE_KEY = "kuk-cookie-consent"; // "accepted" | "declined"

/**
 * KVKK/GDPR uyumlu çerez onayı.
 * Google Analytics yalnızca ziyaretçi onay verdikten sonra yüklenir.
 * Tercih tarayıcıda saklanır; bir daha sorulmaz (değiştirmek isteyen temizler).
 */
export function CookieConsent() {
  const [decision, setDecision] = useState<"accepted" | "declined" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    // State güncellemelerini effect gövdesinden ayır (cascading render'ı önler).
    const t = window.setTimeout(() => {
      if (stored === "accepted" || stored === "declined") {
        setDecision(stored);
      } else {
        setVisible(true);
      }
    }, 500);
    return () => window.clearTimeout(t);
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage engellenmişse yoksay */
    }
    setDecision(value);
    setVisible(false);
  }

  return (
    <>
      {/* Onay verildiyse Google Analytics'i yükle */}
      {decision === "accepted" && site.gaId ? <GoogleAnalytics gaId={site.gaId} /> : null}

      {visible && decision === null && (
        <div
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4"
          role="dialog"
          aria-live="polite"
          aria-label="Çerez tercihi"
        >
          <div className="container-x">
            <div className="mx-auto flex max-w-4xl flex-col gap-4 border border-line bg-surface/95 p-5 shadow-[0_12px_40px_rgba(18,19,22,0.14)] backdrop-blur md:flex-row md:items-center md:justify-between md:gap-8 md:p-6">
              <p className="text-sm leading-relaxed text-ink/80">
                Bu sitede, ziyaret deneyimini iyileştirmek ve ziyaretçi
                istatistiklerini anlamak için çerezler kullanıyoruz. Ayrıntılar için{" "}
                <Link href="/gizlilik" className="underline underline-offset-2 hover:text-ink">
                  Gizlilik &amp; KVKK
                </Link>{" "}
                sayfamızı inceleyebilirsiniz.
              </p>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => choose("declined")}
                  className="border border-ink/25 px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
                >
                  Reddet
                </button>
                <button
                  type="button"
                  onClick={() => choose("accepted")}
                  className="bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent"
                >
                  Kabul et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}