import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LineReveal } from "@/components/ui/LineReveal";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  const featured = projects.slice(0, 3);
  const hasProjects = featured.length > 0;

  return (
    <section className="overflow-hidden py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal variant="left">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                <span className="h-px w-10 bg-accent" /> Projelerimiz
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              className="mt-6 max-w-2xl text-[clamp(2.2rem,4.5vw,3.6rem)]"
              lines={["Her detayında mühendislik", "olan yapılar."]}
            />
          </div>
          <Reveal variant="right" delay={120}>
            <Link href="/projeler" className="link-sweep text-sm font-semibold uppercase tracking-[0.14em]">
              Portföy →
            </Link>
          </Reveal>
        </div>

        {hasProjects ? (
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            {featured.map((p, i) => (
              <Reveal
                key={p.slug}
                variant={i === 0 ? "clip" : i === 1 ? "scale" : "right"}
                delay={i * 130}
                className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-20"}
              >
                <Link href={`/projeler/${p.slug}`} className="group block">
                  <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <Image
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      fill
                      sizes={i === 0 ? "60vw" : "40vw"}
                      className="img-zoom img-duotone object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/70">{p.type} — {p.year}</p>
                        <h3 className="mt-2 font-display text-3xl">{p.name}</h3>
                      </div>
                      <span className="arrow-slide flex h-12 w-12 shrink-0 items-center justify-center border border-white/40 bg-black/20 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-ink">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal variant="clip" className="mt-14">
            <div className="relative overflow-hidden border border-ink/15 bg-ink text-white">
              <div className="grid gap-10 p-8 md:grid-cols-12 md:items-center md:p-14">
                <div className="md:col-span-8">
                  <p className="font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-tight">
                    Projelerimiz yakında burada.
                  </p>
                  <p className="mt-5 max-w-xl leading-relaxed text-white/65">
                    Tamamladığımız ve devam eden işlerimizi kısa süre içinde bu
                    bölümde paylaşacağız. Güncel projelerimiz hakkında bilgi almak
                    için bizimle iletişime geçebilirsiniz.
                  </p>
                  <Link
                    href="/iletisim"
                    className="group mt-9 inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-ink"
                  >
                    Bilgi alın
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <div className="md:col-span-4">
                  <p className="font-display text-[7rem] leading-none text-white/[0.08] select-none md:text-[9rem]" aria-hidden="true">
                    KUK
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}