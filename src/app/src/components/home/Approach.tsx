import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

const values = [
  { n: "01", t: "Teknik yeterlilik", d: "Kararları statik hesap, detay çözümü ve saha tecrübesine dayandırırız." },
  { n: "02", t: "Uygulama kalitesi", d: "Malzeme ve işçiliği, proje başında belirlenen standartlara göre denetleriz." },
  { n: "03", t: "Açık iletişim", d: "İş sahibini süreç, bütçe ve ilerleme konusunda düzenli olarak bilgilendiririz." },
];

export function Approach() {
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <Container>
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — text + values */}
          <div className="flex flex-col lg:col-span-6">
            <Reveal variant="left">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                <span className="h-px w-10 bg-accent" /> Hakkımızda
              </p>
              <h2 className="mt-6 text-[clamp(2.2rem,4.5vw,3.6rem)]">
                İnşaata mühendislik <em className="text-accent">gözüyle</em> bakıyoruz.
              </h2>
            </Reveal>
            <Reveal variant="left" delay={140}>
              <p className="mt-7 text-lg leading-relaxed text-ink/80">
                KUK İnşaat; mühendislik disiplini, kalite anlayışı ve güvenilirlik
                ilkeleriyle inşaat sektöründe değer üretmeyi hedefler.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                Teknik uzmanlığı, çağdaş tasarım yaklaşımını ve sürdürülebilirliği bir
                araya getirerek her projede nitelikli ve kalıcı çözümler geliştirmeyi
                amaçlar.
              </p>
              <p className="mt-6 font-display text-2xl text-ink">
                KUK İnşaat — <span className="italic text-accent">Kaliteyle Kurulur.</span>
              </p>
              <Link href="/kurumsal" className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
                Firmamızı tanıyın
                <span className="flex h-10 w-10 items-center justify-center border border-ink transition-all group-hover:bg-ink group-hover:text-white">→</span>
              </Link>
            </Reveal>

            <div className="mt-12">
              {values.map((v, i) => (
                <Reveal key={v.n} variant="up" delay={i * 120}>
                  <div className="group flex gap-5 border-t border-line py-5 transition-colors last:border-b hover:bg-bg-2/60">
                    <span className="font-display text-2xl text-accent">{v.n}</span>
                    <div>
                      <h3 className="font-sans text-base font-semibold tracking-normal">{v.t}</h3>
                      <p className="mt-1 text-sm text-muted">{v.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — filled image composition (no empty gap) */}
          <div className="lg:col-span-6">
            <div className="grid h-full grid-cols-2 grid-rows-[auto_auto] gap-4">
              {/* tall primary image spanning both rows */}
              <Reveal variant="clip" className="col-span-1 row-span-2">
                <div className="relative h-full min-h-[320px] overflow-hidden">
                  <Parallax speed={0.08} className="h-full">
                    <Image
                      src="https://images.pexels.com/photos/9683985/pexels-photo-9683985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900"
                      alt="Beton ve cam detaylı modern yapı cephesi"
                      fill
                      sizes="(max-width:1024px) 50vw, 28vw"
                      className="img-duotone object-cover"
                    />
                  </Parallax>
                  <span className="pointer-events-none absolute left-4 top-4 vertical-text text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/85">
                    Kaliteyle Kurulur
                  </span>
                </div>
              </Reveal>

              {/* top-right landscape image */}
              <Reveal variant="right" delay={140} className="col-span-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/36676879/pexels-photo-36676879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                    alt="Gün batımında havuzlu çağdaş villa"
                    fill
                    sizes="(max-width:1024px) 50vw, 28vw"
                    className="img-zoom img-duotone object-cover"
                  />
                </div>
              </Reveal>

              {/* bottom-right dark stat card */}
              <Reveal variant="scale" delay={240} className="col-span-1">
                <div className="flex h-full flex-col justify-between bg-ink p-6 text-white md:p-7">
                  <span className="font-display text-5xl leading-none text-accent-soft">05</span>
                  <div>
                    <p className="mt-6 font-display text-xl leading-tight">Hizmet alanında uçtan uca çözüm</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/50">
                      Fikirden teslime
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}