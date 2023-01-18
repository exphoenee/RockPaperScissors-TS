import appStates from "../constants/appStates";
import getState from "./getState";

const getStatMode = () => getState(appStates.STATMODE);

export default getStatMode;
