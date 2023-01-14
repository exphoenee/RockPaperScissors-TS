import playerContainerTitle from "./playerContainerTitle";
import playerResultDisplay from "./playerResultDisplay";
import playerImageContainer from "./playerImageContainer";
import gameControls from "./gameControls";

const playerContainer = (user: string) => {
  return {
    tag: "div",
    attrs: {
      class: `${user} container`,
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
