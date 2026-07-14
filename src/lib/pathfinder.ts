import { locationScores } from "@/lib/locations";

export type Dimension =
  | "bahari"
  | "alam"
  | "aktif"
  | "santai"
  | "foto"
  | "sejarah"
  | "sunyi"
  | "ramai"
  | "dekat"
  | "sedang"
  | "jauh";

export const dimensions: Dimension[] = [
  "bahari",
  "alam",
  "aktif",
  "santai",
  "foto",
  "sejarah",
  "sunyi",
  "ramai",
  "dekat",
  "sedang",
  "jauh",
];

export type AnswerScores = Partial<Record<Dimension, number>>;

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
      en: "What kind of holiday vibe are you after?",
      id: "Vibes liburan yang kamu cari tuh kayak apa?",
    },
    answers: [
      {
        id: "sunyi-alami",
        label: {
          en: "Quiet & natural, far from crowds and healing time",
          id: "Sunyi & alami, jauh dari crowded dan healing time",
        },
        scores: { alam: 3, sunyi: 3, bahari: 1, aktif: 1 },
      },
      {
        id: "laut-pantai",
        label: {
          en: "Sea & beach, waves plus a refreshing breeze",
          id: "Laut & pantai, ombak ditambah angin yang refreshing",
        },
        scores: { bahari: 3, santai: 2, foto: 1 },
      },
      {
        id: "sejarah-budaya",
        label: {
          en: "History & culture, places with a story",
          id: "Sejarah & budaya, suka sama tempat yang punya story",
        },
        scores: { sejarah: 3, foto: 1, santai: 1 },
      },
      {
        id: "petualangan",
        label: {
          en: "Adventure & challenge, trekking and exploring",
          id: "Petualangan & tantangan, trekking terus explore-explore gitu",
        },
        scores: { aktif: 3, alam: 2, jauh: 1 },
      },
    ],
  },
  {
    id: "q2-jarak",
    prompt: {
      en: "How far are you willing to go from central Sibolga?",
      id: "Kamu willing to go sejauh apa dari pusat kota Sibolga?",
    },
    answers: [
      {
        id: "deket",
        label: {
          en: "Nearby, max 5 km and easy to reach",
          id: "Deket sini aja, max 5 km dan mudah dijangkau",
        },
        scores: { dekat: 3 },
      },
      {
        id: "not-that-far",
        label: {
          en: "Not that far, 10–30 minutes is fine",
          id: "Not that far, 10-30 menit okay lah",
        },
        scores: { dekat: 2, sedang: 1 },
      },
      {
        id: "lumayan-jauh",
        label: {
          en: "Quite far, 30 minutes–1 hour if it's worth it",
          id: "Lumayan jauh, 30 menit-1 jam gapapa as long as worth it",
        },
        scores: { sedang: 3, jauh: 1 },
      },
      {
        id: "jauh-kapal",
        label: {
          en: "Far and ready to board a boat! Over an hour by sea",
          id: "Jauh dan siap naik kapal! Siap sejam lebih plus jalur laut",
        },
        scores: { jauh: 3, bahari: 1, aktif: 1 },
      },
    ],
  },
  {
    id: "q3-aktivitas",
    prompt: {
      en: "What do you like doing on holiday?",
      id: "Pas liburan, kamu suka ngapain?",
    },
    answers: [
      {
        id: "foto-konten",
        label: {
          en: "Photos & making content, aesthetic spots",
          id: "Foto-foto & bikin konten, cari spot yang aesthetic",
        },
        scores: { foto: 3, santai: 1, dekat: 1 },
      },
      {
        id: "snorkeling",
        label: {
          en: "Swimming & snorkeling, explore the underwater world",
          id: "Berenang & snorkeling, explore underwater world",
        },
        scores: { bahari: 3, aktif: 2 },
      },
      {
        id: "trekking",
        label: {
          en: "Trekking & hiking, a day feels off without a climb",
          id: "Trekking & hiking, kalau ga mendaki kaya ada yang kurang",
        },
        scores: { aktif: 3, alam: 2, jauh: 1 },
      },
      {
        id: "santai-aja",
        label: {
          en: "Just chilling, sit back and enjoy the moment",
          id: "Santai aja, duduk-duduk dan enjoy the moment",
        },
        scores: { santai: 3, foto: 1 },
      },
    ],
  },
  {
    id: "q4-keramaian",
    prompt: {
      en: "Which crowd do you prefer?",
      id: "Tipe wisata favorit kamu yang mana?",
    },
    answers: [
      {
        id: "ramai-meriah",
        label: {
          en: "Bustling & lively, lots of people and full facilities",
          id: "Ramai & meriah, banyak orang dan fasilitas complete",
        },
        scores: { ramai: 3, dekat: 1, santai: 1 },
      },
      {
        id: "sepi-hidden-gem",
        label: {
          en: "Quiet & hidden gem, avoiding the crowds",
          id: "Sepi & hidden gem, menghindari crowded dan not feel genuine",
        },
        scores: { sunyi: 3, jauh: 2, alam: 1 },
      },
      {
        id: "seru-rame",
        label: {
          en: "Fun for a group, bring your circle along",
          id: "Seru buat rame-rame, biar bisa ajak circle",
        },
        scores: { ramai: 2, santai: 1, bahari: 1 },
      },
      {
        id: "solo-berdua",
        label: {
          en: "Solo trip or just the two of you, calm and intimate",
          id: "Solo trip atau berdua aja, calm, personal, and intimate",
        },
        scores: { sunyi: 2, foto: 1, santai: 1 },
      },
    ],
  },
  {
    id: "q5-prioritas",
    prompt: {
      en: "When picking a destination, what's your priority?",
      id: "Kalau pilih destinasi, priority kamu apa?",
    },
    answers: [
      {
        id: "gratis-murah",
        label: {
          en: "Free or cheap, save budget as long as it's fun",
          id: "Gratis atau murah, hemat budget yang penting dapet serunya",
        },
        scores: { dekat: 2, santai: 1, ramai: 1 },
      },
      {
        id: "air-terjun-sungai",
        label: {
          en: "A waterfall or river, refreshing vibes",
          id: "Ada air terjun/sungai, vibesnya refreshing",
        },
        scores: { alam: 3, aktif: 2, sunyi: 1 },
      },
      {
        id: "view-laut-pulau",
        label: {
          en: "Sea & island views, waves plus an aesthetic horizon",
          id: "View laut & pulau, ombak plus horizon yang aesthetic",
        },
        scores: { bahari: 3, foto: 2, santai: 1 },
      },
      {
        id: "nilai-sejarah",
        label: {
          en: "Historical & unique value, a place with meaning",
          id: "Nilai sejarah & unique, suka tempat yang ada meaning-nya",
        },
        scores: { sejarah: 3, foto: 2, dekat: 1 },
      },
    ],
  },
  {
    id: "q6-fisik",
    prompt: {
      en: "How ready is your body this time?",
      id: "Fisik kamu udah ready sejauh apa buat kali ini?",
    },
    answers: [
      {
        id: "santai-gamau-capek",
        label: {
          en: "Relaxed, don't want to get too tired",
          id: "Santai aja dan gamau capek-capek banget",
        },
        scores: { santai: 3, dekat: 2 },
      },
      {
        id: "jalan-kaki-ringan",
        label: {
          en: "Light walking is still fine",
          id: "Jalan kaki ringan masih fine kok",
        },
        scores: { santai: 1, foto: 1, dekat: 1 },
      },
      {
        id: "naik-turun-bukit",
        label: {
          en: "Ready to hike up and down the hills!",
          id: "Siap naik-turun bukit!",
        },
        scores: { aktif: 3, alam: 2 },
      },
      {
        id: "basah-basahan",
        label: {
          en: "Getting wet? Let's gooo!",
          id: "Basah-basahan? Let's gooo!",
        },
        scores: { bahari: 2, aktif: 2, alam: 1 },
      },
    ],
  },
  {
    id: "q7-timing",
    prompt: {
      en: "When do you usually holiday?",
      id: "Biasanya kamu liburan timing-nya kapan?",
    },
    answers: [
      {
        id: "pagi-siang",
        label: {
          en: "Morning–daytime, good light for photos",
          id: "Pagi-siang, cahayanya bagus buat foto-foto",
        },
        scores: { foto: 2, aktif: 1, alam: 1 },
      },
      {
        id: "sore-senja",
        label: {
          en: "Afternoon–dusk, chasing a stunning sunset",
          id: "Sore-senja, buat chasing sunset yang super cantik",
        },
        scores: { foto: 3, santai: 2, bahari: 1 },
      },
      {
        id: "full-weekend",
        label: {
          en: "Full weekend, ready all day or overnight",
          id: "Full weekend, siap seharian atau stay overnight sekalian",
        },
        scores: { jauh: 2, bahari: 2, aktif: 1 },
      },
      {
        id: "fleksibel",
        label: {
          en: "Flexible, anytime as long as I'm going out",
          id: "Fleksibel, kapan aja yang penting jalan",
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
          en: "Alone, solo trip and me time",
          id: "Sendirian, solo trip dan suka me time",
        },
        scores: { sunyi: 3, foto: 2, aktif: 1 },
      },
      {
        id: "berdua",
        label: {
          en: "A partner or bestie, intimate moments",
          id: "Berdua sama partner/bestie, momen yang intimate dan berkesan",
        },
        scores: { santai: 2, foto: 2, sunyi: 1 },
      },
      {
        id: "grup-kecil",
        label: {
          en: "A small group of 3–5, fun but still manageable",
          id: "Grup kecil 3-5 orang, seru tapi tetep kondusif sih",
        },
        scores: { aktif: 2, bahari: 1, sedang: 1 },
      },
      {
        id: "keluarga",
        label: {
          en: "Family! Family comes first",
          id: "Keluarga! Family comes first",
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
          en: "Blue sea & coral reefs, a stunning underwater world",
          id: "Laut biru & terumbu karang, underwater world yang stunning",
        },
        scores: { bahari: 4, aktif: 2 },
      },
      {
        id: "hutan-rindang",
        label: {
          en: "Forests & lush trees, cool and fresh air",
          id: "Hutan & pepohonan rindang, teduh dan udaranya fresh",
        },
        scores: { alam: 4, sunyi: 2, aktif: 1 },
      },
      {
        id: "bukit-panorama",
        label: {
          en: "Hills with a panorama from above, city and sea at once",
          id: "Bukit dengan panorama dari atas, liat kota dan laut sekaligus",
        },
        scores: { alam: 3, foto: 3, aktif: 2 },
      },
      {
        id: "air-terjun-aliran",
        label: {
          en: "Waterfalls & flowing water, the sound calms you",
          id: "Air terjun & aliran air, suaranya bikin calm",
        },
        scores: { alam: 3, aktif: 2, sunyi: 2 },
      },
    ],
  },
  {
    id: "q10-momen",
    prompt: {
      en: "What's the most memorable moment after a holiday for you?",
      id: "Momen paling memorable buat kamu abis liburan tuh apa?",
    },
    answers: [
      {
        id: "foto-video",
        label: {
          en: "Aesthetic photos & videos to share",
          id: "Foto & video aesthetic, biar keren kalau diupload dan dishare",
        },
        scores: { foto: 4, santai: 1 },
      },
      {
        id: "damai-lepas",
        label: {
          en: "A sense of peace & release, mind refreshed",
          id: "Rasa damai & lepas, pikiran jadi fresh lagi karena pusing kerjaan",
        },
        scores: { sunyi: 3, alam: 2, santai: 2 },
      },
      {
        id: "adrenalin-proud",
        label: {
          en: "Adrenaline & pride, conquered something",
          id: "Adrenalin & rasa proud, berhasil conquer something dan ngerasa dapet achievement",
        },
        scores: { aktif: 4, jauh: 2 },
      },
      {
        id: "bareng-orang-tersayang",
        label: {
          en: "Moments with loved ones, unforgettable memories",
          id: "Momen bareng orang-orang tersayang, kenangan yang ga gampang dilupain",
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

export const archetypes: Record<ArchetypeCode, ArchetypeProfile> = {
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

export const archetypeCodes = Object.keys(archetypes) as ArchetypeCode[];

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
    .map(([locationId, scores]) => {
      let score = 0;
      for (const dim of dimensions) {
        score += (scores[dim] ?? 0) * totals[dim];
      }
      return { locationId, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topN).map((s, i) => ({
    locationId: s.locationId,
    score: s.score,
    rank: i + 1,
  }));
}
