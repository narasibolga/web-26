import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ActivitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">
        Activities
      </h1>
    </div>
  );
}
