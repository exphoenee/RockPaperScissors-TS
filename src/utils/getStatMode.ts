import appStates from "../constants/appStates";
import getState from "./getState";

const getStateMode = () => getState(appStates.STATMODE);

export default getStateMode;
