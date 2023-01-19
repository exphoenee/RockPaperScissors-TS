import imageMap from "../../../common/imageMap";
import games from "../../../../../../constants/games";
import ruleType from "../../../../../../types/ruleType";
import getGameMode from "../../../../../../utils/getGameMode";

export const gameImages = (user: string, parent?: HTMLElement) => {
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
    return gameImages.map(({ alt, fileName }, i) => {
      return imageMap({
        className: [i > 0 ? "hidden" : "showen", user, "image"].join(" "),
        alt,
        fileName,
        dataset: { choice: alt },
        parent,
      });
    });
  }
};

const playerImageContainer = (user: string) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} image-container`,
      dataset: { user: user },
    },
    children: gameImages(user),
  };
};

export default playerImageContainer;
