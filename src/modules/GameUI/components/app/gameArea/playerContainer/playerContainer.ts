import playerContainerTitle from "./playerContainerTitle";
import playerResultDisplay from "./playerResultDisplay";
import playerImageContainer from "./playerImageContainer";
import gameControls from "./gameControls";
import ruleType from "../../../../../../types/ruleType";

const playerContainer = ({
  user,
  rules,
}: {
  user: string;
  rules: ruleType;
}) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} container`,
    },
    children: [
      playerContainerTitle(user),
      playerResultDisplay(user),
      playerImageContainer({ user, rules }),
      user === "user" && gameControls,
    ],
  };
};

export default playerContainer;
