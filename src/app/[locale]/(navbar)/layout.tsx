import { setRequestLocale } from "next-intl/server";
import { verifyLocale } from "@/lib/metadata";
import { Footer } from "../(components)/footer";
import { Navbar } from "../(components)/navbar";

type NavbarLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function NavbarLayout({
  children,
  params,
}: NavbarLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      {children}
      <Footer locale={verifyLocale(locale)} />
    </>
  );
}
