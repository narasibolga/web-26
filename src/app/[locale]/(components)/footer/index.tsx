import { ExternalLinkIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = { locale: string };

const pageLinks = [
  { key: "map", href: "/map" },
  { key: "history", href: "/history" },
  { key: "pathfinder", href: "/pathfinder" },
  { key: "gallery", href: "/gallery" },
] as const;

export async function Footer({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer id="footer" className="bg-primary text-primary-foreground">
      <Container className="flex flex-col gap-16 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="flex h-fit items-center gap-2 md:col-span-3">
            <Image
              src="/logo-white.svg"
              alt={t("logoLabel")}
              width={60}
              height={60}
            />
            <Image
              src="/images/kkn-logo.png"
              alt={t("partnerLogoLabel")}
              width={60}
              height={60}
            />
          </div>

          <nav className="md:col-span-3">
            <h2 className="mb-6 font-semibold text-background/60 text-sm uppercase tracking-wider">
              {t("headings.navigation")}
            </h2>
            <ul className="flex flex-col gap-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Button
                    variant="link"
                    size="xs"
                    nativeButton={false}
                    className="h-auto w-fit p-0 text-background text-sm uppercase tracking-wider"
                    render={<Link href={link.href} />}
                  >
                    {t(`links.${link.key}`)}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic md:col-span-3">
            <h2 className="mb-6 font-semibold text-background/60 text-sm uppercase tracking-wider">
              {t("headings.contact")}
            </h2>
            <div className="flex flex-col gap-3 text-background text-sm uppercase tracking-wider">
              <p className="leading-relaxed">{t("contact.address")}</p>
              <a
                href="https://instagram.com/narasibolga"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit opacity-50 transition-opacity hover:opacity-70"
              >
                @narasibolga
              </a>
              <a
                href="mailto:narasi.sibolga@gmail.com"
                className="w-fit opacity-50 transition-opacity hover:opacity-70"
              >
                narasi.sibolga@gmail.com
              </a>
            </div>
          </address>

          <a
            href="https://ugm.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border/20 transition-colors hover:border-background md:col-span-3"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-background/10">
              <Image
                src="/images/ugm.jpeg"
                alt={t("partnerCard.label")}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between border-t px-4 py-4 transition-colors group-hover:bg-background">
              <span className="font-medium text-background/80 text-sm uppercase tracking-wider group-hover:text-foreground">
                {t("partnerCard.label")}
              </span>
              <HugeiconsIcon
                icon={ExternalLinkIcon}
                size={16}
                className="text-background/60 transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />
            </div>
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-background/10 border-t pt-8 md:flex-row md:items-center">
          <span className="text-background/60 text-xs uppercase tracking-wider">
            © 2026 KKN PPM UGM Narasibolga
          </span>
        </div>
      </Container>
    </footer>
  );
}
