import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Process } from "@/components/home/Process";
import { ContactCta } from "@/components/home/ContactCta";
import { SloganBand } from "@/components/home/SloganBand";
import { Faq } from "@/components/home/Faq";
import { Marquee } from "@/components/ui/Marquee";

export const metadata = {
  title: "Kuk İnşaat — İnşaat, Proje & Mühendislik | Başiskele, Kocaeli",
  description:
    "KUK İnşaat — Kaliteyle Kurulur. Kocaeli Başiskele merkezli inşaat ve mühendislik firması. Konut, ticari ve karma kullanımlı yapıların projelendirme ve inşaat süreçlerini tek elden yürütür.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Approach />
      <ServicesPreview />
      <SloganBand />
      <ProjectsPreview />
      <Process />
      <Faq />
      <ContactCta />
    </>
  );
}