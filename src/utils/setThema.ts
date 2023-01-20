import appStates from "../constants/appStates";
import setState from "./setState";
import themas from "../modules/GameUI/constants/themas";

const setThema = (value: string) =>
  setState(appStates.THEMA, value || Object.values(themas)[0]);

export default setThema;
