import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import { Navbar } from "./(components)/navbar";

const notoSerifHeading = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
});

const brandonGrotesque = localFont({
  src: [
    {
      path: "./fonts/BrandonGrotesque-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/BrandonGrotesque-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/BrandonGrotesque-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/BrandonGrotesque-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/BrandonGrotesque-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/BrandonGrotesque-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/BrandonGrotesque-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "KKN Sibolga - Pengabdian Masyarakat",
  description:
    "KKN SIBOLGA SUMATERA UTARA - Bergabunglah dalam pengabdian yang sama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        brandonGrotesque.variable,
        notoSerifHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
