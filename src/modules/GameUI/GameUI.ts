import domelemjs from "domelemjs";
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

export type GameUIType = {
  user?: string;
  opponent?: string;
};

export default class GameUI {
  // public loaderScreen: Element;
  // public settings: Element;

  public user?: string;
  public opponent?: string;

  constructor(props?: GameUIType) {
    this.user = props?.user || "user";
    this.opponent = props?.opponent || "opponent";

    // this.loaderScreen = domelemjs(loaderScreenMap);
    // this.settings =
    domelemjs(settingsMap);
    domelemjs(appMap({ user: this.user, opponent: this.opponent }));
  }
}
