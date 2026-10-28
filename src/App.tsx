import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Intro } from "@/components/layout/Intro";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getService } from "@/data/services";
import { getProject, projects } from "@/data/projects";
import { getCurrentPath, NotFoundError, setPathname } from "@/lib/next-shim";
import Gizlilik from "@/pages/Gizlilik";
import HizmetDetay from "@/pages/HizmetDetay";
import Hizmetler from "@/pages/Hizmetler";
import Home from "@/pages/Home";
import Iletisim from "@/pages/Iletisim";
import Kurumsal from "@/pages/Kurumsal";
import ProjeDetay from "@/pages/ProjeDetay";
import Projeler from "@/pages/Projeler";

/* ---- sayfa başlıkları (orijinal metadata karşılıkları) ---- */
const titles: Record<string, string> = {
  "/": "Kuk İnşaat | Kocaeli İnşaat ve Mühendislik Firması",
  "/kurumsal": "Kuk İnşaat Hakkında | Kocaeli",
  "/hizmetler": "İnşaat, Mühendislik ve Proje Hizmetleri | Kuk İnşaat",
  "/projeler": "Proje Portföyü | Kuk İnşaat",
  "/iletisim": "İletişim | Kuk İnşaat, Başiskele",
  "/gizlilik": "Gizlilik Politikası & KVKK Aydınlatma Metni | Kuk İnşaat",
};

const SITE_URL = "https://kukinsaat.com";

const NOT_FOUND_TITLE = "Sayfa Bulunamadı | Kuk İnşaat";

/** Rota başına benzersiz meta açıklaması (SERP'te tam görünür aralıkta tutulur). */
const descriptions: Record<string, string> = {
  "/":
    "Kocaeli inşaat ve mühendislik firması Kuk İnşaat: konut, ticari ve karma yapıların projelendirme, mühendislik ve inşaat süreçlerini tek elden yürütür.",
  "/kurumsal":
    "Kuk İnşaat'ın mühendislik yaklaşımı, değerleri ve kalite anlayışı. Kocaeli merkezli inşaat ve mühendislik firması — Kaliteyle Kurulur.",
  "/hizmetler":
    "İnşaat ve yapı uygulamaları, mühendislik, proje geliştirme, süreç yönetimi ve teknik danışmanlık hizmetlerimiz.",
  "/projeler":
    "Kuk İnşaat'ın çalışma alanları ve proje portföyü. Şu anda yayımlanmış proje kaydı bulunmuyor; gerçek kayıtlar hazır olduğunda bu sayfa güncellenecektir.",
  "/iletisim":
    "Ovacık Mah. Çuhane Cad. No:176 Başiskele, Kocaeli. Projeniz için teklif alın: umut@kukinsaat.com",
  "/gizlilik":
    "Kuk İnşaat'ın kişisel verilerin işlenmesi, korunması, saklama süreleri ve KVKK kapsamındaki başvuru haklarına ilişkin aydınlatma metni.",
};

const serviceSeo: Record<string, { title: string; description: string }> = {
  "insaat-ve-yapi-uygulamalari": {
    title: "İnşaat ve Yapı Uygulamaları | Kuk İnşaat",
    description:
      "Kocaeli'de konut, ticari ve karma yapılar için saha organizasyonu, imalat koordinasyonu, malzeme kontrolü ve yapı uygulama hizmetleri.",
  },
  "muhendislik-hizmetleri": {
    title: "Mühendislik Hizmetleri | Kuk İnşaat, Kocaeli",
    description:
      "Taşıyıcı sistem, yapı performansı ve uygulama detaylarına yönelik mühendislik değerlendirmesi. Kocaeli ve çevresinde proje görüşmesi için ulaşın.",
  },
  "proje-gelistirme-ve-teknik-koordinasyon": {
    title: "Proje Geliştirme ve Teknik Koordinasyon | Kuk İnşaat",
    description:
      "Mimari, statik, elektrik ve mekanik projelerin uygulama öncesi koordinasyonu, teknik gözden geçirme ve detay çözümü.",
  },
  "proje-ve-uygulama-sureclerinin-yonetimi": {
    title: "İnşaat Proje ve Uygulama Yönetimi | Kuk İnşaat",
    description:
      "İnşaat projelerinde iş programı, bütçe, risk ve kalite kontrol adımlarının planlanması, takibi ve raporlanması.",
  },
  "teknik-danismanlik": {
    title: "İnşaat Teknik Danışmanlık | Kuk İnşaat",
    description:
      "Mevcut yapı projeleri ve uygulama kararları için teknik inceleme, risk değerlendirmesi ve alternatif çözüm danışmanlığı.",
  },
};

function descriptionFor(path: string) {
  if (descriptions[path]) return descriptions[path];
  const hs = path.match(/^\/hizmetler\/([^/]+)$/);
  if (hs) {
    const slug = decodeURIComponent(hs[1]);
    const seo = serviceSeo[slug];
    const service = getService(slug);
    if (seo) return seo.description;
    if (service) return service.summary;
  }
  const ps = path.match(/^\/projeler\/([^/]+)$/);
  if (ps) {
    const project = getProject(decodeURIComponent(ps[1]));
    if (project) return project.description;
  }
  return descriptions["/"];
}

function titleFor(path: string): string | undefined {
  if (titles[path]) return titles[path];
  const hs = path.match(/^\/hizmetler\/([^/]+)$/);
  if (hs) {
    const slug = decodeURIComponent(hs[1]);
    const service = getService(slug);
    if (service) return serviceSeo[slug]?.title ?? `${service.title} | Kuk İnşaat`;
  }
  const ps = path.match(/^\/projeler\/([^/]+)$/);
  if (ps) {
    const p = getProject(decodeURIComponent(ps[1]));
    if (p) return `${p.name} | Kuk İnşaat`;
  }
  return undefined;
}

function renderRoute(path: string) {
  switch (path) {
    case "/":
      return <Home />;
    case "/kurumsal":
      return <Kurumsal />;
    case "/hizmetler":
      return <Hizmetler />;
    case "/projeler":
      return <Projeler />;
    case "/iletisim":
      return <Iletisim />;
    case "/gizlilik":
      return <Gizlilik />;
    default: {
      const hs = path.match(/^\/hizmetler\/([^/]+)$/);
      if (hs) {
        const slug = decodeURIComponent(hs[1]);
        return getService(slug) ? <HizmetDetay params={{ slug }} /> : <NotFound />;
      }
      const ps = path.match(/^\/projeler\/([^/]+)$/);
      if (ps) {
        const slug = decodeURIComponent(ps[1]);
        return getProject(slug) ? <ProjeDetay params={{ slug }} /> : <NotFound />;
      }
      return <NotFound />;
    }
  }
}

function NotFound() {
  return (
    <Container className="py-32 md:py-44">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-10 bg-accent" /> 404
      </p>
      <h1 className="mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[1.03]">
        Aradığınız sayfa bulunamadı.
      </h1>
      <p className="mt-5 max-w-lg leading-relaxed text-muted">
        Bağlantı değişmiş ya da içerik taşınmış olabilir. Ana sayfadan devam edebilir veya
        hizmetlerimize göz atabilirsiniz.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <Button href="/">Ana Sayfa</Button>
        <Button href="/hizmetler" variant="secondary">
          Hizmetlerimiz
        </Button>
      </div>
    </Container>
  );
}

function Routes() {
  const [path, setPath] = useState(() => getCurrentPath());

  useEffect(() => {
    const apply = (initial: boolean) => {
      const next = getCurrentPath();
      const resolvedTitle = titleFor(next);
      const known = Boolean(resolvedTitle);
      // Do not send an empty portfolio page to search until real project
      // records make it substantively useful; it remains available to visitors.
      const indexable = known && next !== "/gizlilik" && !(next === "/projeler" && projects.length === 0);
      setPath(next);
      setPathname(next);
      const pageTitle = resolvedTitle ?? NOT_FOUND_TITLE;
      const description = known
        ? descriptionFor(next)
        : "Aradığınız sayfa bulunamadı.";
      document.title = pageTitle;

      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute(
          "content",
          !indexable
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        );
      }

      const setMeta = (selector: string, value: string) => {
        const element = document.querySelector(selector);
        if (element) element.setAttribute("content", value);
      };

      const url = `${SITE_URL}${next === "/" ? "/" : next}`;
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:title"]', pageTitle);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[property="og:url"]', url);
      setMeta('meta[name="twitter:title"]', pageTitle);
      setMeta('meta[name="twitter:description"]', description);

      // This client-rendered preview has no per-route server metadata. Keep the
      // canonical out of the source HTML, then inject the resolved path here.
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (known) {
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.rel = "canonical";
          document.head.appendChild(canonical);
        }
        canonical.href = url;
      } else {
        canonical?.remove();
      }

      if (!initial) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }
    };
    const onPopState = () => apply(true);
    apply(true);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  try {
    return <>{renderRoute(path)}</>;
  } catch (err) {
    if (err instanceof NotFoundError) return <NotFound />;
    throw err;
  }
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        İçeriğe atla
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <Intro />
      <Header />
      <main id="main" className="pt-20">
        <Routes />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
