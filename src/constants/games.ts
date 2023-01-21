import { gameNames } from "../constants/gameNames";
import gameType from "../types/gameType";

const games: gameType[] = [
  {
    name: gameNames.CLASSIC,
    icon: "rock-paper-scissors.png",
    rules: [
      { value: "rock", beats: ["scissors"], image: "rock.png", alt: "rock" },
      { value: "paper", beats: ["rock"], image: "paper.png", alt: "paper" },
      {
        value: "scissors",
        beats: ["paper"],
        image: "scissors.png",
        alt: "scissors",
      },
    ],
  },
  {
    name: gameNames.BIG_BANG_THEORY,
    icon: "complicated.png",
    rules: [
      {
        value: "rock",
        beats: ["scissors", "lizard"],
        image: "rock.png",
        alt: "rock",
      },
      {
        value: "paper",
        beats: ["rock", "spock"],
        image: "paper.png",
        alt: "paper",
      },
      {
        value: "scissors",
        beats: ["paper", "lizard"],
        image: "scissors.png",
        alt: "scissors",
      },
      {
        value: "lizard",
        beats: ["paper", "spock"],
        image: "lizard.png",
        alt: "lizard",
      },
      {
        value: "spock",
        beats: ["rock", "scissors"],
        image: "spock.png",
        alt: "Spock",
      },
    ],
  },
];

export default games;
