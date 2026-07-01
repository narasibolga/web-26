import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";

type Props = { locale: string };

export async function Hero({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero-section" });

  return (
    <section className="relative">
      <Container
        className="flex min-h-screen flex-col justify-end"
        render={<div />}
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <h1 className="z-10 mt-auto text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
          {t("heading")}
        </h1>
      </Container>
    </section>
  );
}
