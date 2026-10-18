import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Kuk İnşaat — Kaliteyle Kurulur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0d",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="108" viewBox="0 0 329.28 372.5" fill="#ffffff">
            <path
              fillRule="evenodd"
              d="M297.08 261.26 164.79 341.36 31.00 259.41 31.00 113.09 164.79 30.22 297.08 112.63Z M164.79 3.36 6.48 98.83 6.48 273.28 164.79 369.14 321.14 273.28 321.14 98.83Z"
            />
            <path d="M67.56 173.29 101.80 109.85 101.80 89.02 74.50 105.22 29.15 187.64 29.61 236.72 53.68 198.29 103.65 282.09 103.65 235.33Z" />
            <path d="M253.14 105.22 225.84 89.02 225.84 109.85 260.09 173.29 223.99 235.33 223.99 282.09 273.97 198.29 298.03 236.72 298.49 187.64Z" />
            <path d="M183.24 62.60 183.24 267.28 164.73 280.24 145.76 267.28 146.69 62.60 120.31 77.91 120.31 289.50 164.27 318.67 208.69 290.43 208.69 76.98Z" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: 6 }}>KUK</span>
            <span style={{ fontSize: 18, letterSpacing: 14, opacity: 0.7, marginTop: 6 }}>
              İNŞAAT
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 54, height: 2, background: "#d6ad6a" }} />
            <span style={{ fontSize: 22, letterSpacing: 8, color: "#d6ad6a" }}>
              KALİTEYLE KURULUR
            </span>
          </div>
          <span style={{ fontSize: 72, fontWeight: 700, marginTop: 20, maxWidth: 900 }}>
            İnşaat, Proje ve Mühendislik
          </span>
        </div>

        <span style={{ fontSize: 22, opacity: 0.6 }}>Kocaeli İnşaat & Mühendislik</span>
      </div>
    ),
    { ...size }
  );
}