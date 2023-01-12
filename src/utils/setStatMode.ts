import appStates from "../constants/appStates";
import setState from "./setState";

const setStateMode = (value: string) => setState(appStates.STATMODE, value);

export default setStateMode;
