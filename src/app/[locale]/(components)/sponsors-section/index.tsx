import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "../_primitives";

type Props = { locale: string };

const sponsorImages = [
  { src: "/images/sponsors/gik.webp", alt: "GIK" },
  { src: "/images/sponsors/pacific-paint.webp", alt: "Pacific Paint" },
  { src: "/images/sponsors/pepsodent.webp", alt: "Pepsodent" },
  { src: "/images/sponsors/pertamina.webp", alt: "Pertamina" },
  { src: "/images/sponsors/rexona.webp", alt: "Rexona" },
];

const sponsors = sponsorImages.map((sponsor, i) => ({
  id: `sponsor-${i + 1}`,
  ...sponsor,
}));

export async function SponsorsSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sponsors-section" });

  return (
    <section className="bg-background py-20 md:py-24">
      <Container className="items-center gap-10 overflow-hidden">
        <SectionHeading className="text-center text-4xl md:text-5xl">
          {t("heading")}
        </SectionHeading>

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent md:w-16"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent md:w-16"
            aria-hidden="true"
          />

          <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative flex h-40 w-72 shrink-0 items-center justify-center bg-white px-8 md:h-48 md:w-80 border border-border"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={160}
                  height={80}
                  className="h-auto max-h-20 w-auto max-w-full object-contain md:max-h-24"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
