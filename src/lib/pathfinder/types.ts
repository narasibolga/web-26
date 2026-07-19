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
