"use client";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const menuLinks = [
  { key: "home", href: "/" },
  { key: "map", href: "/map" },
  { key: "history", href: "/history" },
  { key: "programs", href: "/programs" },
  { key: "gallery", href: "/gallery" },
  { key: "tourism", href: "/tourism" },
] as const;

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = routing.locales.find((l) => l !== locale) ?? locale;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > 100);
  });

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full bg-linear-to-b from-black/30 to-transparent px-6 py-6 md:px-12 md:py-16 lg:px-20">
        <div className="mask-[linear-gradient(to_bottom,black_0%,transparent_100%)] absolute inset-x-0 top-0 h-1/2 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />
        <div className="pointer-events-auto relative z-1 flex w-full items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.svg"
              alt={t("logoAlt")}
              width={40}
              height={40}
              priority
            />
            <m.div
              animate={{
                opacity: hidden ? 0 : 1,
                x: hidden ? -50 : 0,
                filter: hidden ? "blur(8px)" : "blur(0px)",
              }}
              transition={{ ease: "easeInOut" }}
              className="ml-3 flex items-center gap-3"
            >
              <span className="h-5 w-px bg-white/40" aria-hidden="true" />
              <Image
                src="/logo-text.svg"
                alt={t("brand")}
                width={160}
                height={28}
                priority
              />
            </m.div>
          </Link>

          <div className="flex items-center gap-6">
            <Button
              variant="transparent"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MenuIcon isOpen={isMenuOpen} />
              <span className="max-sm:hidden">{t("menu")}</span>
            </Button>
            <Button
              variant="transparent"
              nativeButton={false}
              render={<Link href="/map" />}
              onClick={() => setIsMenuOpen(false)}
              className="max-sm:hidden"
            >
              {t("links.map")}
            </Button>
            <Button
              variant="tertiary"
              nativeButton={false}
              className="px-6 max-sm:hidden"
              render={<Link href="/pathfinder" />}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("pathfinder")}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            key="menu-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 38,
              mass: 0.9,
            }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-primary px-6 pb-8 sm:pt-50"
          >
            <button
              type="button"
              onClick={switchLocale}
              className="flex items-center gap-6 text-background/70 text-xs uppercase tracking-widest"
            >
              <span
                className={
                  locale === "en" ? "text-background" : "text-background/70"
                }
              >
                {t("languages.english")}
              </span>
              <span
                className={
                  locale === "id" ? "text-background" : "text-background/70"
                }
              >
                {t("languages.indonesian")}
              </span>
            </button>

            <div className="group mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-4xl text-background transition-opacity hover:opacity-100 group-hover:opacity-50 md:text-5xl"
                >
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </div>

            <Button
              variant="secondary"
              className="mt-12 rounded-full border-0 px-6 font-medium text-sm tracking-wide"
            >
              <Link href="/pathfinder" onClick={() => setIsMenuOpen(false)}>
                {t("pathfinder")}
              </Link>
            </Button>

            <Container className="hidden gap-4 py-0 md:mt-auto md:flex md:w-full md:flex-col md:items-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-background/70 text-xs uppercase tracking-[0.2em]">
                  © 2026 KKN PPM UGM NaraSibolga
                </span>

                <p className="font-extralight font-serif text-background/70 text-xl italic">
                  Locally Rooted, Globally Respected
                </p>
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <m.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <m.path
      animate={{ d: isOpen ? "M5 5 L19 19" : "M2 7 L10 7" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <m.path
      initial={{ opacity: 1 }}
      animate={{
        d: isOpen ? "M12 12 L12 12" : "M2 12 L16 12",
        opacity: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <m.path
      animate={{ d: isOpen ? "M19 5 L5 19" : "M2 17 L22 17" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </m.svg>
);
