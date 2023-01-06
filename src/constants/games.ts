export type ruleType = { value: string; beats: string[] };
export type gameType = { name: string; rules: ruleType[] }[];

export enum gameNames {
  CLASSIC = "Classic",
  BIG_BANG_THEORY = "Big Bang Theory",
}

const games: gameType = [
  {
    name: gameNames.CLASSIC,
    rules: [
      { value: "rock", beats: ["scissors"] },
      { value: "paper", beats: ["rock"] },
      { value: "scissors", beats: ["paper"] },
    ],
  },
  {
    name: gameNames.BIG_BANG_THEORY,
    rules: [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "lizard", beats: ["paper", "spock"] },
      { value: "spock", beats: ["rock", "scissors"] },
    ],
  },
];

export default games;
