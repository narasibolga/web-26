import { XMLParser } from "fast-xml-parser";
import {
  dedupeByDatetime,
  type RawGempa,
  toEarthquake,
  withinBounds,
} from "@/lib/bmkg";

export const revalidate = 300;

const FEEDS = {
  recent: "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml",
  felt: "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml",
} as const;

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: true,
});

export async function GET() {
  try {
    const [recentRes, feltRes] = await Promise.all([
      fetch(FEEDS.recent, { next: { revalidate } }),
      fetch(FEEDS.felt, { next: { revalidate } }),
    ]);

    if (!recentRes.ok || !feltRes.ok) {
      return Response.json(
        {
          error: "upstream_unavailable",
          recent: recentRes.status,
          felt: feltRes.status,
        },
        { status: 502 },
      );
    }

    const [recentXml, feltXml] = await Promise.all([
      recentRes.text(),
      feltRes.text(),
    ]);

    const recentParsed = parser.parse(recentXml) as {
      Infogempa?: { gempa?: RawGempa[] };
    };
    const feltParsed = parser.parse(feltXml) as {
      Infogempa?: { gempa?: RawGempa[] };
    };

    const recentRaw = recentParsed.Infogempa?.gempa ?? [];
    const feltRaw = feltParsed.Infogempa?.gempa ?? [];
    const raw = [...recentRaw, ...feltRaw];

    const events = dedupeByDatetime(
      raw
        .flatMap((g) => {
          const e = toEarthquake(g);
          return e && withinBounds(e.lat, e.lng) ? [e] : [];
        })
        .sort((a, b) => b.datetime.localeCompare(a.datetime)),
    );

    return Response.json({ earthquakes: events });
  } catch (error) {
    console.error(
      "bmkg/hazards: fetch/parse failed",
      error instanceof Error ? error.message : error,
    );
    return Response.json({ error: "fetch_failed" }, { status: 502 });
  }
}
