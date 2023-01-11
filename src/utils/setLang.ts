import appStates from "../constants/appStates";
import setState from "./setState";

const setLang = (lang: string) => setState(appStates.LANG, lang);

export default setLang;
