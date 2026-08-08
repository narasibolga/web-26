import { ArrowRight02Icon, FileViewIcon } from "@hugeicons/core-free-icons";
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
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../../../../../(components)/_primitives/section-heading";

const maps = [
  {
    index: 0,
    image: "/images/atlas/slope.webp",
    pdf: "/maps/atlas/slope-map.pdf",
    className: "bg-secondary text-secondary-foreground",
    buttonVariant: "tertiary" as const,
  },
  {
    index: 1,
    image: "/images/atlas/land-use.webp",
    pdf: "/maps/atlas/land-use-map.pdf",
    className: "bg-primary text-primary-foreground",
    buttonVariant: "tertiary" as const,
  },
  {
    index: 2,
    image: "/images/atlas/flora.webp",
    pdf: "/maps/atlas/flora-distribution-map.pdf",
    className: "bg-background text-foreground",
    buttonVariant: "outline-foreground" as const,
  },
  {
    index: 3,
    image: "/images/atlas/landslide.webp",
    pdf: "/maps/atlas/landslide-map.pdf",
    className: "bg-secondary text-secondary-foreground",
    buttonVariant: "tertiary" as const,
  },
] as const;

export async function AtlasArticle() {
  const t = await getTranslations("atlas");
  const tNav = await getTranslations("navbar");

  return (
    <article>
      <section className="bg-background text-foreground">
        <Container className="items-center gap-6 pt-8 text-center">
          <Breadcrumb
            aria-label={tNav("accessibility.breadcrumb")}
            className="mb-8 flex justify-center uppercase"
          >
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
                <BreadcrumbPage>{tNav("links.atlas")}</BreadcrumbPage>
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
          </div>
        </Container>
      </section>

      {maps.map(({ index, image, pdf, className, buttonVariant }) => (
        <section className={className} key={index}>
          <Container className="items-center gap-8 py-24 text-center md:py-32">
            <div className="flex max-w-xl flex-col items-center gap-3">
              <p className="text-sm uppercase tracking-widest">
                {t(`maps.${index}.eyebrow`)}
              </p>
              <SectionHeading>{t(`maps.${index}.title`)}</SectionHeading>
            </div>

            <figure className="w-full max-w-5xl">
              <div className="relative aspect-[842/595] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={t(`maps.${index}.imageAlt`)}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) calc(100vw - 2rem), 1216px"
                />
              </div>
              <figcaption className="mt-3 text-xs opacity-70">
                {t(`maps.${index}.attribution`)}
              </figcaption>
            </figure>

            <div className="flex max-w-lg flex-col items-center gap-6">
              <p className="text-left leading-relaxed">
                {t(`maps.${index}.description`)}
              </p>
              <Button
                variant={buttonVariant}
                size="lg"
                nativeButton={false}
                render={
                  // The Button supplies the anchor's rendered text through Base UI's render prop.
                  // biome-ignore lint/a11y/useAnchorContent: Content is provided by the Button children below.
                  <a href={pdf} target="_blank" rel="noopener noreferrer" />
                }
              >
                {t("actions.viewPdf")}
                <HugeiconsIcon icon={FileViewIcon} data-icon="inline-end" />
              </Button>
            </div>
          </Container>
        </section>
      ))}
    </article>
  );
}
