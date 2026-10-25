# Logo Değiştirme Kılavuzu (KUK İnşaat)

Sitedeki logo, aşağıdaki **iki dosyadan** okunur. Elinizdeki `.ai` / `.psd`
dosyasını bu iki dosya olarak dışa aktarıp üzerine kaydetmeniz yeterlidir —
kodda hiçbir değişiklik yapmanıza gerek yoktur. Tüm site (header, footer,
açılış ekranı, favicon, kurumsal sayfa, boş durum ekranları) otomatik güncellenir.

| Dosya | Nerede kullanılır | Zemin |
|-------|-------------------|-------|
| `public/brand/kuk-monogram.svg` | Açık zeminli bölümler (header, kurumsal) | Açık |
| `public/brand/kuk-monogram-white.svg` | Koyu zeminli bölümler (footer, hero, açılış) | Koyu |

> Not: Logo dosyası yalnızca **monogram (altıgen amblem)** olmalıdır. Altındaki
> "KUK / İNŞAAT" yazısı sitede ayrıca tipografiyle ekleniyor. İsterseniz tam
> kilitli (amblem + yazı) sürümü de kullanabiliriz; söylemeniz yeterli.

---

## Adobe Illustrator (.ai) → SVG  (ÖNERİLEN)

SVG; vektördür, her ekranda net görünür ve dosya boyutu çok küçüktür.

1. `.ai` dosyasını Illustrator'da açın.
2. Sadece **amblemi** seçin (alttaki yazıyı değil). Gerekirse yeni bir belgeye kopyalayın.
3. `File → Export → Export As…` yolunu izleyin, format olarak **SVG** seçin.
4. Açılan SVG Options penceresinde:
   - Styling: **Presentation Attributes**
   - Font: **Convert to outline** (gerekirse)
   - Images: Embed
   - **Responsive** kutusunu işaretli bırakın.
5. İki renk sürümü oluşturun:
   - **Siyah** amblem → `kuk-monogram.svg`
   - **Beyaz** amblem (renkleri beyaz yapıp dışa aktarın) → `kuk-monogram-white.svg`
6. Dosyaları `public/brand/` klasörüne, **aynı adlarla** kaydedin.

---

## Adobe Photoshop (.psd) → Şeffaf PNG

`.psd` genelde rasterdir; SVG'niz yoksa yüksek çözünürlüklü şeffaf PNG kullanın.

1. `.psd` dosyasını açın, arka plan katmanını gizleyin (şeffaf olsun).
2. `File → Export → Export As…` → format **PNG**, **Transparency** işaretli.
3. En az **1024 px** genişlikte, kare veya logonun oranında dışa aktarın.
4. Beyaz sürüm için logoyu beyaza boyayıp ikinci bir PNG alın.
5. Dosyaları şu adlarla `public/brand/` içine koyun:
   - `kuk-monogram.svg` yerine `kuk-monogram.png`
   - `kuk-monogram-white.svg` yerine `kuk-monogram-white.png`
6. Ardından `src/components/brand/Logo.tsx` içindeki `markSrc` yollarındaki
   `.svg` uzantılarını `.png` yapın (iki satır). İsterseniz bu değişikliği ben
   de yapabilirim; yalnızca "PNG kullanıyorum" demeniz yeterli.

> SVG her zaman PNG'den daha iyidir (net ve küçük). Mümkünse Illustrator'dan
> SVG dışa aktarın.

---

## Alternatif: Logoyu bana iletmek

Dosyayı sohbete yükleyemiyorsanız, Illustrator'da SVG olarak kaydedip bir metin
düzenleyiciyle açın; içindeki `<svg>…</svg>` kodunu kopyalayıp bana yapıştırın.
Ben birebir dosyaya dönüştürür, siteye yerleştiririm — sonuç %100 orijinal olur.
