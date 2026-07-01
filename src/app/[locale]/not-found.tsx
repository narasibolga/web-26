import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "not-found" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1 bg-background text-center">
      <h1 className="font-serif text-5xl text-foreground leading-tight tracking-tight">
        {t("heading")}
      </h1>

      <p className="max-w-md text-foreground/70">{t("description")}</p>

      <Button
        variant="secondary"
        className="mt-6 rounded-full border-0 px-8 font-medium text-sm tracking-wide"
      >
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </main>
  );
}
