import imageMap from "../../../common/imageMap";

const gameImages = [
  {
    fileName: "rock.png",
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
