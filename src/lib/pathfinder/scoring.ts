import { locationScores } from "@/lib/locations";
import { type AnswerScores, type Dimension, dimensions } from "./types";

export { dimensions, type AnswerScores, type Dimension };

export type QuizAnswer = {
  id: string;
  label: { en: string; id: string };
  scores: AnswerScores;
};

export type QuizQuestion = {
  id: string;
  prompt: { en: string; id: string };
  answers: QuizAnswer[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1-vibes",
    prompt: {
      en: "What kind of holiday atmosphere are you looking for?",
      id: "Suasana liburan seperti apa yang kamu cari?",
    },
    answers: [
      {
        id: "sunyi-alami",
        label: {
          en: "Quiet and natural, far from the crowds",
          id: "Tenang dan alami, jauh dari keramaian",
        },
        scores: { alam: 3, sunyi: 3, bahari: 1, aktif: 1 },
      },
      {
        id: "laut-pantai",
        label: {
          en: "Sea and beach, with waves and a refreshing breeze",
          id: "Laut dan pantai, ditemani ombak serta angin yang menyegarkan",
        },
        scores: { bahari: 3, santai: 2, foto: 1 },
      },
      {
        id: "sejarah-budaya",
        label: {
          en: "History and culture, in places with a story",
          id: "Sejarah dan budaya, tempat yang menyimpan cerita",
        },
        scores: { sejarah: 3, foto: 1, santai: 1 },
      },
      {
        id: "petualangan",
        label: {
          en: "Adventure and challenge, with trekking and exploration",
          id: "Petualangan dan tantangan, trekking sambil menjelajah",
        },
        scores: { aktif: 3, alam: 2, jauh: 1 },
      },
    ],
  },
  {
    id: "q2-jarak",
    prompt: {
      en: "How far are you willing to go from central Sibolga?",
      id: "Seberapa jauh kamu ingin pergi dari pusat Kota Sibolga?",
    },
    answers: [
      {
        id: "deket",
        label: {
          en: "Nearby, within 5 km and easy to reach",
          id: "Dekat saja, maksimal 5 km dan mudah dijangkau",
        },
        scores: { dekat: 3 },
      },
      {
        id: "not-that-far",
        label: {
          en: "Not too far, a comfortable 10–30-minute journey",
          id: "Tidak terlalu jauh, 10–30 menit masih nyaman",
        },
        scores: { dekat: 2, sedang: 1 },
      },
      {
        id: "lumayan-jauh",
        label: {
          en: "A little farther, 30 minutes–1 hour for the right destination",
          id: "Cukup jauh, 30 menit–1 jam jika tujuannya menarik",
        },
        scores: { sedang: 3, jauh: 1 },
      },
      {
        id: "jauh-kapal",
        label: {
          en: "Farther away, more than an hour by sea",
          id: "Jauh dan siap naik perahu, lebih dari satu jam melalui laut",
        },
        scores: { jauh: 3, bahari: 1, aktif: 1 },
      },
    ],
  },
  {
    id: "q3-aktivitas",
    prompt: {
      en: "What do you like doing on holiday?",
      id: "Apa yang paling kamu sukai saat liburan?",
    },
    answers: [
      {
        id: "foto-konten",
        label: {
          en: "Photography and content creation in striking locations",
          id: "Berfoto dan membuat konten di tempat yang menarik",
        },
        scores: { foto: 3, santai: 1, dekat: 1 },
      },
      {
        id: "snorkeling",
        label: {
          en: "Swimming and snorkeling while exploring underwater",
          id: "Berenang dan snorkeling sambil menjelajahi dunia bawah laut",
        },
        scores: { bahari: 3, aktif: 2 },
      },
      {
        id: "trekking",
        label: {
          en: "Trekking and hiking, because a climb completes the day",
          id: "Trekking dan mendaki, rasanya kurang lengkap tanpa tanjakan",
        },
        scores: { aktif: 3, alam: 2, jauh: 1 },
      },
      {
        id: "santai-aja",
        label: {
          en: "Relaxing and taking time to enjoy the moment",
          id: "Bersantai, duduk tenang sambil menikmati suasana",
        },
        scores: { santai: 3, foto: 1 },
      },
    ],
  },
  {
    id: "q4-keramaian",
    prompt: {
      en: "What kind of atmosphere do you prefer?",
      id: "Tipe wisata favorit kamu yang mana?",
    },
    answers: [
      {
        id: "ramai-meriah",
        label: {
          en: "Bustling and lively, with plenty of visitors and facilities",
          id: "Ramai dan meriah, banyak pengunjung serta fasilitas lengkap",
        },
        scores: { ramai: 3, dekat: 1, santai: 1 },
      },
      {
        id: "sepi-hidden-gem",
        label: {
          en: "Quiet and hidden, away from the crowds",
          id: "Tenang dan tersembunyi, jauh dari keramaian",
        },
        scores: { sunyi: 3, jauh: 2, alam: 1 },
      },
      {
        id: "seru-rame",
        label: {
          en: "Fun for a group, with friends along for the journey",
          id: "Seru untuk rombongan, cocok mengajak teman-teman",
        },
        scores: { ramai: 2, santai: 1, bahari: 1 },
      },
      {
        id: "solo-berdua",
        label: {
          en: "Solo or with one companion, calm and personal",
          id: "Sendiri atau berdua, tenang dan terasa lebih dekat",
        },
        scores: { sunyi: 2, foto: 1, santai: 1 },
      },
    ],
  },
  {
    id: "q5-prioritas",
    prompt: {
      en: "When picking a destination, what's your priority?",
      id: "Apa prioritasmu saat memilih destinasi?",
    },
    answers: [
      {
        id: "gratis-murah",
        label: {
          en: "Free or affordable, without missing out on the fun",
          id: "Gratis atau terjangkau, tetap hemat tanpa kehilangan keseruan",
        },
        scores: { dekat: 2, santai: 1, ramai: 1 },
      },
      {
        id: "air-terjun-sungai",
        label: {
          en: "A waterfall or river with a refreshing atmosphere",
          id: "Air terjun atau sungai dengan suasana yang menyegarkan",
        },
        scores: { alam: 3, aktif: 2, sunyi: 1 },
      },
      {
        id: "view-laut-pulau",
        label: {
          en: "Sea and island views, with waves and a beautiful horizon",
          id: "Panorama laut dan pulau, dengan ombak serta cakrawala yang indah",
        },
        scores: { bahari: 3, foto: 2, santai: 1 },
      },
      {
        id: "nilai-sejarah",
        label: {
          en: "History and character, in a place with meaning",
          id: "Nilai sejarah dan keunikan, tempat yang memiliki makna",
        },
        scores: { sejarah: 3, foto: 2, dekat: 1 },
      },
    ],
  },
  {
    id: "q6-fisik",
    prompt: {
      en: "How active would you like this trip to be?",
      id: "Seberapa siap fisikmu untuk perjalanan kali ini?",
    },
    answers: [
      {
        id: "santai-gamau-capek",
        label: {
          en: "Relaxed, without getting too tired",
          id: "Santai, tidak ingin terlalu lelah",
        },
        scores: { santai: 3, dekat: 2 },
      },
      {
        id: "jalan-kaki-ringan",
        label: {
          en: "Comfortable with some light walking",
          id: "Jalan kaki ringan masih nyaman",
        },
        scores: { santai: 1, foto: 1, dekat: 1 },
      },
      {
        id: "naik-turun-bukit",
        label: {
          en: "Ready to hike up and down hills",
          id: "Siap naik-turun bukit!",
        },
        scores: { aktif: 3, alam: 2 },
      },
      {
        id: "basah-basahan",
        label: {
          en: "Ready to get in the water",
          id: "Siap bermain air!",
        },
        scores: { bahari: 2, aktif: 2, alam: 1 },
      },
    ],
  },
  {
    id: "q7-timing",
    prompt: {
      en: "When do you prefer to travel?",
      id: "Kapan kamu biasanya berwisata?",
    },
    answers: [
      {
        id: "pagi-siang",
        label: {
          en: "Morning to midday, with good light for photos",
          id: "Pagi-siang, cahayanya bagus buat foto-foto",
        },
        scores: { foto: 2, aktif: 1, alam: 1 },
      },
      {
        id: "sore-senja",
        label: {
          en: "Afternoon to dusk, for a beautiful sunset",
          id: "Sore hingga senja, mengejar matahari terbenam yang indah",
        },
        scores: { foto: 3, santai: 2, bahari: 1 },
      },
      {
        id: "full-weekend",
        label: {
          en: "A full weekend, with time for a day trip or overnight stay",
          id: "Akhir pekan penuh, siap seharian atau menginap",
        },
        scores: { jauh: 2, bahari: 2, aktif: 1 },
      },
      {
        id: "fleksibel",
        label: {
          en: "Flexible, any time is good for a journey",
          id: "Fleksibel, kapan saja selama bisa bepergian",
        },
        scores: { santai: 1, dekat: 1 },
      },
    ],
  },
  {
    id: "q8-teman",
    prompt: {
      en: "Who do you usually travel with?",
      id: "Biasanya kamu liburan sama siapa?",
    },
    answers: [
      {
        id: "sendiri",
        label: {
          en: "Alone, enjoying a solo trip and time to myself",
          id: "Sendiri, menikmati perjalanan dan waktu untuk diri sendiri",
        },
        scores: { sunyi: 3, foto: 2, aktif: 1 },
      },
      {
        id: "berdua",
        label: {
          en: "A partner or close friend, sharing memorable moments",
          id: "Berdua dengan pasangan atau sahabat, menikmati momen yang berkesan",
        },
        scores: { santai: 2, foto: 2, sunyi: 1 },
      },
      {
        id: "grup-kecil",
        label: {
          en: "A small group of 3–5, lively but still comfortable",
          id: "Kelompok kecil 3–5 orang, seru tetapi tetap nyaman",
        },
        scores: { aktif: 2, bahari: 1, sedang: 1 },
      },
      {
        id: "keluarga",
        label: {
          en: "Family, because time together comes first",
          id: "Keluarga, karena kebersamaan adalah yang utama",
        },
        scores: { ramai: 3, dekat: 1, santai: 1 },
      },
    ],
  },
  {
    id: "q9-alam",
    prompt: {
      en: "Which element of nature makes you fall in love?",
      id: "Elemen alam mana yang bikin kamu jatuh hati?",
    },
    answers: [
      {
        id: "laut-karang",
        label: {
          en: "Blue sea and coral reefs, with a remarkable underwater world",
          id: "Laut biru dan terumbu karang, dunia bawah laut yang memukau",
        },
        scores: { bahari: 4, aktif: 2 },
      },
      {
        id: "hutan-rindang",
        label: {
          en: "Forests and lush trees, with cool, fresh air",
          id: "Hutan dan pepohonan rindang, teduh dengan udara yang segar",
        },
        scores: { alam: 4, sunyi: 2, aktif: 1 },
      },
      {
        id: "bukit-panorama",
        label: {
          en: "Hills with a panorama from above, city and sea at once",
          id: "Bukit dengan panorama kota dan laut dari ketinggian",
        },
        scores: { alam: 3, foto: 3, aktif: 2 },
      },
      {
        id: "air-terjun-aliran",
        label: {
          en: "Waterfalls and flowing water, with their calming sound",
          id: "Air terjun dan aliran air dengan suara yang menenangkan",
        },
        scores: { alam: 3, aktif: 2, sunyi: 2 },
      },
    ],
  },
  {
    id: "q10-momen",
    prompt: {
      en: "What kind of moment stays with you after a trip?",
      id: "Momen apa yang paling berkesan bagimu setelah liburan?",
    },
    answers: [
      {
        id: "foto-video",
        label: {
          en: "Beautiful photos and videos to share",
          id: "Foto dan video menarik untuk dibagikan",
        },
        scores: { foto: 4, santai: 1 },
      },
      {
        id: "damai-lepas",
        label: {
          en: "A sense of peace and relief, with a refreshed mind",
          id: "Rasa damai dan lega, pikiran kembali segar",
        },
        scores: { sunyi: 3, alam: 2, santai: 2 },
      },
      {
        id: "adrenalin-proud",
        label: {
          en: "Adrenaline and pride after overcoming a challenge",
          id: "Adrenalin dan rasa bangga setelah menaklukkan tantangan",
        },
        scores: { aktif: 4, jauh: 2 },
      },
      {
        id: "bareng-orang-tersayang",
        label: {
          en: "Moments with loved ones, unforgettable memories",
          id: "Momen bersama orang-orang tersayang yang sulit dilupakan",
        },
        scores: { ramai: 3, santai: 2, bahari: 1 },
      },
    ],
  },
];

export type ArchetypeCode =
  | "MRN"
  | "VYG"
  | "TRK"
  | "SKR"
  | "ANC"
  | "SOC"
  | "CRO"
  | "DRF";

export type ArchetypeProfile = Record<Dimension, number>;

const archetypes: Record<ArchetypeCode, ArchetypeProfile> = {
  MRN: {
    bahari: 5,
    alam: 2,
    aktif: 1,
    santai: 4,
    foto: 3,
    sejarah: 1,
    sunyi: 2,
    ramai: 2,
    dekat: 4,
    sedang: 2,
    jauh: 0,
  },
  VYG: {
    bahari: 5,
    alam: 2,
    aktif: 3,
    santai: 1,
    foto: 2,
    sejarah: 0,
    sunyi: 2,
    ramai: 1,
    dekat: 0,
    sedang: 1,
    jauh: 5,
  },
  TRK: {
    bahari: 1,
    alam: 5,
    aktif: 5,
    santai: 1,
    foto: 3,
    sejarah: 0,
    sunyi: 2,
    ramai: 0,
    dekat: 1,
    sedang: 2,
    jauh: 3,
  },
  SKR: {
    bahari: 1,
    alam: 3,
    aktif: 2,
    santai: 2,
    foto: 3,
    sejarah: 5,
    sunyi: 4,
    ramai: 0,
    dekat: 2,
    sedang: 2,
    jauh: 1,
  },
  ANC: {
    bahari: 2,
    alam: 5,
    aktif: 2,
    santai: 3,
    foto: 2,
    sejarah: 1,
    sunyi: 5,
    ramai: 0,
    dekat: 0,
    sedang: 2,
    jauh: 3,
  },
  SOC: {
    bahari: 3,
    alam: 1,
    aktif: 2,
    santai: 3,
    foto: 3,
    sejarah: 1,
    sunyi: 0,
    ramai: 5,
    dekat: 4,
    sedang: 1,
    jauh: 0,
  },
  CRO: {
    bahari: 1,
    alam: 2,
    aktif: 2,
    santai: 3,
    foto: 5,
    sejarah: 4,
    sunyi: 2,
    ramai: 1,
    dekat: 3,
    sedang: 2,
    jauh: 0,
  },
  DRF: {
    bahari: 4,
    alam: 4,
    aktif: 3,
    santai: 2,
    foto: 2,
    sejarah: 0,
    sunyi: 3,
    ramai: 0,
    dekat: 0,
    sedang: 1,
    jauh: 4,
  },
};

const archetypeCodes = Object.keys(archetypes) as ArchetypeCode[];

export type DimensionTotals = Record<Dimension, number>;

export type ScoredLocation = {
  locationId: string;
  score: number;
  rank: number;
};

export type ResolvedArchetype = {
  code: ArchetypeCode;
  totals: DimensionTotals;
  traits: Dimension[];
};

function emptyTotals(): DimensionTotals {
  return {
    bahari: 0,
    alam: 0,
    aktif: 0,
    santai: 0,
    foto: 0,
    sejarah: 0,
    sunyi: 0,
    ramai: 0,
    dekat: 0,
    sedang: 0,
    jauh: 0,
  };
}

export function tallyScores(
  selections: Record<string, string>,
): DimensionTotals {
  const totals = emptyTotals();
  for (const question of quizQuestions) {
    const answerId = selections[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    for (const dim of dimensions) {
      totals[dim] += answer.scores[dim] ?? 0;
    }
  }
  return totals;
}

function cosineSimilarity(a: DimensionTotals, b: ArchetypeProfile): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const dim of dimensions) {
    dot += a[dim] * b[dim];
    magA += a[dim] * a[dim];
    magB += b[dim] * b[dim];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function matchArchetype(totals: DimensionTotals): ResolvedArchetype {
  let bestCode = archetypeCodes[0];
  let bestSim = -Infinity;
  for (const code of archetypeCodes) {
    const sim = cosineSimilarity(totals, archetypes[code]);
    if (sim > bestSim) {
      bestSim = sim;
      bestCode = code;
    }
  }

  const ranked = [...dimensions].sort((a, b) => totals[b] - totals[a]);
  const traits = ranked.slice(0, 3);

  return { code: bestCode, totals, traits };
}

export function rankLocations(
  totals: DimensionTotals,
  topN = 6,
): ScoredLocation[] {
  const scored = Object.entries(locationScores)
    .flatMap(([locationId, scores]) => {
      let score = 0;
      for (const dim of dimensions) {
        score += (scores[dim] ?? 0) * totals[dim];
      }
      return score > 0 ? [{ locationId, score }] : [];
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topN).map((s, i) => ({
    locationId: s.locationId,
    score: s.score,
    rank: i + 1,
  }));
}
