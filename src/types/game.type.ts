import ruleType from "./rule.type";

type gameType = { name: string; rules: ruleType[]; icon: string };

export enum gameNames {
  CLASSIC = "Classic",
  BIG_BANG_THEORY = "Big Bang Theory",
}

export default gameType;
