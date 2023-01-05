export type ruleType = { value: string; beats: string[] };
export type gameType = { name: string; rules: ruleType[] }[];

const games: gameType = [
  {
    name: "Classic",
    rules: [
      { value: "rock", beats: ["scissors"] },
      { value: "paper", beats: ["rock"] },
      { value: "scissors", beats: ["paper"] },
    ],
  },
  {
    name: "Big Bang Theory",
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
