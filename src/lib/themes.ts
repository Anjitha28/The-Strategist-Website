export type Theme = "aurora" | "nebula" | "stratus";

export const THEMES = [
  { id: "aurora", name: "Aurora (Pastel)", mode: "light" },
  { id: "nebula", name: "Nebula (Infographic)", mode: "dark" },
  { id: "stratus", name: "Stratus (Vector)", mode: "light" },
] as const;
