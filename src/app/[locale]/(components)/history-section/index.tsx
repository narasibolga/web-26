import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = { locale: string };

export async function HistorySection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "history-section" });

  return (
    <Container className="relative min-h-[50vh] items-center justify-center overflow-hidden">
      <Image
        src="/mohonk-history.jpg"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="z-10 flex flex-col items-center px-4 text-center text-white">
        <h2 className="max-w-xl font-serif text-5xl tracking-tighter">
          {t("heading")}
        </h2>

        <Button
          variant="secondary"
          nativeButton={false}
          className="mt-8 border-white bg-transparent px-8 text-white uppercase hover:bg-white/10"
          render={<Link href="/history" />}
        >
          {t("button")}
          <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
        </Button>
      </div>
    </Container>
  );
}
