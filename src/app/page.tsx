import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Process } from "@/components/home/Process";
import { ContactCta } from "@/components/home/ContactCta";
import { SloganBand } from "@/components/home/SloganBand";
import { Faq } from "@/components/home/Faq";
import { faqs } from "@/data/faq";

export const metadata = {
  title: {
    absolute: "Kuk İnşaat | Kocaeli İnşaat ve Mühendislik Firması",
  },
  description:
    "Kocaeli inşaat ve mühendislik firması Kuk İnşaat; konut, ticari ve karma kullanımlı yapıların projelendirme, mühendislik ve inşaat süreçlerini tek elden yürütür. Kaliteyle Kurulur.",
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
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