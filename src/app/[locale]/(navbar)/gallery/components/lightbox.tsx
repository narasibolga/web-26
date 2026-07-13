"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";
import {
  type GalleryPhoto,
  type GalleryWeekKey,
  galleryImagePath,
} from "@/lib/gallery";

type LightboxProps = {
  weekKey: GalleryWeekKey;
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({
  weekKey,
  photos,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const t = useTranslations("gallery.lightbox");
  const reducedMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isOpen = index !== null && index >= 0 && index < photos.length;

  const goPrev = useCallback(() => {
    if (index === null || photos.length === 0) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || photos.length === 0) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  // Scroll lock + focus management
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const panel = panelRef.current;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);

    return () => {
      window.removeEventListener("keydown", handleTab);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const currentPhoto = isOpen && index !== null ? photos[index] : null;
  const currentSrc =
    isOpen && currentPhoto ? galleryImagePath(weekKey, currentPhoto.id) : null;

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && currentSrc && (
        <m.div
          key="lightbox-overlay"
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            ref={panelRef}
            className="relative flex h-full w-full items-center justify-center"
          >
            <m.div
              key={currentSrc}
              initial={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative h-full w-full max-w-5xl"
              style={{ aspectRatio: currentPhoto.aspect }}
            >
              <Image
                src={currentSrc}
                alt={currentPhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </m.div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="absolute top-2 right-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={t("previous")}
                  className="-translate-y-1/2 absolute top-1/2 left-2 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={t("next")}
                  className="-translate-y-1/2 absolute top-1/2 right-2 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-6" />
                </button>
              </>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
