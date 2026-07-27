import { setRequestLocale } from "next-intl/server";
import { HistoryArticle } from "./history-article";
import { HistoryHeroSection } from "./history-hero-section";

type Props = { locale: string };

export function HistoryContent({ locale }: Props) {
  setRequestLocale(locale);

  return (
    <>
      <HistoryHeroSection />
      <HistoryArticle />
    </>
  );
}
