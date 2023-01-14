import playerContainer from "./playerContainer/playerContainer";
import vsImageContainer from "./vsImageContainer/vsImageContainer";

const gameAreaMap = () => {
  return {
    tag: "div",
    attrs: {
      class: "game-area",
    },
    children: [
      playerContainer("user"),
      vsImageContainer,
      playerContainer("opponent"),
    ],
  };
};

export default gameAreaMap;
