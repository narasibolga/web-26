import { getLocale } from "next-intl/server";
import "./globals.css";
import { brandon, notoSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        brandon.variable,
        notoSerif.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
