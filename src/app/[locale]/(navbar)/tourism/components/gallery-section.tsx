import { CameraNightMode01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";
import { galleryImages } from "../tourism-images";
import { GalleryCarousel } from "./gallery-carousel";

type GallerySectionProps = {
  locale: string;
};

export async function GallerySection({ locale }: GallerySectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const images = galleryImages.map(({ src, altKey }) => ({
    src,
    alt: t(`gallery.images.${altKey}`),
  }));

  return (
    <Section containerClassName="items-center gap-5 text-center">
      <HugeiconsIcon
        icon={CameraNightMode01Icon}
        size={50}
        strokeWidth={1}
        className="mb-2"
      />
      <SectionHeading className="max-w-2xl text-balance">
        {t("gallery.heading")}
      </SectionHeading>
      <GalleryCarousel images={images} />
    </Section>
  );
}
