import appStates from "../constants/appStates";
import setState from "./setState";
import themas from "../modules/GameUI/constants/themas";

const getThema = (value: string) => setState(appStates.THEMA, value);

export default getThema;
