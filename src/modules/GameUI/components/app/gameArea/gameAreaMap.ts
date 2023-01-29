import playerContainer from "./playerContainer/playerContainer";
import vsImageContainer from "./vsImageContainer/vsImageContainer";
import ruleType from "../../../../../types/ruleType";
import { userNames } from "../../../../../constants/userNames";

const gameAreaMap = ({ rules }: { rules: ruleType[] }) => {
  return {
    tag: "div",
    attrs: {
      class: "game-area",
    },
    children: [
      playerContainer({ user: userNames.USER, rules }),
      vsImageContainer,
      playerContainer({ user: userNames.OPPONENT, rules }),
    ],
  };
};

export default gameAreaMap;
