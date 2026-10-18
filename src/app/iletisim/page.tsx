import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/brand/Social";
import { site } from "@/data/site";

export const metadata = {
  title: "İletişim",
  description:
    "Kuk İnşaat iletişim bilgileri: Ovacık Mah. Çuhane Cad. No:176 Başiskele, Kocaeli — umut@kukinsaat.com. Projeniz için teklif alın.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <Reveal variant="left">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-10 bg-accent" /> İletişim
            </p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.2rem)]">
              Bize <em className="text-accent">ulaşın.</em>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              Kocaeli ve çevresindeki inşaat, mühendislik ve proje
              ihtiyaçlarınız için aşağıdaki formu doldurabilir veya doğrudan e-posta
              gönderebilirsiniz. En kısa sürede size dönüş yaparız.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal variant="left">
                <div className="border-t-2 border-ink pt-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">Ofis</p>
                  <address className="mt-4 space-y-5 text-base not-italic leading-relaxed">
                    <p className="font-display text-2xl leading-snug">{site.contact.address}</p>
                    <p>
                      <a href={site.contact.phoneHref} className="font-medium underline-offset-4 hover:underline">
                        {site.contact.phone}
                      </a>
                    </p>
                    <p>
                      <a href={site.contact.emailHref} className="font-medium underline-offset-4 hover:underline">
                        {site.contact.email}
                      </a>
                    </p>
                    <p className="text-sm text-muted">{site.contact.hours}</p>
                  </address>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">Sosyal medya</p>
                    <SocialLinks variant="pill" className="mt-4" />
                  </div>
                  <p className="mt-8 text-xs leading-relaxed text-muted">{site.legalName}</p>
                </div>
              </Reveal>

              <Reveal variant="clip" delay={160} className="mt-10">
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-bg-2">
                  <iframe
                    title="Kuk İnşaat konum haritası — Ovacık Mah. Çuhane Cad. No:176 Başiskele, Kocaeli"
                    src={site.contact.mapsEmbed}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
                >
                  Google Maps&apos;te aç / Yol tarifi al →
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal variant="right" delay={100}>
                <div className="bg-white p-6 shadow-[0_20px_50px_rgba(20,20,20,0.07)] md:p-10">
                  <h2 className="font-display text-3xl">Mesaj gönderin</h2>
                  <p className="mt-2 text-sm text-muted">
                    Projenizden kısaca bahsedin; size dönüş yapalım.
                  </p>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}