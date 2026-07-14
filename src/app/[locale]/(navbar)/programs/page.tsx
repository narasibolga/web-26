import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
import { routing } from "@/i18n/routing";
import { getAllPrograms } from "@/lib/programs";
import { SITE_URL } from "@/lib/site";
import { ProgramList, ProgramTagFilter } from "./(components)/program-list";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programs" });

  const url = `${SITE_URL}/${locale}/programs`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/programs`]),
      ),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url,
    },
  };
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "programs" });
  const tNav = await getTranslations({ locale, namespace: "navbar" });
  const programs = getAllPrograms();

  return (
    <main>
      <section className="relative">
        <Container
          className="flex min-h-[80vh] flex-col justify-end pb-6"
          render={<div />}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/programs/cover.webp"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="pointer-events-none h-full w-full select-none object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />
          </div>

          <h1 className="z-10 mt-auto mb-4 text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
            {t("hero.heading")}
          </h1>

          <ProgramTagFilter programs={programs} />
        </Container>
      </section>

      <section className="bg-background">
        <Container className="pt-8">
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
                <BreadcrumbPage>{tNav("links.programs")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ProgramList programs={programs} />
        </Container>
      </section>
    </main>
  );
}
