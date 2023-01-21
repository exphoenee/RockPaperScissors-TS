import appStates from "../constants/appStates";
import setState from "./setState";
import { statCalcModes } from "../constants/statCalcModes";

const setStateCalcMode = (value: statCalcModes) =>
  setState(appStates.STATCALCMODE, value);

export default setStateCalcMode;
