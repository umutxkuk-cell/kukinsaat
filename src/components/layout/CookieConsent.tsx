"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/data/site";

const STORAGE_KEY = "kuk-cookie-consent"; // "accepted" | "declined"

type Gtag = (...args: unknown[]) => void;

function updateConsent(granted: boolean) {
  const w = window as typeof window & { gtag?: Gtag; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
}

/**
 * KVKK/GDPR uyumlu çerez onayı — Google Consent Mode ile.
 *
 * Google Analytics etiketi her zaman yüklenir (Google'ın "etiket algılandı"
 * doğrulaması için gerekli). Ancak analitik verisi YALNIZCA ziyaretçi onay
 * verdiğinde toplanır: onaya kadar `analytics_storage` 'denied' durumundadır
 * (varsayılan layout'ta tanımlı). "Kabul et" denince 'granted' olur.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const t = window.setTimeout(() => {
      if (stored !== "accepted" && stored !== "declined") {
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
    updateConsent(value === "accepted");
    setVisible(false);
  }

  return (
    <>
      {/* GA etiketi her zaman yüklenir; veri toplama Consent Mode ile yönetilir. */}
      {site.gaId ? <GoogleAnalytics gaId={site.gaId} /> : null}

      {visible && (
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