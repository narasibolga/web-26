import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";
import { brandon, notoSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

const copy = {
  id: {
    html: "id",
    heading: "Tersesat di alam liar.",
    description: "Jalur ini belum menuju ke mana-mana\u2026",
    cta: "Kembali ke jalan setapak",
    coordinates: "1\u00b044\u2032LU 98\u00b047\u2032BT \u00b7 di luar peta",
  },
  en: {
    html: "en",
    heading: "Lost in the wild.",
    description: "This path doesn\u2019t lead anywhere\u2026",
    cta: "Back to the trail",
    coordinates: "1\u00b044\u2032N 98\u00b047\u2032E \u00b7 off the map",
  },
} as const;

export const metadata: Metadata = {
  title: "Not Found \u00b7 KKN",
  description: "Lost in the wild. This path doesn\u2019t lead anywhere.",
};

export default function NotFound() {
  const t = copy[routing.defaultLocale as "id" | "en"];

  return (
    <html
      lang={t.html}
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        brandon.variable,
        notoSerif.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <style>{`
          @keyframes nf-hunt {
            0%   { transform: rotate(-18deg); }
            18%  { transform: rotate(  8deg); }
            30%  { transform: rotate( -4deg); }
            45%  { transform: rotate( 14deg); }
            58%  { transform: rotate(  2deg); }
            72%  { transform: rotate(-10deg); }
            85%  { transform: rotate(  6deg); }
            100% { transform: rotate(-18deg); }
          }
          @keyframes nf-pulse {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(201,169,89,0.35)); }
            50%      { filter: drop-shadow(0 0 10px rgba(232,197,71,0.55)); }
          }
          .nf-needle {
            transform-origin: 50% 50%;
            animation:
              nf-hunt 9.5s cubic-bezier(0.45, 0, 0.55, 1) infinite,
              nf-pulse 3.8s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .nf-needle { animation: none; filter: drop-shadow(0 0 4px rgba(201,169,89,0.25)); transform: rotate(-12deg); }
          }
        `}</style>
        <main
          className="relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-24 text-center font-sans text-foreground"
          lang={t.html}
        >
          <div className="flex flex-row items-center gap-12 max-[512px]:flex-col max-[512px]:gap-10">
            <svg
              className="size-28 shrink-0 max-[512px]:size-36"
              viewBox="0 0 120 120"
              role="img"
              aria-label="Compass whose needle cannot settle on north"
              focusable="false"
            >
              <defs>
                <radialGradient id="nf-dial" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F8F5ED" />
                  <stop offset="72%" stopColor="#F5F0E6" />
                  <stop offset="100%" stopColor="#E9E3D7" />
                </radialGradient>
                <linearGradient
                  id="nf-brass-ring"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#B89A55" />
                  <stop offset="50%" stopColor="#C9A959" />
                  <stop offset="100%" stopColor="#A88A45" />
                </linearGradient>
              </defs>

              {/* dial face */}
              <circle cx="60" cy="60" r="54" fill="url(#nf-dial)" />

              {/* outer brass bezel with forest shadow */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#2C4633"
                strokeWidth="2.5"
                opacity="0.85"
              />
              <circle
                cx="60"
                cy="60"
                r="53.25"
                fill="none"
                stroke="url(#nf-brass-ring)"
                strokeWidth="1.5"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#E9E3D7"
                strokeWidth="0.75"
                opacity="0.9"
              />

              {/* cardinal ticks */}
              {[0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 60 + Math.cos(rad) * 46.5;
                const y1 = 60 + Math.sin(rad) * 46.5;
                const x2 = 60 + Math.cos(rad) * 53.5;
                const y2 = 60 + Math.sin(rad) * 53.5;
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={deg === 0 ? "#C9A959" : "#6B7D6E"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* minor ticks */}
              {Array.from({ length: 24 }).map((_, i) => {
                if (i % 6 === 0) return null;
                const isFive = i % 2 === 0;
                const deg = i * 15;
                const rad = (deg * Math.PI) / 180;
                const innerR = isFive ? 50 : 51.75;
                const x1 = 60 + Math.cos(rad) * innerR;
                const y1 = 60 + Math.sin(rad) * innerR;
                const x2 = 60 + Math.cos(rad) * 54;
                const y2 = 60 + Math.sin(rad) * 54;
                return (
                  <line
                    key={`tick-${deg}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#2C4633"
                    strokeWidth={isFive ? 1 : 0.75}
                    opacity={isFive ? 0.65 : 0.4}
                  />
                );
              })}

              {/* cardinal letters */}
              {[
                { label: "N", deg: 0 },
                { label: "E", deg: 90 },
                { label: "S", deg: 180 },
                { label: "W", deg: 270 },
              ].map(({ label, deg }) => {
                const rad = ((deg - 90) * Math.PI) / 180;
                const x = 60 + Math.cos(rad) * 40;
                const y = 60 + Math.sin(rad) * 40;
                const isNorth = label === "N";
                return (
                  <text
                    key={label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isNorth ? "#C9A959" : "#6B7D6E"}
                    fontSize="7.5"
                    fontFamily="var(--font-sans), system-ui, sans-serif"
                    fontWeight={isNorth ? "500" : "400"}
                    letterSpacing="0.08em"
                  >
                    {label}
                  </text>
                );
              })}

              {/* hunting needle */}
              <g className="nf-needle">
                <polygon points="60,14 62,57 60,54 58,57" fill="#C9A959" />
                <polygon
                  points="60,14 62,57 60,52 58,57"
                  fill="#E8C547"
                  opacity="0.55"
                />
                <polygon
                  points="60,106 58,60 60,64 62,60"
                  fill="#F5F0E6"
                  opacity="0.7"
                />
              </g>

              {/* center rivet */}
              <circle cx="60" cy="60" r="4.5" fill="#0E1A14" />
              <circle
                cx="60"
                cy="60"
                r="4.5"
                fill="none"
                stroke="#C9A959"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="60" r="1.5" fill="#C9A959" opacity="0.8" />
            </svg>

            <div className="flex flex-col items-start gap-2 text-left max-[512px]:items-center max-[512px]:text-center">
              <h1 className="font-heading font-normal text-5xl">{t.heading}</h1>
              <p className="">{t.description}</p>
              <Button
                variant="secondary"
                nativeButton={false}
                className="mt-5 px-6"
                render={<Link href="/" />}
              >
                {t.cta}
              </Button>
            </div>
          </div>
          <p className="-translate-x-1/2 fixed bottom-7 left-1/2 whitespace-nowrap text-muted-foreground text-xs uppercase tracking-widest">
            {t.coordinates}
          </p>
        </main>
      </body>
    </html>
  );
}
