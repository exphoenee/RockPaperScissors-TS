import playerContainer from "./playerContainer/playerContainer";
import vsImageContainer from "./vsImageContainer/vsImageContainer";

type gameAreaType = {
  user: string;
  opponent: string;
};

const gameAreaMap = ({ user, opponent }: gameAreaType) => {
  return {
    tag: "div",
    attrs: {
      class: "game-area",
    },
    children: [
      playerContainer({ user }),
      vsImageContainer,
      playerContainer({ user: opponent }),
    ],
  };
};

export default gameAreaMap;
