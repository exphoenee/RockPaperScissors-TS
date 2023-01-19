import imageMap from "../../../common/imageMap";
import ruleType from "../../../../../../types/ruleType";

export const gameImages = ({
  rules,
  user,
  parent,
}: {
  rules: ruleType[];
  user: string;
  parent?: HTMLElement;
}) => {
  const images = rules.map((game: ruleType) => {
    return {
      fileName: game?.image,
      alt: game?.alt,
    };
  });
  return images.map(({ alt, fileName }, i) => {
    return imageMap({
      className: [i > 0 ? "hidden" : "showen", user, "image"].join(" "),
      alt,
      fileName,
      dataset: { choice: alt },
      parent,
    });
  });
};

const playerImageContainer = ({
  user,
  rules,
}: {
  user: string;
  rules: ruleType[];
}) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} image-container`,
      dataset: { user: user },
    },
    children: gameImages({ user, rules }),
  };
};

export default playerImageContainer;
