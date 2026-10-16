import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";

export const metadata = {
  title: "Projelerimiz — Tamamlanan ve Devam Eden İşler",
  description:
    "KUK İnşaat'ın Kocaeli ve çevresinde yürüttüğü inşaat, yapı uygulaması ve mühendislik projeleri. Güncel işlerimiz ve referanslarımız için bizimle iletişime geçin.",
  alternates: { canonical: "/projeler" },
};

export default function ProjelerPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Projelerimiz</p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">
              Her detayında <em className="text-accent">mühendislik</em> olan yapılar.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Tamamladığımız ve sürdürdüğümüz işleri bu bölümde paylaşıyoruz.
              Güncel projeler ve referanslar için bizimle iletişime geçebilirsiniz.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ProjectsBrowser />
        </Container>
      </section>
    </>
  );
}