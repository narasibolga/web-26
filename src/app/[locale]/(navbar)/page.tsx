import { setRequestLocale } from "next-intl/server";
import { AdventureSection } from "../(components)/adventure-section";
import { Footer } from "../(components)/footer";
import { Hero } from "../(components)/hero-section";
import { HistorySection } from "../(components)/history-section";
import { InstagramSection } from "../(components)/instagram-section";
import { ExperienceSection } from "../(components)/experience-section";
import { CheckboardSection } from "../(components)/checkboard-section";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <ExperienceSection locale={locale} />
      <CheckboardSection locale={locale} />
      <AdventureSection locale={locale} />
      <HistorySection locale={locale} />
      <InstagramSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
