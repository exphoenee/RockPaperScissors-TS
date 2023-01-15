import imageMap from "../../../common/imageMap";
import games from "../../../../../../constants/games";
import ruleType from "../../../../../../types/ruleType";
import getGameMode from "../../../../../../utils/getGameMode";

export const gameImages = () => {
  const gameMode = getGameMode();

  const thisGame = games.find((game) => game.name === gameMode);

  if (!thisGame) {
    throw new Error("No game found");
  } else {
    const gameImages = thisGame?.rules?.map((game: ruleType) => {
      return {
        fileName: game?.image,
        alt: game?.alt,
      };
    });
    return gameImages;
  }
};

const playerImageContainer = (user: string) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} image-container`,
      dataset: { user: user },
    },
    children: gameImages().map(({ alt, fileName }, i) => {
      return imageMap({
        className: [i > 0 ? "hidden" : "showen", user, "image"].join(" "),
        alt,
        fileName,
        id: alt,
      });
    }),
  };
};

export default playerImageContainer;
