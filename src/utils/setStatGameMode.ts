import appStates from "../constants/appStates";
import setState from "./setState";
import { gameNames } from "../constants/gameNames";

const setStateGameMode = (value: gameNames) =>
  setState(appStates.STATCALCMODE, value);

export default setStateGameMode;
