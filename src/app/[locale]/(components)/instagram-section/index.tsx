import { ArrowRight01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Section } from "../_primitives/section";
import { SectionHeading } from "../_primitives/section-heading";

const INSTAGRAM_POST_URL = "https://www.instagram.com/narasibolga";

const posts = [
  {
    id: "1",
    src: "/images/instagram/1.webp",
  },
  {
    id: "2",
    src: "/images/instagram/2.webp",
  },
  {
    id: "3",
    src: "/images/instagram/3.webp",
  },
  {
    id: "4",
    src: "/images/instagram/4.webp",
  },
];

export async function InstagramSection({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "instagram-section" });

  return (
    <Section containerClassName="gap-12">
      <div className="flex flex-col items-center text-center">
        <SectionHeading className="mb-6 text-4xl text-[#1a4d3e] md:text-5xl">
          {t("heading")}
        </SectionHeading>
        <p className="mb-10 max-w-xl text-[#1a4d3e]/80 text-lg md:text-xl">
          {t("subtitle")}
          <br className="hidden md:block" />
          {t("subtitleBrand")}
        </p>

        <Button
          variant="outline-foreground"
          nativeButton={false}
          className="px-8"
          render={
            <Link
              href={INSTAGRAM_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          {t("button")}
          <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={INSTAGRAM_POST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <Image
              src={post.src}
              alt={t(`posts.${post.id}.alt`)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            <div className="absolute top-3 right-3 text-white/90 md:top-4 md:right-4">
              <HugeiconsIcon icon={Copy01Icon} className="size-6 md:size-7" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
