import appStates from "../constants/appStates";
import getState from "./getState";
import { gameNames } from "../types/gameType";
import setState from "./setState";

const getGameMode = () => {
  const defaultMode: gameNames =
    gameNames[Object.keys(gameNames)[0] as keyof typeof gameNames];
  const gameMode = getState(appStates.GAMEMODE);

  if (gameMode) {
    return gameMode;
  } else {
    setState(appStates.GAMEMODE, defaultMode);
    return defaultMode;
  }
};

export default getGameMode;
