import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { LineReveal } from "@/components/ui/LineReveal";
import { Counter } from "@/components/ui/Counter";
import { LogoDraw } from "@/components/brand/LogoDraw";
import { ValueIcon, type ValueIconKey } from "@/components/kurumsal/ValueIcon";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata = {
  title: "Kurumsal",
  description:
    "KUK İnşaat (KUK Proje Mühendislik İnşaat Tic. Ltd. Şti.) — Başiskele, Kocaeli merkezli inşaat ve mühendislik firmasının yaklaşımı, değerleri ve kalite anlayışı.",
};

const values: { icon: ValueIconKey; t: string; d: string }[] = [
  { icon: "precision", t: "Teknik Yeterlilik", d: "Kararlarımızı statik hesap, yürürlükteki yönetmelikler ve saha tecrübesine dayandırırız." },
  { icon: "quality", t: "Kalite Anlayışı", d: "Malzemeyi ve işçiliği, proje başında belirlenen standartlara göre denetleriz." },
  { icon: "communication", t: "Açık İletişim", d: "Süre, bütçe ve ilerleme konusunda iş sahibini düzenli olarak bilgilendiririz." },
  { icon: "responsibility", t: "Güvenilirlik", d: "Teslim ettiğimiz işin ardında durur, verdiğimiz sözü tutarız." },
  { icon: "sustainability", t: "Sürdürülebilirlik", d: "Yapıları uzun ömür, verimlilik ve çevresel duyarlılık gözeterek ele alırız." },
  { icon: "vision", t: "Çağdaş Tasarım", d: "Mühendislik disiplinini çağdaş bir tasarım anlayışıyla bir araya getiririz." },
];

export default function KurumsalPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="dot-grid pointer-events-none absolute inset-0 text-ink/[0.05]" aria-hidden="true" />
        <Container className="relative">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal variant="left">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  <span className="h-px w-10 bg-accent" /> Kurumsal
                </p>
              </Reveal>
              <LineReveal
                as="h1"
                className="mt-6 max-w-3xl text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.02]"
                lines={["İnşaata mühendislik", "gözüyle bakan bir firma."]}
              />
              <Reveal variant="up" delay={220}>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-muted">
                  KUK İnşaat — Kaliteyle Kurulur
                </p>
              </Reveal>
            </div>
            <Reveal variant="scale" delay={200} className="lg:col-span-4">
              <div className="float-slow md:ml-auto md:w-fit">
                <LogoDraw className="h-44 w-auto text-ink" />
              </div>
            </Reveal>
          </div>

          {/* factual stat strip */}
          <Reveal variant="up" delay={120}>
            <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {[
                { v: <Counter to={5} />, l: "Hizmet alanı" },
                { v: "Kocaeli", l: "Başiskele merkez" },
                { v: "Tek Elden", l: "Proje yönetimi" },
                { v: "Uçtan Uca", l: "Fikirden teslime" },
              ].map((s, i) => (
                <div key={i} className="bg-bg p-6 md:p-8">
                  <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-ink">{s.v}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Hakkımızda ---------- */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* LEFT — single robust editorial image with built-in caption */}
            <div className="lg:col-span-5">
              <Reveal variant="clip">
                <figure className="group relative aspect-[4/5] overflow-hidden bg-bg-2">
                  <Image
                    src="https://images.pexels.com/photos/9683985/pexels-photo-9683985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1500&w=1200"
                    alt="Beton ve cam detaylı modern yapı cephesi"
                    fill
                    sizes="(max-width:1024px) 100vw, 42vw"
                    className="img-zoom object-cover"
                  />
                  {/* top label */}
                  <figcaption className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/90">
                    <span className="h-px w-6 bg-white/70" /> KUK İnşaat
                  </figcaption>
                  {/* bottom gradient + slogan */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-24">
                    <p className="font-display text-3xl italic leading-none text-white">Kaliteyle</p>
                    <p className="font-display text-3xl italic leading-none text-accent-soft">Kurulur.</p>
                  </div>
                  {/* thin inner frame accent */}
                  <span className="pointer-events-none absolute inset-3 border border-white/15" aria-hidden="true" />
                </figure>
              </Reveal>
            </div>

            {/* RIGHT — text */}
            <div className="lg:col-span-7">
              <Reveal variant="right">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  <span className="h-px w-10 bg-accent" /> Hakkımızda
                </p>
                <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-tight">
                  Değer üreten, kalıcı çözümler geliştiren bir yapı firması.
                </h2>
              </Reveal>
              <Reveal variant="right" delay={120}>
                <p className="mt-7 text-lg leading-relaxed text-ink/80">
                  KUK İnşaat; mühendislik disiplini, kalite anlayışı ve güvenilirlik
                  ilkeleriyle inşaat sektöründe değer üretmeyi hedefler.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Teknik uzmanlığı, çağdaş tasarım yaklaşımını ve sürdürülebilirliği bir
                  araya getirerek her projede nitelikli ve kalıcı çözümler geliştirmeyi
                  amaçlar.
                </p>
              </Reveal>

              <Reveal variant="up" delay={220}>
                <dl className="mt-10 grid grid-cols-2 gap-px bg-line text-sm">
                  <div className="bg-bg p-5">
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted">Merkez</dt>
                    <dd className="mt-2 font-medium">Başiskele, Kocaeli</dd>
                  </div>
                  <div className="bg-bg p-5">
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted">Faaliyet</dt>
                    <dd className="mt-2 font-medium">İnşaat · Proje · Mühendislik</dd>
                  </div>
                  <div className="bg-bg p-5">
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted">E-posta</dt>
                    <dd className="mt-2 font-medium break-all">{site.contact.email}</dd>
                  </div>
                  <div className="bg-bg p-5">
                    <dt className="text-xs uppercase tracking-[0.18em] text-muted">Sosyal</dt>
                    <dd className="mt-2 font-medium">Instagram · LinkedIn — @kukinsaat</dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-muted">{site.legalName}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Değerlerimiz (dark, icon cards) ---------- */}
      <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <p
          className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[12rem] leading-none text-white/[0.04] md:text-[18rem]"
          aria-hidden="true"
        >
          KUK
        </p>
        <Container className="relative">
          <div className="max-w-2xl">
            <Reveal variant="left">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
                <span className="h-px w-10 bg-accent-soft" /> Değerlerimiz
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 text-[clamp(2rem,4vw,3.4rem)] leading-tight text-white"
              lines={["Her işte gözettiğimiz", "altı temel ilke."]}
            />
          </div>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} variant="up" delay={i * 80}>
                <div className="group relative h-full overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.05] md:p-10">
                  <span className="absolute right-6 top-6 font-display text-2xl text-white/15 transition-colors group-hover:text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex text-accent-soft transition-transform duration-500 group-hover:-translate-y-1">
                    <ValueIcon name={v.icon} className="h-10 w-10" />
                  </span>
                  <span className="line-grow mt-6 block h-px w-full bg-accent-soft/50" />
                  <h3 className="mt-6 font-display text-2xl">{v.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Kalite Anlayışımız ---------- */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="left" className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Parallax speed={0.07} className="h-full">
                  <Image
                    src="https://images.pexels.com/photos/8961298/pexels-photo-8961298.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1250"
                    alt="Yapı planı üzerinde teknik değerlendirme"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="img-duotone object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal variant="right">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  <span className="h-px w-10 bg-accent" /> Kalite Anlayışımız
                </p>
                <h2 className="mt-6 text-[clamp(1.9rem,3.5vw,3.1rem)] leading-tight">
                  Kalite, detaylara gösterilen özenle başlar.
                </h2>
                <p className="mt-6 leading-relaxed text-ink/80">
                  Malzeme seçiminden işçiliğe, imalat aşamalarından teslim öncesi son
                  kontrole kadar her adımı belirli ölçütlere göre denetliyoruz. Aldığımız
                  kararları ve yaptığımız kontrolleri kayıt altına alıyor, böylece işin
                  her aşamasını geriye dönük olarak takip edebiliyoruz.
                </p>
                <Link
                  href="/iletisim"
                  className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]"
                >
                  Bizimle çalışın
                  <span className="flex h-10 w-10 items-center justify-center border border-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Hizmet köprüsü ---------- */}
      <section className="pb-24">
        <Container>
          <Reveal variant="scale">
            <div className="relative overflow-hidden border border-line">
              <div className="dot-grid pointer-events-none absolute inset-0 text-ink/[0.05]" aria-hidden="true" />
              <div className="relative grid gap-8 p-8 md:grid-cols-12 md:items-center md:p-14">
                <div className="md:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Hizmetlerimiz</p>
                  <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
                    İnşaattan mühendisliğe, beş alanda hizmet veriyoruz.
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/hizmetler/${s.slug}`}
                        className="border border-ink/15 px-4 py-2 text-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5 md:text-right">
                  <Link
                    href="/hizmetler"
                    className="btn-sheen group inline-flex items-center gap-3 bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent"
                  >
                    Tüm hizmetler
                    <span className="nudge-x">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}