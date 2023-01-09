import imageMap from "../../../common/imageMap";
import games from "../../../../constants/games";
import { gameNames, gameType } from "../../../../../../types/game.type";

const gameImages = [
  {
    fileName: games[gameNames.CLASSIC].rules[0].image,
    alt: "rock",
  },
  {
    fileName: "paper.png",
    alt: "paper",
  },
  {
    fileName: "scissors.png",
    alt: "scissors",
  },
  {
    fileName: "lizard.png",
    alt: "lizard",
  },
  {
    fileName: "spock.png",
    alt: "spock",
  },
];

const playerImageContainer = (user: string) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} image-container`,
    },
    children: gameImages.map(({ alt, fileName }, i) => {
      return imageMap({
        className: i > 0 ? "hidden" : "",
        alt,
        fileName,
        id: alt,
      });
    }),
  };
};

export default playerImageContainer;
