import buttonMap from "../../../common/buttonMap";
import games from "../../../../../../constants/games";

const gameModeModal = {
  tag: "div",
  attrs: {
    id: "gamemode-container",
  },
  children: games.map((game) =>
    buttonMap({
      className: ["gamemode-button", game.name],
      fileName: game.icon,
    })
  ),
};

export default gameModeModal;
