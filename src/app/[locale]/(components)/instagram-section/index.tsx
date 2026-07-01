import { ArrowRight01Icon, InstagramIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "../_primitives";

const INSTAGRAM_POST_URL = "https://www.instagram.com/p/DZAQIFdkrhk";

const posts = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
];

export async function InstagramSection({ locale }: { locale: string }) {
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
              <HugeiconsIcon
                icon={InstagramIcon}
                className="size-6 md:size-7"
              />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
