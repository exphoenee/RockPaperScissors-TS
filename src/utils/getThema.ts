import appStates from "../constants/appStates";
import getState from "./getState";

const getThema = () => getState(appStates.THEMA);

export default getThema;
