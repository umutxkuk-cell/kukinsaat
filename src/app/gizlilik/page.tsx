import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata = {
  title: "Gizlilik Politikası & KVKK Aydınlatma Metni",
  description:
    "Kuk İnşaat (KUK Proje Mühendislik İnşaat Tic. Ltd. Şti.) kişisel verilerin korunması, gizlilik ve çerez politikası ile KVKK aydınlatma metni.",
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
            <h1 className="mt-6 text-[clamp(2.2rem,4.5vw,3.4rem)] leading-tight">
              Gizlilik Politikası &amp; KVKK Aydınlatma Metni
            </h1>
            <p className="mt-6 text-sm text-muted">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120}>
          <div className="mt-12 max-w-3xl space-y-10 leading-relaxed text-ink/80">
            {/* Giriş */}
            <p>
              <strong className="text-ink">{site.legalName}</strong> (&quot;Kuk İnşaat&quot;,
              &quot;Şirket&quot; veya &quot;veri sorumlusu&quot;) olarak; 6698 sayılı
              Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, web
              sitemizi ({site.contact.email ? "kukinsaat.com" : "web sitemiz"})
              ziyaret eden ve bizimle iletişime geçen kişilerin kişisel verilerinin
              işlenmesine ilişkin aşağıdaki hususlarda sizi bilgilendiririz. Bu metin,
              KVKK&apos;nın 10. maddesi kapsamındaki aydınlatma yükümlülüğünü yerine
              getirmek amacıyla hazırlanmıştır.
            </p>

            {/* 1. Veri sorumlusu */}
            <div>
              <h2 className="font-display text-2xl text-ink">1. Veri Sorumlusunun Kimliği</h2>
              <p className="mt-4">
                Kişisel verileriniz, veri sorumlusu sıfatıyla aşağıdaki firma
                tarafından işlenmektedir:
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                <li><strong className="text-ink">Unvan:</strong> {site.legalName}</li>
                <li><strong className="text-ink">Adres:</strong> {site.contact.address}</li>
                {site.contact.phone ? (
                  <li><strong className="text-ink">Telefon:</strong> {site.contact.phone}</li>
                ) : null}
                <li><strong className="text-ink">E-posta:</strong> {site.contact.email}</li>
              </ul>
            </div>

            {/* 2. İşlenen veriler */}
            <div>
              <h2 className="font-display text-2xl text-ink">2. İşlenen Kişisel Veri Kategorileri</h2>
              <p className="mt-4">
                Web sitemiz aracılığıyla yalnızca aşağıdaki kişisel veriler işlenir:
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Kimlik ve iletişim bilgileri:</strong> İletişim formu aracılığıyla ilettiğiniz ad-soyad, e-posta adresi, telefon numarası ve varsa konu/mesaj içeriğinde paylaştığınız bilgiler.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">İşlem güvenliği ve kullanım verileri:</strong> Siteyi analiz araçlarıyla ziyaret etmeniz hâlinde çerezler yoluyla toplanan IP adresi, tarayıcı/cihaz bilgisi, ziyaret edilen sayfalar ve ziyaret süresi gibi anonim/istatistiksel veriler.</span></li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                Şirketimiz, web sitesi üzerinden özel nitelikli kişisel veri (sağlık,
                din, ırk vb.) toplamayı amaçlamaz. Lütfen iletişim formu üzerinden bu
                tür verileri paylaşmayınız.
              </p>
            </div>

            {/* 3. Amaçlar */}
            <div>
              <h2 className="font-display text-2xl text-ink">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> İletişim formu veya e-posta yoluyla ilettiğiniz talep, soru ve başvuruların değerlendirilmesi ve yanıtlanması,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Teklif ve bilgi taleplerinin karşılanması, sizinle iletişim kurulması,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Web sitesinin işletilmesi, güvenliğinin sağlanması ve kullanım istatistiklerinin anonim olarak ölçülerek deneyimin iyileştirilmesi,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> İlgili mevzuattan doğan yükümlülüklerin yerine getirilmesi.</li>
              </ul>
            </div>

            {/* 4. Hukuki sebep */}
            <div>
              <h2 className="font-display text-2xl text-ink">4. Toplama Yöntemi ve Hukuki Sebep</h2>
              <p className="mt-4">
                Kişisel verileriniz; web sitesindeki iletişim formu, e-posta ve çerezler
                aracılığıyla otomatik ve otomatik olmayan yollarla toplanır. İşleme
                faaliyeti, KVKK&apos;nın 5. maddesinde yer alan aşağıdaki hukuki
                sebeplere dayanır:
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Meşru menfaat (m.5/2-f):</strong> Taleplerin yanıtlanması, iletişim ve sitenin güvenli işletilmesi.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Açık rıza (m.5/1):</strong> Analitik/istatistik çerezlerinin kullanımı, çerez bildirimi üzerinden onay vermeniz hâlinde.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Hukuki yükümlülük (m.5/2-ç):</strong> Yasal saklama ve bilgi verme yükümlülükleri.</span></li>
              </ul>
            </div>

            {/* 5. Aktarım */}
            <div>
              <h2 className="font-display text-2xl text-ink">5. Kişisel Verilerin Aktarılması</h2>
              <p className="mt-4">
                Kişisel verileriniz, pazarlama amacıyla üçüncü kişilerle paylaşılmaz.
                Verileriniz yalnızca aşağıdaki hizmet sağlayıcılar aracılığıyla ve
                sadece belirtilen amaçlarla işlenir/saklanır:
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Barındırma ve form altyapısı (Netlify, Inc.):</strong> İletişim formu gönderimlerinin iletilmesi ve sitenin yayınlanması amacıyla.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Analitik (Google LLC — Google Analytics):</strong> Anonim ziyaret istatistiklerinin ölçülmesi amacıyla, yalnızca çerez onayı vermeniz hâlinde.</span></li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> <span><strong className="text-ink">Yetkili kamu kurum ve kuruluşları:</strong> Yalnızca yasal yükümlülük hâlinde ve ilgili mevzuat çerçevesinde.</span></li>
              </ul>
              <p className="mt-4 text-sm text-muted">
                Yukarıdaki hizmet sağlayıcılar yurt dışında bulunabileceğinden, veriler
                KVKK&apos;nın 9. maddesi kapsamında yurt dışına aktarılabilir. Bu aktarım,
                ilgili sağlayıcıların sunduğu sözleşmesel ve teknik güvenceler ile açık
                rızanız çerçevesinde gerçekleştirilir.
              </p>
            </div>

            {/* 6. Saklama */}
            <div>
              <h2 className="font-display text-2xl text-ink">6. Saklama Süresi</h2>
              <p className="mt-4">
                Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve
                ilgili mevzuatta öngörülen zamanaşımı/saklama süreleri kadar muhafaza
                edilir. İletişim talepleriniz kapsamında işlenen veriler, talebinizin
                sonuçlandırılmasının ardından makul bir süre içinde silinir, yok edilir
                veya anonim hâle getirilir. Veriler süresiz olarak saklanmaz.
              </p>
            </div>

            {/* 7. Güvenlik */}
            <div>
              <h2 className="font-display text-2xl text-ink">7. Veri Güvenliği</h2>
              <p className="mt-4">
                Şirketimiz, KVKK&apos;nın 12. maddesi uyarınca kişisel verilerinizin
                hukuka aykırı olarak işlenmesini ve erişilmesini önlemek ile muhafazasını
                sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli
                teknik ve idari tedbirleri alır. Web sitesi güvenli bağlantı (HTTPS)
                üzerinden sunulur; verilere erişim yetkili kişilerle sınırlıdır.
              </p>
            </div>

            {/* 8. Çerezler */}
            <div>
              <h2 className="font-display text-2xl text-ink">8. Çerez Politikası</h2>
              <p className="mt-4">
                Web sitemiz, sitenin çalışması için gerekli zorunlu çerezlerin yanı sıra,
                yalnızca <strong className="text-ink">onayınız hâlinde</strong> çalışan
                analitik çerezler (Google Analytics) kullanır. Siteye ilk girişinizde
                gösterilen çerez bildirimi üzerinden analitik çerezleri kabul edebilir
                veya reddedebilirsiniz. Onay vermezseniz analitik çerezler yüklenmez.
                Tercihinizi, tarayıcınızın site verilerini temizleyerek dilediğiniz zaman
                sıfırlayabilir; çerezleri tarayıcı ayarlarından tümüyle engelleyebilir
                veya silebilirsiniz.
              </p>
            </div>

            {/* 9. Haklar */}
            <div>
              <h2 className="font-display text-2xl text-ink">9. İlgili Kişinin Hakları (KVKK m. 11)</h2>
              <p className="mt-4">KVKK&apos;nın 11. maddesi uyarınca; veri sorumlusuna başvurarak:</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> İşlenmişse buna ilişkin bilgi talep etme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Mevzuata uygun olarak silinmesini veya yok edilmesini isteme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Düzeltme/silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Otomatik sistemlerle analiz sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" /> Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
              <p className="mt-4">haklarına sahipsiniz.</p>
            </div>

            {/* 10. Başvuru */}
            <div>
              <h2 className="font-display text-2xl text-ink">10. Başvuru Yöntemi</h2>
              <p className="mt-4">
                Yukarıdaki haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici
                bilgilerle birlikte{" "}
                <a className="font-medium text-ink underline underline-offset-4" href={site.contact.emailHref}>
                  {site.contact.email}
                </a>{" "}
                adresine e-posta ile veya{" "}
                <span className="text-ink">{site.contact.address}</span> adresine yazılı
                olarak iletebilirsiniz. Başvurularınız, Veri Sorumlusuna Başvuru Usul ve
                Esasları Hakkında Tebliğ uyarınca en geç 30 gün içinde ücretsiz olarak
                sonuçlandırılır.
              </p>
            </div>

            {/* 11. Değişiklik */}
            <div>
              <h2 className="font-display text-2xl text-ink">11. Değişiklikler</h2>
              <p className="mt-4">
                Şirketimiz, bu metni mevzuat değişiklikleri veya veri işleme
                süreçlerindeki güncellemeler doğrultusunda değiştirme hakkını saklı
                tutar. Güncel metin her zaman bu sayfada yayımlanır.
              </p>
            </div>

            <p className="border-t border-line pt-6 text-xs leading-relaxed text-muted">
              Bu metin genel bilgilendirme amaçlı hazırlanmıştır ve hukuki danışmanlık
              yerine geçmez. Firmanızın gerçek veri işleme süreçlerine tam uyum ve nihai
              hukuki geçerlilik için metnin bir hukuk danışmanı tarafından gözden
              geçirilmesi önerilir.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
