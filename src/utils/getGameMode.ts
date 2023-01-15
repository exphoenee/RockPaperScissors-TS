import appStates from "../constants/appStates";
import getState from "./getState";
import { gameNames } from "../types/gameType";
import setState from "./setState";

const getGameMode = () => {
  const defaultMode = Object.values(gameNames)[0];
  const gameMode = getState(appStates.GAMEMODE);
  if (gameMode) {
    return getState(appStates.GAMEMODE);
  } else {
    setState(appStates.GAMEMODE, defaultMode);
    return defaultMode;
  }
};

export default getGameMode;
