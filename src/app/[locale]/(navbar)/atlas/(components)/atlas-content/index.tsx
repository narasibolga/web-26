import { setRequestLocale } from "next-intl/server";
import { AtlasArticle } from "./atlas-article";
import { AtlasHeroSection } from "./atlas-hero-section";

type Props = { locale: string };

export function AtlasContent({ locale }: Props) {
  setRequestLocale(locale);

  return (
    <>
      <AtlasHeroSection />
      <AtlasArticle />
    </>
  );
}
