import appStates from "../constants/appStates";
import getState from "./getState";

const getStatCalcMode = () => getState(appStates.STATCALCMODE);

export default getStatCalcMode;
