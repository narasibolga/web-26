import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = { locale: string };

const pageLinks = [
  { key: "map", href: "/map" },
  { key: "about", href: "/about" },
  { key: "stories", href: "/stories" },
  { key: "pathfinder", href: "/pathfinder" },
] as const;

const socialLinks = [
  { key: "instagram", href: "https://instagram.com/narasibolga" },
  { key: "tiktok", href: "https://tiktok.com/@narasibolga" },
] as const;

export async function Footer({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer id="footer" className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center py-12">
        <Image
          src="/logo-white.svg"
          alt={t("logoLabel")}
          width={60}
          height={60}
        />

        <p className="text-center font-extralight font-serif text-xl italic tracking-tight md:text-2xl">
          Locally Rooted, Globally Respected
        </p>

        <nav className="flex w-full gap-x-16 gap-y-8">
          <section>
            <h2 className="mb-4 font-serif text-3xl text-primary-foreground">
              {t("headings.pages")}
            </h2>
            <ul className="flex flex-col items-start gap-2 text-muted-foreground uppercase tracking-[0.2em]">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Button
                    variant="link"
                    size="xs"
                    nativeButton={false}
                    className="h-auto w-fit p-0 text-muted-foreground text-xs"
                    render={<Link href={link.href} />}
                  >
                    {t(`links.${link.key}`)}
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-3xl text-primary-foreground">
              {t("headings.socialMedia")}
            </h2>
            <ul className="flex flex-col items-start gap-2 text-muted-foreground uppercase tracking-[0.2em]">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Button
                    variant="link"
                    size="xs"
                    nativeButton={false}
                    className="h-auto w-fit p-0 text-muted-foreground text-xs"
                    render={<Link href={link.href} target="_blank" />}
                  >
                    {t(`links.${link.key}`)}
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </nav>

        <div className="mt-16 flex flex-col items-center gap-2 text-primary-foreground/60 text-xs">
          <span className="uppercase tracking-[0.2em]">{t("copyright")}</span>
        </div>
      </Container>
    </footer>
  );
}
