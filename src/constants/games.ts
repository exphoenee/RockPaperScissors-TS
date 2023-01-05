type ruleTypes = { value: string; beats: string[] }[];
type gameTypes = { name: string; rules: ruleTypes }[];

const games: gameTypes = [
  {
    name: "Classic",
    rules: [
      { value: "rock", beats: ["scissors"] },
      { value: "paper", beats: ["rock"] },
      { value: "scissors", beats:[ "paper"] },
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