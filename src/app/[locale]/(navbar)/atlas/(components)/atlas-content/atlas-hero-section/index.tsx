import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";

export async function AtlasHeroSection() {
  const t = await getTranslations("atlas");

  return (
    <section className="relative">
      <Container
        className="flex min-h-[80vh] flex-col justify-end"
        render={<div />}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cover.webp"
            alt={t("hero.imageAlt")}
            fill
            priority
            className="pointer-events-none h-full w-full select-none object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-black/45" />
        </div>

        <h1 className="z-10 mt-auto text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
          {t("hero.heading")}
        </h1>
      </Container>
    </section>
  );
}
