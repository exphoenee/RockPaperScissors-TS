import appStates from "../constants/appStates";
import getState from "./getState";

const getLang = () => getState(appStates.LANG);

export default getLang;
