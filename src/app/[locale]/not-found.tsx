import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function NotFound() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "not-found" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1 bg-background text-center">
      <div className="mb-6 text-foreground/20">
        <svg
          width="160"
          height="160"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="compass-float"
          aria-hidden="true"
        >
          <g className="compass-ring origin-center">
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const inner = 78;
              const outer = i % 3 === 0 ? 68 : 74;
              return (
                <line
                  // biome-ignore lint/suspicious/noArrayIndexKey: static fixed-length array, index is stable identity
                  key={i}
                  x1={100 + Math.cos(angle) * inner}
                  y1={100 + Math.sin(angle) * inner}
                  x2={100 + Math.cos(angle) * outer}
                  y2={100 + Math.sin(angle) * outer}
                  stroke="currentColor"
                  strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          <text
            x="100"
            y="32"
            textAnchor="middle"
            fill="currentColor"
            fontSize="14"
            fontWeight="600"
            letterSpacing="0.05em"
          >
            N
          </text>
          <text
            x="100"
            y="176"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            S
          </text>
          <text
            x="28"
            y="105"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            W
          </text>
          <text
            x="172"
            y="105"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            E
          </text>

          <g className="compass-needle origin-center">
            <polygon
              points="100,38 108,100 100,108 92,100"
              fill="currentColor"
            />
            <polygon
              points="100,162 108,100 100,92 92,100"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              cx="100"
              cy="100"
              r="5"
              fill="hsl(var(--background))"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

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

      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: we need styles
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes compass-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes compass-needle-search {
          0%, 100% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
        }
        @keyframes compass-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .compass-ring {
          animation: compass-ring-spin 24s linear infinite;
          transform-origin: 100px 100px;
        }
        .compass-needle {
          animation: compass-needle-search 3s ease-in-out infinite;
          transform-origin: 100px 100px;
        }
        .compass-float {
          animation: compass-float 4s ease-in-out infinite;
        }
      `,
        }}
      />
    </main>
  );
}
