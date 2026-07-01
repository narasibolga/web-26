import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = { locale: string };

const footerLinks = [
  { key: "map", href: "/map" },
  { key: "about", href: "/about" },
  { key: "stories", href: "/stories" },
  { key: "pathfinder", href: "/pathfinder" },
] as const;

export async function Footer({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer id="footer" className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center py-12 text-center">
        <Image
          src="/logo-white.svg"
          alt={t("logoLabel")}
          width={80}
          height={80}
          className="mb-8"
        />

        <p className="font-extralight font-serif text-xl italic tracking-tight md:text-2xl">
          {t("tagline")}
        </p>

        <nav className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted-foreground text-xs uppercase tracking-[0.2em]">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Button
                  variant="link"
                  nativeButton={false}
                  className="text-muted-foreground"
                  render={<Link href={link.href} />}
                >
                  {t(`links.${link.key}`)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col items-center gap-2 text-primary-foreground/60 text-xs">
          <span className="uppercase tracking-[0.2em]">{t("copyright")}</span>
        </div>
      </Container>
    </footer>
  );
}
