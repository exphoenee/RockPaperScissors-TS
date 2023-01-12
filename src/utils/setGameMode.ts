import appStates from "../constants/appStates";
import setState from "./setState";

const getGameMode = (value: string) => setState(appStates.GAMEMODE, value);

export default getGameMode;
