import appStates from "../constants/appStates";
import getState from "./getState";

const getGameMode = () => getState(appStates.GAMEMODE);

export default getGameMode;
