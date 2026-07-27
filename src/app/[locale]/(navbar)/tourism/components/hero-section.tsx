import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";

type HeroSectionProps = {
  locale: string;
};

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const facts = t.raw("hero.facts") as string[];

  return (
    <Section
      className="relative"
      containerClassName="min-h-[80vh] justify-end pb-6"
      containerRender={<div />}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/tourism-package/cover.webp"
          alt={t("hero.imageAlt")}
          fill
          priority
          className="pointer-events-none select-none object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/45" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="max-w-3xl font-serif text-5xl text-shadow-2xs tracking-tighter md:text-6xl">
          {t("hero.heading")}
        </h1>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs uppercase">
          {facts.map((fact, index) => (
            <div key={fact} className="flex items-center gap-5">
              {index > 0 && (
                <span
                  className="size-1 rounded-full bg-white/60"
                  aria-hidden="true"
                />
              )}
              <span>{fact}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
