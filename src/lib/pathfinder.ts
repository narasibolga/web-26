export type Mood = "adventurous" | "relaxed" | "curious" | "social";

export const moods: Mood[] = ["adventurous", "relaxed", "curious", "social"];

export type MoodScore = Partial<Record<Mood, number>>;

export const locationMoodScores: Record<string, MoodScore> = {
  "sibolga-kota": { social: 2, curious: 1 },
  "pulau-poncan": { adventurous: 2, relaxed: 1 },
  "pulau-kalimantung": { adventurous: 2, relaxed: 2 },
  "pelabuhan-lama": { curious: 2, social: 1 },
};

export type QuizAnswer = {
  id: string;
  label: { en: string; id: string };
  moods: MoodScore;
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
        moods: { relaxed: 2 },
      },
      {
        id: "active-islands",
        label: {
          en: "An active day on islands and reefs",
          id: "Hari aktif di pulau dan terumbu",
        },
        moods: { adventurous: 2 },
      },
      {
        id: "old-streets",
        label: {
          en: "Wandering old streets and quays",
          id: "Menyusuri jalan dan dermaga tua",
        },
        moods: { curious: 2 },
      },
      {
        id: "bustling-market",
        label: {
          en: "A bustling market and waterfront",
          id: "Pasar yang ramai dan tepi pantai",
        },
        moods: { social: 2 },
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
        moods: { adventurous: 1, relaxed: 1 },
      },
      {
        id: "partner",
        label: {
          en: "A partner, quiet together",
          id: "Seorang teman, tenang bersama",
        },
        moods: { relaxed: 2 },
      },
      {
        id: "friends",
        label: {
          en: "Friends, lots of talking",
          id: "Teman-teman, banyak bicara",
        },
        moods: { social: 2 },
      },
      {
        id: "history-buff",
        label: {
          en: "Anyone curious about history",
          id: "Siapa pun yang ingin tahu sejarah",
        },
        moods: { curious: 2 },
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
        moods: { relaxed: 1, adventurous: 1 },
      },
      {
        id: "fish-dawn",
        label: { en: "Fish sellers at dawn", id: "Pedagang ikan saat fajar" },
        moods: { social: 2 },
      },
      {
        id: "stone-quays",
        label: {
          en: "Footsteps on old stone quays",
          id: "Langkah di dermaga batu tua",
        },
        moods: { curious: 2 },
      },
      {
        id: "wind-trees",
        label: {
          en: "Wind through island trees",
          id: "Angin melalui pohon pulau",
        },
        moods: { relaxed: 2 },
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
        moods: { social: 1, curious: 1 },
      },
      {
        id: "short-boat",
        label: {
          en: "A short boat ride is fine",
          id: "Perahu singkat tak masalah",
        },
        moods: { adventurous: 2 },
      },
      {
        id: "further-better",
        label: {
          en: "The further the better",
          id: "Semakin jauh semakin baik",
        },
        moods: { adventurous: 2 },
      },
      {
        id: "sit-still",
        label: {
          en: "Somewhere I can sit still",
          id: "Tempat aku bisa duduk diam",
        },
        moods: { relaxed: 2 },
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
        moods: { curious: 2 },
      },
      {
        id: "salt-skin",
        label: { en: "Salt on my skin", id: "Garam di kulitku" },
        moods: { adventurous: 2 },
      },
      {
        id: "harbor-photos",
        label: {
          en: "Photos of a busy harbor",
          id: "Foto pelabuhan yang ramai",
        },
        moods: { social: 2 },
      },
      {
        id: "quiet-memory",
        label: { en: "A quiet memory", id: "Kenangan yang tenang" },
        moods: { relaxed: 2 },
      },
    ],
  },
];

export type ScoredLocation = {
  locationId: string;
  score: number;
};

export function scoreAnswers(
  selections: Record<string, string>,
): ScoredLocation[] {
  const moodTotals: Record<Mood, number> = {
    adventurous: 0,
    relaxed: 0,
    curious: 0,
    social: 0,
  };

  for (const question of quizQuestions) {
    const answerId = selections[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    for (const mood of moods) {
      moodTotals[mood] += answer.moods[mood] ?? 0;
    }
  }

  const scored: ScoredLocation[] = Object.entries(locationMoodScores).map(
    ([locationId, scores]) => {
      let score = 0;
      for (const mood of moods) {
        score += (scores[mood] ?? 0) * moodTotals[mood];
      }
      return { locationId, score };
    },
  );

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
