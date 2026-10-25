import type { NextConfig } from "next";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Favicon — build sırasında otomatik üretim.
 *
 * Neden böyle: Bu platformdan indirilen/deploy edilen pakette binary (PNG)
 * dosyaları korunmayabiliyor; yalnızca metin dosyaları (bu config dahil) taşınıyor.
 * Google Search ise SVG favicon'u DESTEKLEMİYOR, PNG gerekiyor.
 *
 * Çözüm: Favicon PNG'leri her `next build` çalıştığında (yerelde ve Netlify'da)
 * bu koddan yeniden üretilir ve public/ içine statik dosya olarak yazılır.
 * Böylece binary dosya taşımaya gerek kalmaz; PNG her zaman canlıda hazır olur.
 */

// Koyu zeminli, beyaz KUK monogramı (orijinal logodan).
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0d0d0d"/>
  <g transform="translate(91 70) scale(0.95)" fill="#ffffff">
    <path fill-rule="evenodd" d="M297.08 261.26 164.79 341.36 31.00 259.41 31.00 113.09 164.79 30.22 297.08 112.63Z M164.79 3.36 6.48 98.83 6.48 273.28 164.79 369.14 321.14 273.28 321.14 98.83Z"/>
    <path d="M67.56 173.29 101.80 109.85 101.80 89.02 74.50 105.22 29.15 187.64 29.61 236.72 53.68 198.29 103.65 282.09 103.65 235.33Z"/>
    <path d="M253.14 105.22 225.84 89.02 225.84 109.85 260.09 173.29 223.99 235.33 223.99 282.09 273.97 198.29 298.03 236.72 298.49 187.64Z"/>
    <path d="M183.24 62.60 183.24 267.28 164.73 280.24 145.76 267.28 146.69 62.60 120.31 77.91 120.31 289.50 164.27 318.67 208.69 290.43 208.69 76.98Z"/>
  </g>
</svg>`;

async function generateFavicons() {
  try {
    const { default: sharp } = await import("sharp");
    const pub = join(process.cwd(), "public");
    if (!existsSync(pub)) mkdirSync(pub, { recursive: true });

    // Kaynak SVG'yi de public'e yaz (tarayıcı sekmesi için).
    writeFileSync(join(pub, "favicon.svg"), FAVICON_SVG, "utf8");

    const svgBuffer = Buffer.from(FAVICON_SVG);
    const targets: { name: string; size: number }[] = [
      { name: "favicon-96x96.png", size: 96 },
      { name: "web-app-icon.png", size: 512 },
      { name: "apple-touch-icon.png", size: 180 },
    ];
    for (const t of targets) {
      const out = join(pub, t.name);
      // Varsa yeniden üretme (build hızlanır); yoksa oluştur.
      if (!existsSync(out)) {
        await sharp(svgBuffer, { density: 300 }).resize(t.size, t.size).png().toFile(out);
      }
    }
  } catch (err) {
    console.warn("[favicon] PNG üretimi atlandı:", (err as Error).message);
  }
}

// Build/başlangıçta favicon'ları üret, sonra config'i döndür.
export default async function config(): Promise<NextConfig> {
  await generateFavicons();
  return {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
      ],
    },
  };
}
