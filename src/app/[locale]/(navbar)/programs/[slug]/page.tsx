import {
  ArrowLeft01Icon,
  BookOpen01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAllPrograms,
  getProgram,
  getProgramAuthor,
  getProgramHTML,
  getReadingTimeMinutes,
} from "@/lib/programs";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const programs = getAllPrograms();
  return routing.locales.flatMap((locale) =>
    programs.map((program) => ({ locale, slug: program.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  const url = `${SITE_URL}/${locale}/programs/${slug}`;

  return {
    title: program.title,
    description: program.summary,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/programs/${slug}`]),
      ),
    },
    openGraph: {
      type: "article",
      title: program.title,
      description: program.summary,
      url,
      publishedTime: program.date,
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "programs" });

  const program = getProgram(slug);
  if (!program) notFound();
  const html = await getProgramHTML(slug);
  const readingTime = getReadingTimeMinutes(program.content);
  const author = getProgramAuthor(program);

  return (
    <main>
      <section className="relative min-h-42 overflow-hidden md:min-h-60">
        <div className="absolute inset-0">
          <Image
            src="/images/sibolga-panorama-1928.jpg"
            alt=""
            fill
            priority
            className="pointer-events-none h-full w-full select-none object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-transparent" />
        </div>
      </section>

      <Container className="max-w-3xl">
        <header className="flex flex-col gap-4">
          <Button
            variant="outline-foreground"
            render={<Link href="/programs" />}
            nativeButton={false}
            className="mb-4 w-fit"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {t("back")}
          </Button>
          {program.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="font-serif text-3xl text-foreground md:text-5xl">
            {program.title}
          </h1>
          <p className="text-muted-foreground">{program.summary}</p>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {author
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{t("by", { author })}</span>
          </div>
          <div className="mb-4 flex w-full items-center gap-4 border-border border-y py-2 text-muted-foreground text-xs">
            <div className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={14}
                aria-hidden="true"
              />
              <time dateTime={program.date}>{program.date}</time>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={BookOpen01Icon}
                size={14}
                aria-hidden="true"
              />
              <span>{t("readingTime", { minutes: readingTime })}</span>
            </div>
          </div>
        </header>

        <article
          className="typeset typeset-docs max-w-none"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: built-time markdown from local files
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </main>
  );
}
