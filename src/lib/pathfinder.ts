export type Pace = "adventurous" | "relaxed";
export type Orientation = "curious" | "social";
export type Range = "near" | "far";

export type AxisTotals = {
  pace: Record<Pace, number>;
  orientation: Record<Orientation, number>;
  range: Record<Range, number>;
};

export type AnswerScores = {
  pace?: Partial<Record<Pace, number>>;
  orientation?: Partial<Record<Orientation, number>>;
  range?: Partial<Record<Range, number>>;
};

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
    id: "day-type",
    prompt: {
      en: "what kind of day calls to you?",
      id: "hari seperti apa yang memanggilmu?",
    },
    answers: [
      {
        id: "quiet-water",
        label: {
          en: "A quiet escape to the water",
          id: "Pelarian tenang ke air",
        },
        scores: { pace: { relaxed: 2 } },
      },
      {
        id: "active-islands",
        label: {
          en: "An active day on islands and reefs",
          id: "Hari aktif di pulau dan terumbu",
        },
        scores: { pace: { adventurous: 2 }, range: { far: 1 } },
      },
      {
        id: "old-streets",
        label: {
          en: "Wandering old streets and quays",
          id: "Menyusuri jalan dan dermaga tua",
        },
        scores: { orientation: { curious: 2 }, range: { near: 1 } },
      },
      {
        id: "bustling-market",
        label: {
          en: "A bustling market and waterfront",
          id: "Pasar yang ramai dan tepi pantai",
        },
        scores: { orientation: { social: 2 }, range: { near: 1 } },
      },
    ],
  },
  {
    id: "company",
    prompt: { en: "who's coming with you?", id: "siapa yang ikut?" },
    answers: [
      {
        id: "solo",
        label: { en: "Just me, solo", id: "Sendirian" },
        scores: { pace: { adventurous: 1 }, range: { far: 1 } },
      },
      {
        id: "partner",
        label: {
          en: "A partner, quiet together",
          id: "Seorang teman, tenang bersama",
        },
        scores: { pace: { relaxed: 2 } },
      },
      {
        id: "friends",
        label: {
          en: "Friends, lots of talking",
          id: "Teman-teman, banyak bicara",
        },
        scores: { orientation: { social: 2 } },
      },
      {
        id: "history-buff",
        label: {
          en: "Anyone curious about history",
          id: "Siapa pun yang ingin tahu sejarah",
        },
        scores: { orientation: { curious: 2 } },
      },
    ],
  },
  {
    id: "sound",
    prompt: { en: "pick a sound.", id: "pilih satu suara." },
    answers: [
      {
        id: "waves-reef",
        label: { en: "Waves over a reef", id: "Ombak di atas terumbu" },
        scores: { pace: { relaxed: 1 }, range: { far: 2 } },
      },
      {
        id: "fish-dawn",
        label: { en: "Fish sellers at dawn", id: "Pedagang ikan saat fajar" },
        scores: { orientation: { social: 2 }, range: { near: 1 } },
      },
      {
        id: "stone-quays",
        label: {
          en: "Footsteps on old stone quays",
          id: "Langkah di dermaga batu tua",
        },
        scores: { orientation: { curious: 2 }, range: { near: 1 } },
      },
      {
        id: "wind-trees",
        label: {
          en: "Wind through island trees",
          id: "Angin melalui pohon pulau",
        },
        scores: { pace: { relaxed: 1 }, range: { far: 2 } },
      },
    ],
  },
  {
    id: "distance",
    prompt: {
      en: "how far are you willing to go?",
      id: "seberapa jauh kamu mau pergi?",
    },
    answers: [
      {
        id: "in-town",
        label: { en: "Stay in town", id: "Tetap di kota" },
        scores: { range: { near: 2 }, orientation: { social: 1 } },
      },
      {
        id: "short-boat",
        label: {
          en: "A short boat ride is fine",
          id: "Perahu singkat tak masalah",
        },
        scores: { range: { far: 1 }, pace: { adventurous: 1 } },
      },
      {
        id: "further-better",
        label: {
          en: "The further the better",
          id: "Semakin jauh semakin baik",
        },
        scores: { range: { far: 2 }, pace: { adventurous: 1 } },
      },
      {
        id: "sit-still",
        label: {
          en: "Somewhere I can sit still",
          id: "Tempat aku bisa duduk diam",
        },
        scores: { pace: { relaxed: 2 }, range: { near: 1 } },
      },
    ],
  },
  {
    id: "take-home",
    prompt: {
      en: "what do you want to take home?",
      id: "apa yang ingin kamu bawa pulang?",
    },
    answers: [
      {
        id: "past-story",
        label: { en: "A story about the past", id: "Kisah tentang masa lalu" },
        scores: { orientation: { curious: 2 }, range: { near: 1 } },
      },
      {
        id: "salt-skin",
        label: { en: "Salt on my skin", id: "Garam di kulitku" },
        scores: { pace: { adventurous: 2 }, range: { far: 1 } },
      },
      {
        id: "harbor-photos",
        label: {
          en: "Photos of a busy harbor",
          id: "Foto pelabuhan yang ramai",
        },
        scores: { orientation: { social: 2 }, range: { near: 1 } },
      },
      {
        id: "quiet-memory",
        label: { en: "A quiet memory", id: "Kenangan yang tenang" },
        scores: { pace: { relaxed: 2 } },
      },
    ],
  },
];

export type ArchetypeCode =
  | "ACN"
  | "ACF"
  | "ASN"
  | "ASF"
  | "RCN"
  | "RCF"
  | "RSN"
  | "RSF";

export const archetypes: Record<
  ArchetypeCode,
  { pace: Pace; orientation: Orientation; range: Range }
> = {
  ACN: { pace: "adventurous", orientation: "curious", range: "near" },
  ACF: { pace: "adventurous", orientation: "curious", range: "far" },
  ASN: { pace: "adventurous", orientation: "social", range: "near" },
  ASF: { pace: "adventurous", orientation: "social", range: "far" },
  RCN: { pace: "relaxed", orientation: "curious", range: "near" },
  RCF: { pace: "relaxed", orientation: "curious", range: "far" },
  RSN: { pace: "relaxed", orientation: "social", range: "near" },
  RSF: { pace: "relaxed", orientation: "social", range: "far" },
};

export const archetypeCodes = Object.keys(archetypes) as ArchetypeCode[];

export type LocationScores = {
  range: Range;
  pace?: Partial<Record<Pace, number>>;
  orientation?: Partial<Record<Orientation, number>>;
};

export const locationAxisScores: Record<string, LocationScores> = {
  "sibolga-kota": { range: "near", orientation: { social: 2, curious: 1 } },
  "pulau-poncan": { range: "far", pace: { adventurous: 2, relaxed: 1 } },
  "pulau-kalimantung": { range: "far", pace: { adventurous: 2, relaxed: 2 } },
  "pelabuhan-lama": { range: "near", orientation: { curious: 2, social: 1 } },
};

export type ScoredLocation = {
  locationId: string;
  score: number;
};

export type ResolvedArchetype = {
  code: ArchetypeCode;
  totals: AxisTotals;
};

function emptyTotals(): AxisTotals {
  return {
    pace: { adventurous: 0, relaxed: 0 },
    orientation: { curious: 0, social: 0 },
    range: { near: 0, far: 0 },
  };
}

function majority<A extends string>(counts: Record<A, number>, order: A[]): A {
  let best = order[0];
  let bestScore = counts[order[0]];
  for (const key of order.slice(1)) {
    if (counts[key] > bestScore) {
      best = key;
      bestScore = counts[key];
    }
  }
  return best;
}

export function resolveArchetype(
  selections: Record<string, string>,
): ResolvedArchetype {
  const totals = emptyTotals();

  for (const question of quizQuestions) {
    const answerId = selections[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    for (const pace of ["adventurous", "relaxed"] as Pace[]) {
      totals.pace[pace] += answer.scores.pace?.[pace] ?? 0;
    }
    for (const o of ["curious", "social"] as Orientation[]) {
      totals.orientation[o] += answer.scores.orientation?.[o] ?? 0;
    }
    for (const r of ["near", "far"] as Range[]) {
      totals.range[r] += answer.scores.range?.[r] ?? 0;
    }
  }

  const pace = majority(totals.pace, ["adventurous", "relaxed"]);
  const orientation = majority(totals.orientation, ["curious", "social"]);
  const range = majority(totals.range, ["far", "near"]);

  const code = archetypeCodes.find(
    (c) =>
      archetypes[c].pace === pace &&
      archetypes[c].orientation === orientation &&
      archetypes[c].range === range,
  );
  if (!code) {
    throw new Error(
      `pathfinder: no archetype for pace=${pace} orientation=${orientation} range=${range}`,
    );
  }

  return { code, totals };
}

export function rankLocationsByRange(
  range: Range,
  totals: AxisTotals,
): ScoredLocation[] {
  const scored: ScoredLocation[] = Object.entries(locationAxisScores)
    .filter(([, scores]) => scores.range === range)
    .map(([locationId, scores]) => {
      let score = 0;
      for (const pace of ["adventurous", "relaxed"] as Pace[]) {
        score += (scores.pace?.[pace] ?? 0) * totals.pace[pace];
      }
      for (const o of ["curious", "social"] as Orientation[]) {
        score += (scores.orientation?.[o] ?? 0) * totals.orientation[o];
      }
      return { locationId, score };
    });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
