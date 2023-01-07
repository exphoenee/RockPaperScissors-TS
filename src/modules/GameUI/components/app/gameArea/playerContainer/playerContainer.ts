import playerContainerTitle from "./playerContainerTitle";
import playerResultDisplay from "./playerResultDisplay";
import playerImageContainer from "./playerImageContainer";
import gameControls from "./gameControls";

type playerContainerType = {
  user: string;
};

const playerContainer = ({ user }: playerContainerType) => {
  return {
    tag: "div",
    attrs: {
      class: `images ${user}`,
    },
    children: [
      playerContainerTitle(user),
      playerResultDisplay(user),
      playerImageContainer(user),
      user === "user" && gameControls,
    ],
  };
};

export default playerContainer;
