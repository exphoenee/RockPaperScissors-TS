import appStates from "../constants/appStates";
import setState from "./setState";
import { gameNames } from "../types/gameType";

const setStateGameMode = (value: gameNames) =>
  setState(appStates.STATCALCMODE, value);

export default setStateGameMode;
