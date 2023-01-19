import playerContainer from "./playerContainer/playerContainer";
import vsImageContainer from "./vsImageContainer/vsImageContainer";
import ruleType from "../../../../../types/ruleType";
import { playerNames } from "../../../../../types/playerName";

const gameAreaMap = ({ rules }: { rules: ruleType[] }) => {
  return {
    tag: "div",
    attrs: {
      class: "game-area",
    },
    children: [
      playerContainer({ user: playerNames.USER, rules }),
      vsImageContainer,
      playerContainer({ user: playerNames.OPPONENT, rules }),
    ],
  };
};

export default gameAreaMap;
