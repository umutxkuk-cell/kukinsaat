import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata = {
  title: "Gizlilik & KVKK",
  description: "Kuk İnşaat gizlilik ve kişisel verilerin korunması politikası.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: false, follow: true },
};

export default function GizlilikPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal variant="left">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-10 bg-accent" /> Yasal
            </p>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4rem)]">Gizlilik & KVKK</h1>
            <div className="mt-8 space-y-6 leading-relaxed text-ink/80">
              <p>
                <strong>{site.legalName}</strong> (Kuk İnşaat) olarak, web sitemiz
                üzerinden ilettiğiniz kişisel verileri 6698 sayılı Kişisel Verilerin
                Korunması Kanunu&apos;na uygun olarak işliyoruz.
              </p>
              <p>
                İletişim formu aracılığıyla gönderilen ad, e-posta, telefon, konu ve
                mesaj bilgileri yalnızca talebinizin değerlendirilmesi ve size dönüş
                yapılması amacıyla kullanılır; üçüncü kişilerle pazarlama amacıyla
                paylaşılmaz.
              </p>
              <p>
                <strong>Çerezler ve analitik:</strong> Web sitemiz, ziyaretçi
                deneyimini iyileştirmek ve anonim ziyaret istatistiklerini (hangi
                sayfaların ziyaret edildiği, ziyaret süresi gibi) ölçmek için Google
                Analytics kullanır. Bu veriler kimliğinizi belirlemek için değil,
                yalnızca sitenin genel kullanımını anlamak amacıyla toplanır.
                Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman
                engelleyebilir veya silebilirsiniz.
              </p>
              <p>
                Verilerinizin silinmesi, düzeltilmesi veya bilgi talepleriniz için
                bize <a className="underline underline-offset-4" href={site.contact.emailHref}>{site.contact.email}</a> adresinden ulaşabilirsiniz.
              </p>
              <p className="text-sm text-muted">{site.contact.address}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}