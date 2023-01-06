export type ruleType = { value: string; beats: string[] };
export type gameType = { name: string; rules: ruleType[] }[];

export enum gameNames {
  CLASSIC = "Classic",
  BIG_BANG_THEORY = "Big Bang Theory",
}
