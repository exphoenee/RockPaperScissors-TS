import domelemjs from "domelemjs";
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

export default class GameUI {
  public loaderScreen: Element;
  public settings: Element;

  constructor() {
    this.loaderScreen = domelemjs(loaderScreenMap);
    this.settings = domelemjs(settingsMap);
    domelemjs(appMap);
  }
}
