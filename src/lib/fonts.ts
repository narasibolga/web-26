import { Noto_Serif } from "next/font/google";
import localFont from "next/font/local";

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const brandon = localFont({
  src: [
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/[locale]/fonts/BrandonGrotesque-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});
