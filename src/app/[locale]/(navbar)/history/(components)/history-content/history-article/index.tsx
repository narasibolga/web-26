import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../../../../../(components)/_primitives/section-heading";

const eras = [
  {
    index: 0,
    image: "/images/fort-tapanoeli-poncan-ketek.png",
    className: "bg-secondary text-secondary-foreground",
  },
  {
    index: 1,
    image: "/images/sibolga-european-quarter-1917.jpg",
    className: "bg-primary text-primary-foreground",
  },
  {
    index: 2,
    image: "/images/sibolga-1900s.webp",
    className: "bg-background text-foreground",
  },
] as const;

export async function HistoryArticle() {
  const t = await getTranslations("history");
  const tNav = await getTranslations("navbar");

  return (
    <article>
      <section className="bg-background text-foreground">
        <Container className="items-center gap-6 pt-8 text-center">
          <Breadcrumb className="mb-8 flex justify-center uppercase">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  {tNav("links.home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{tNav("links.history")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <SectionHeading className="max-w-lg">
            {t("intro.heading")}
          </SectionHeading>
          <p className="max-w-md text-muted-foreground text-xs uppercase tracking-wide">
            {t("intro.subheading")}
          </p>
          <div className="mt-6 flex max-w-lg flex-col gap-6 text-left leading-relaxed">
            <p>{t("intro.paragraphs.0")}</p>
            <p>{t("intro.paragraphs.1")}</p>
            <p>{t("intro.paragraphs.2")}</p>
          </div>
        </Container>
      </section>

      {eras.map(({ index, image, className }) => (
        <section className={className} key={index}>
          <Container className="items-center gap-8 py-24 text-center md:py-32">
            <div className="flex max-w-xl flex-col items-center gap-3">
              <p className="text-sm uppercase tracking-widest">
                {t(`eras.${index}.year`)}
              </p>
              <SectionHeading>{t(`eras.${index}.title`)}</SectionHeading>
            </div>

            <figure className="w-full max-w-2xl">
              <div className="relative aspect-3/2 overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={t(`eras.${index}.imageAlt`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) calc(100vw - 2rem), 896px"
                />
              </div>
              <figcaption className="mt-3 text-xs opacity-70">
                {t(`eras.${index}.attribution`)}
              </figcaption>
            </figure>

            <p className="max-w-lg text-left leading-relaxed">
              {t(`eras.${index}.description`)}
            </p>
          </Container>
        </section>
      ))}
    </article>
  );
}
