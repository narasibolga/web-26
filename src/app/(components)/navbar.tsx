"use client";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuLinks = [
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
  { label: "Footer", href: "/footer" },
  { label: "Contact", href: "/contact" },
];

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

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > 100);
  });

  return (
    <>
      <header className="fixed top-0 inset-x-0 w-full z-50 px-6 py-6 md:px-12 md:py-16 bg-linear-to-b from-black/30 to-transparent lg:px-20">
        <div className="absolute inset-x-0 top-0 h-1/2 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />
        <div className="relative z-1 flex items-center justify-between w-full">
          <m.div
            animate={{
              opacity: hidden ? 0 : 1,
              x: hidden ? -200 : 0,
              filter: hidden ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ ease: "easeInOut" }}
          >
            <Link
              href="/"
              className="text-white font-serif text-3xl tracking-tight"
            >
              NaraSibolga
            </Link>
          </m.div>

          <div className="flex items-center gap-6 *:uppercase">
            <Button
              variant="transparent"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MenuIcon isOpen={isMenuOpen} />
              Menu
            </Button>
            <Button variant="transparent">
              <Link href="/map">Map</Link>
            </Button>
            <Button
              variant="secondary"
              className="rounded-full px-6 text-sm font-medium tracking-wide uppercase border-0"
            >
              <Link href="/pathfinder">Pathfinder</Link>
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            key="menu-overlay"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-primary px-6 py-32"
          >
            <div className="flex items-center gap-6 text-background/70 text-xs uppercase tracking-widest">
              <span>English</span>
              <span>/</span>
              <span>Indonesian</span>
            </div>

            <div className="group mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-background font-serif text-4xl md:text-5xl transition-opacity group-hover:opacity-50 hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Button
              variant="secondary"
              className="mt-12 rounded-full px-6 text-sm font-medium tracking-wide uppercase border-0"
            >
              <Link href="/pathfinder">Pathfinder</Link>
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
