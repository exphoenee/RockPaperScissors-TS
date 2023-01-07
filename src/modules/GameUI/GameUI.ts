import domelemjs from "domelemjs";
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";

export default class GameUI {
  public loaderScreen: Element;
  public settings: Element;

  constructor() {
    this.loaderScreen = domelemjs(loaderScreenMap);
    this.settings = domelemjs(settingsMap);
  }
}
