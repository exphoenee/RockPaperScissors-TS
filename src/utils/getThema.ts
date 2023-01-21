import appStates from "../constants/appStates";
import { themas } from "../constants/themas";
import getState from "./getState";
import checkStrIsInEnum from "./checkStrIsInEnum";

const getThema = () => {
  return checkStrIsInEnum(getState(appStates.THEMA), themas);
};

export default getThema;
