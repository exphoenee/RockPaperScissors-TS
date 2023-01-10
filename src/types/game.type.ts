export type ruleType = {
  value: string;
  beats: string[];
  image: string;
  alt: string;
};
export type gameType = { name: string; rules: ruleType[]; icon: string }[];

export enum gameNames {
  CLASSIC = "Classic",
  BIG_BANG_THEORY = "Big Bang Theory",
}
