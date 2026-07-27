# NaraSibolga

Bilingual (English / Bahasa Indonesia) marketing site for Sibolga and Tapanuli Bay, North Sumatra. Built with Next.js 16 App Router, React 19, and Base UI.

## Stack

- **Framework**: Next.js 16 (App Router, Proxy, RSC)
- **i18n**: `next-intl` v4 with locale-prefixed routes (`/en/...`, `/id/...`)
- **UI primitives**: Base UI (`@base-ui/react`) with `class-variance-authority` variants
- **Styling**: Tailwind CSS v4
- **Maps**: `maplibre-gl` + `react-map-gl`
- **Data fetching**: `@tanstack/react-query` for client-side, RSC for server-rendered pages
- **Content**: Markdown under `src/content/programs/`, parsed with `remark`
- **Package manager**: bun

## Project layout

```
src/
├── app/
│   ├── [locale]/                  locale-parametrized routes
│   │   ├── layout.tsx             root locale layout (fonts, providers, JSON-LD)
│   │   ├── (components)/           home-page section components + navbar/footer chrome
│   │   │   ├── _primitives/       Section + SectionHeading building blocks
│   │   │   ├── hero-section/      section folders follow a uniform pattern:
│   │   │   ├── experience-section/   index.tsx + co-located messages/{en,id}.json
│   │   │   └── ...
│   │   ├── (navbar)/              chrome-on routes (gallery, history, pathfinder, programs, activities)
│   │   └── (no-navbar)/map/       fullscreen map route (tourism + BMKG earthquake hazards)
│   └── api/bmkg/hazards/route.ts  public proxy of the BMKG earthquake feed
├── components/
│   ├── ui/                        shadcn-style primitives (button, badge, carousel, empty, ...)
│   ├── layout/container.tsx       shared layout container
│   └── providers.tsx              QueryClient + LazyMotion composition root
├── hooks/                         shared client hooks
├── i18n/
│   ├── routing.ts                 locale config + Locale type
│   ├── navigation.ts              Link/useRouter/usePathname + useTypedLocale
│   ├── search-params.ts           useUpdateSearchParams helper
│   └── request.ts                 server-side message loader (auto-discovers messages/ dirs)
└── lib/
    ├── bmkg.ts                    Earthquake type + BMKG XML parsers
    ├── datetime.ts                locale-aware date formatting presets
    ├── fonts.ts                   next/font configuration
    ├── gallery.ts                 gallery photo metadata
    ├── locations.ts               geo data + categories
    ├── metadata.ts                buildLocalePageMetadata helper + localeStaticParams
    ├── pathfinder/                pathfinder quiz + archetype scoring
    │   ├── scoring.ts             tallyScores / matchArchetype / rankLocations
    │   └── types.ts               Dimension, AnswerScores
    ├── programs.ts                markdown content pipeline (server-only)
    ├── site.ts                    SITE_URL + OG locale map
    └── utils.ts                   cn() helper
```

## Conventions

- **Locale pages** use `buildLocalePageMetadata` + `localeStaticParams` from `@/lib/metadata` for the standard `generateMetadata`/`generateStaticParams` boilerplate.
- **Section components** follow `*-section/index.tsx` + co-located `messages/{en,id}.json`. Translation files are auto-discovered by `i18n/request.ts`.
- **Props typed with `Locale`** (from `@/i18n/routing`) instead of `string` for locale parameters.
- **Client hooks needing `useSearchParams`** import from `@/i18n/search-params` to keep `@/i18n/navigation` server-safe.

## Scripts

```bash
bun run dev       # dev server
bun run build     # production build
bun run start     # serve production build
bun run lint      # biome check
bun run lint:fix  # biome check --write --unsafe
bun run format    # biome format --write
bun run typecheck # tsgo --noEmit
bun test          # bun test runner
```

## Architecture decisions

Recorded in `docs/adr/`. See `docs/adr/0001-gallery-from-scratch.md` for the gallery build-vs-adopt decision.
