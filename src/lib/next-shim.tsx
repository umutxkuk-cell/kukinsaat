import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Next.js yüzeyinin (next/image, next/link, next/navigation) bu statik
 * React + Vite kurulumundaki birebir karşılıkları. Bileşen kodları orijinal
 * depodakiyle aynı kalır; yalnızca içe aktarma yolu değişir.
 */

/* ---------------- yönlendirme (gerçek pathname) ---------------- */
export function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0];
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function readPathFromLocation() {
  if (typeof window === "undefined") return "/";

  // Migrate old shared hash-router URLs to crawlable path URLs once.
  const legacy = window.location.hash.match(/^#(\/[^?]*)/);
  if (legacy) {
    const path = normalizePath(legacy[1]);
    window.history.replaceState(window.history.state, "", path + window.location.search);
    return path;
  }

  return normalizePath(window.location.pathname);
}

let currentPath = readPathFromLocation();
const listeners = new Set<(p: string) => void>();

export function getPathname() {
  return currentPath;
}

export function getCurrentPath() {
  return readPathFromLocation();
}

export function setPathname(next: string) {
  if (next === currentPath) return;
  currentPath = next;
  listeners.forEach((l) => l(next));
}

export function usePathname() {
  const [p, setP] = useState(currentPath);
  useEffect(() => {
    listeners.add(setP);
    return () => {
      listeners.delete(setP);
    };
  }, []);
  return p;
}

/* ---------------- 404 ---------------- */
export class NotFoundError extends Error {
  constructor() {
    super("404");
    this.name = "NotFoundError";
  }
}

export function notFound(): never {
  throw new NotFoundError();
}

/* ---------------- next/image ---------------- */
type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
};

export function Image({
  src,
  alt,
  fill,
  priority,
  quality: _quality,
  className,
  style,
  ...rest
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={`${fill ? "absolute inset-0 h-full w-full " : ""}${className ?? ""}`}
      style={fill ? { objectFit: "cover", ...style } : style}
      {...rest}
    />
  );
}

/* ---------------- next/link ---------------- */
type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

export function Link({
  href,
  prefetch: _prefetch,
  scroll: _scroll,
  onClick,
  target,
  download,
  ...rest
}: LinkProps) {
  // Use crawlable, native path links rather than client-only or hash routing.
  // The Vite preview rewrites unknown paths to index.html; hosting rewrite
  // configuration is documented in public/_redirects for static deployment.
  return <a href={href} target={target} download={download} {...rest} onClick={onClick} />;
}

export default Link;
