import {
  ArrowRight02Icon,
  CalendarClockIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type IntroSectionProps = {
  locale: string;
};

export async function IntroSection({ locale }: IntroSectionProps) {
  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "tourism" }),
    getTranslations({ locale, namespace: "navbar" }),
  ]);

  return (
    <Section containerClassName="items-center gap-10 pt-8 text-center">
      <Breadcrumb
        aria-label={tNav("accessibility.breadcrumb")}
        className="uppercase"
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
            <BreadcrumbPage>{t("breadcrumb")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <HugeiconsIcon
        icon={CalendarClockIcon}
        size={50}
        strokeWidth={1}
        className="mt-8"
      />
      <SectionHeading className="max-w-3xl text-balance">
        {t("intro.heading")}
      </SectionHeading>
      <p className="max-w-2xl text-pretty font-heading text-lg text-muted-foreground leading-8">
        {t("intro.description")}
      </p>
    </Section>
  );
}
