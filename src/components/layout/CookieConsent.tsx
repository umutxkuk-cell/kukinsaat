import { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/next-shim";
import { site } from "@/data/site";

const STORAGE_KEY = "kuk-cookie-consent"; // "accepted" | "declined"
export const COOKIE_PREF_EVENT = "kuk:cookie-preferences";

type Gtag = (...args: any[]) => void;
type GoogleWindow = typeof window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  __kukGaLoaded?: boolean;
};

const deniedConsent = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
} as const;

const grantedConsent = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  security_storage: "granted",
} as const;

/** Basic Consent Mode: the Google tag is not loaded until explicit opt-in. */
function loadGoogleAnalytics() {
  const w = window as GoogleWindow;
  if (w.__kukGaLoaded && typeof w.gtag === "function") return;

  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    w.dataLayer?.push(arguments);
  };

  // Queue the denied default first, then the explicit grant, before the tag loads.
  w.gtag("consent", "default", deniedConsent);
  w.gtag("consent", "update", grantedConsent);
  w.gtag("js", new Date());
  w.gtag("config", site.gaId, {
    anonymize_ip: true,
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.id = "kuk-ga4-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
  document.head.appendChild(script);
  w.__kukGaLoaded = true;
}

function sendPageView() {
  const w = window as GoogleWindow;
  if (typeof w.gtag !== "function") return;
  w.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    send_to: site.gaId,
  });
}

function updateConsent(granted: boolean) {
  const w = window as GoogleWindow;
  if (granted) {
    loadGoogleAnalytics();
  } else if (typeof w.gtag === "function") {
    w.gtag("consent", "update", deniedConsent);
  }
}

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Google Analytics Basic Consent Mode: opt-in gelmeden gtag.js yüklenmez. */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const choice = useRef<string | null>(null);

  useEffect(() => {
    const stored = readStored();
    choice.current = stored;
    if (stored === "accepted") {
      updateConsent(true);
      sendPageView();
    }

    const t = window.setTimeout(() => {
      if (stored !== "accepted" && stored !== "declined") setVisible(true);
    }, 600);

    const reopen = () => setVisible(true);
    const onRouteChange = () => {
      if (choice.current === "accepted") window.setTimeout(sendPageView, 0);
    };
    window.addEventListener(COOKIE_PREF_EVENT, reopen);
    window.addEventListener("popstate", onRouteChange);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener(COOKIE_PREF_EVENT, reopen);
      window.removeEventListener("popstate", onRouteChange);
    };
  }, []);

  function choose(value: "accepted" | "declined") {
    const previous = choice.current;
    choice.current = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage engellenmişse yoksay */
    }
    updateConsent(value === "accepted");
    if (value === "accepted" && previous !== "accepted") sendPageView();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4"
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihi"
    >
      {/* Mobilde kompakt: ekranın en fazla ~1/3'ünü kaplar, altındaki CTA ve
          iletişim bilgileri görünür kalır (WCAG 2.4.11). Masaüstünde mevcut
          yatay düzen aynen korunur. */}
      <div className="container-x">
        <div className="mx-auto flex max-w-4xl flex-col gap-2.5 border border-line bg-surface/95 p-2 shadow-[0_12px_40px_rgba(18,19,22,0.14)] backdrop-blur sm:p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6">
          <p className="text-[0.74rem] leading-tight text-ink/80 md:text-sm md:leading-relaxed">
            Analitik çerezler yalnızca onayınızla etkinleşir.{" "}
            <Link href="/gizlilik" className="underline underline-offset-2 hover:text-ink">
              Gizlilik &amp; KVKK
            </Link>
          </p>
          <div className="flex shrink-0 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="flex-1 whitespace-nowrap border border-ink/25 px-3 py-1 text-[0.74rem] font-medium transition-colors hover:border-ink sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Yalnızca zorunlu çerezler
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="flex-1 whitespace-nowrap bg-ink px-3 py-1 text-[0.74rem] font-semibold text-bg transition-colors hover:bg-accent sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Tümünü kabul et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
