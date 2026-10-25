/* eslint-disable @next/next/no-img-element */

/**
 * KUK İnşaat logosu.
 *
 * Marka işareti gerçek dosyadan yüklenir (bkz. LOGO.md):
 *   public/brand/kuk-monogram.svg        (açık zemin)
 *   public/brand/kuk-monogram-white.svg  (koyu zemin)
 *
 * ► Orijinal logonuzu birebir kullanmak için yalnızca bu iki dosyayı değiştirin.
 *   PNG kullanacaksanız aşağıdaki "EXT" değerini "png" yapmanız yeterlidir.
 */

type Variant = "dark" | "light";

// Logo dosya uzantısı. SVG önerilir; PNG kullanacaksanız "png" yapın.
const EXT = "svg";

const markSrc: Record<Variant, string> = {
  dark: `/brand/kuk-monogram.${EXT}`,
  light: `/brand/kuk-monogram-white.${EXT}`,
};

export function LogoMark({
  variant = "dark",
  className = "h-10 w-auto",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <img
      src={markSrc[variant]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const color = variant === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`} aria-label="Kuk İnşaat">
      <LogoMark variant={variant} className="h-11 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.4rem] font-extrabold tracking-[0.14em]">KUK</span>
        <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.5em] opacity-70">
          İnşaat
        </span>
      </span>
    </span>
  );
}

export function LogoStacked({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const color = variant === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex flex-col ${color} ${className}`} aria-label="Kuk İnşaat">
      <LogoMark variant={variant} className="h-24 w-auto" />
      <span className="mt-5 text-3xl font-extrabold tracking-[0.16em] leading-none">KUK</span>
      <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.56em] opacity-70">
        İnşaat
      </span>
    </span>
  );
}