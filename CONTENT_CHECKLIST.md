# Yayın Öncesi Kontrol Listesi — Kuk İnşaat

## Tamamlananlar
- [x] Şirket adı: Kuk İnşaat / KUK PROJE MÜHENDİSLİK İNŞAAT TİCARET LİMİTED ŞİRKETİ
- [x] Adres: Ovacık Mah. Çuhane Cad. No:176 Başiskele, Kocaeli
- [x] E-posta: umut@kukinsaat.com
- [x] Instagram / LinkedIn: kukinsaat
- [x] Logo (vektör yeniden çizim — `src/components/brand/Logo.tsx`)

## Logo
- Logo, gönderdiğiniz altıgen KUK monogramına göre vektör olarak `public/brand/kuk-monogram.svg` (açık zemin) ve `public/brand/kuk-monogram-white.svg` (koyu zemin) dosyalarında tutulur.
- Elinizdeki orijinal vektör dosyasını bu iki dosyayla değiştirmeniz yeterlidir; kod değişikliği gerekmez.

## Projeler
- Örnek/temsili proje kayıtları kaldırıldı (`src/data/projects.ts` artık boş).
- Gerçek projelerinizi bu diziye ekleyin; projeler sayfası ve ana sayfa portföy bölümü otomatik listeler. Dizi boşken zarif bir "hazırlanıyor" durumu gösterilir.

## Kontrol edilecekler
- [ ] Telefon numarası verilirse `src/data/site.ts` → `contact.phone` alanına eklenmeli (şu an bilinçli olarak boş)
- [ ] Orijinal logo dosyası (SVG/PNG) gelirse vektör çizimle değiştirilmeli
- [ ] Gerçek projeler: ad, konum, yıl, durum, rol, fotoğraflar (`src/data/projects.ts`) — mevcut kayıtlar temsili olarak işaretli
- [ ] Proje ve şirket fotoğrafları stok görsellerle değiştirilmeli
- [ ] Alan adı: `NEXT_PUBLIC_SITE_URL` (varsayılan https://kukinsaat.com)
- [ ] İletişim formuna e-posta bildirimi entegrasyonu (mesajlar şu an DB'ye kaydediliyor)
- [ ] KVKK metni hukuki danışmanla gözden geçirilmeli
- [ ] Çalışma saatleri doğrulanmalı (`site.ts` — varsayılan Pzt–Cmt 09:00–18:00)
