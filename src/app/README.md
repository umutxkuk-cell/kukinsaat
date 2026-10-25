# Kuk İnşaat — Kurumsal Web Sitesi

**KUK PROJE MÜHENDİSLİK İNŞAAT TİCARET LİMİTED ŞİRKETİ**
Ovacık Mah. Çuhane Cad. No:176 Başiskele, Kocaeli — umut@kukinsaat.com
Instagram / LinkedIn: @kukinsaat

Next.js (App Router) + Tailwind CSS + PostgreSQL (Drizzle ORM) ile geliştirilmiştir.

## Kurulum
```bash
npm install
npx drizzle-kit push   # contact_messages tablosu
npm run dev            # http://localhost:3000
```

## Üretim
```bash
npm run build
npm run start
```

## Notlar
- Logo, yüklenen marka görselindeki altıgen K-U-K monogramı referans alınarak `src/components/brand/Logo.tsx` içinde vektör olarak yeniden çizilmiştir. Orijinal logo dosyası gelirse `public/` altına eklenip bu bileşenle değiştirilebilir.
- Şirket bilgileri `src/data/site.ts` dosyasından yönetilir.
- Proje portföyü `src/data/projects.ts` içindedir; temsili kayıtlar gerçek projelerle değiştirilmelidir.
- Alan adı kesinleştiğinde `NEXT_PUBLIC_SITE_URL` ayarlanmalıdır (varsayılan: https://kukinsaat.com).
