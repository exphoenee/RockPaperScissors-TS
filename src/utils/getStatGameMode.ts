import appStates from "../constants/appStates";
import getState from "./getState";

const getStatGameMode = () => getState(appStates.STATCALCMODE);

export default getStatGameMode;
