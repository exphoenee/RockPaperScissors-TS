import domelemjs from "domelemjs";

/* components */
import loaderScreenMap from "./components/loaderScreen/loaderScreenMap";
import settingsMap from "./components/settings/settingsMap";
import appMap from "./components/app/appMap";

/* types */
import elemType from "../../types/elem.type";

/* constants */
import appElements, { appElementType } from "../../constants/appElements";

export type GameUIType = {
  user?: string;
  opponent?: string;
};

export default class GameUI {
  // public loaderScreen: Element;
  // public settings: Element;

  public elem: elemType;
  public user?: string;
  public opponent?: string;

  constructor(props?: GameUIType) {
    this.user = props?.user || "user";
    this.opponent = props?.opponent || "opponent";
    this.elem = {} as elemType;

    this.creaeUI();
    this.getDomELements();
    window.onload = () => this.elem.single.loaderScreen.remove();
    console.log(this.elem);
  }

  private creaeUI = () => {
    domelemjs(loaderScreenMap);
    domelemjs(settingsMap);
    domelemjs(appMap({ user: this.user, opponent: this.opponent }));
  }

  private getDomELements() {
    this.elem = appElements.reduce((acc: elemType, el: appElementType) => {
      if (el.id) {
        const elem = document.getElementById(el.id);
        if (elem) {
          acc.single = { ...acc.single, [el.name]: elem };
          acc.single[el.name as keyof appElementType] = elem;
        } else {
          console.log(el)
          // throw new Error(`Element ${el.name} is missing!`)
        };
      } else if (el.class) {
        const elem = document.querySelector(el.class);
        if (elem) {
          acc.single = { ...acc.single, [el.name]: elem };
          acc.single[el.name as keyof appElementType] = elem;
        } else {
          console.log(el);
          // throw new Error(`Element ${el.name} is missing!`)
        };
      } else if (el.classes) {
        const elems = Array.from(document.querySelectorAll(el.classes));
        if (elems) {
          acc.multi = { ...acc.multi, [el.name]: elems };
          acc.multi[el.name as keyof appElementType] = elems;
        } else {
          console.log(el);
          // throw new Error(`Element ${el.name} is missing!`)
        };
      } else {
        console.error(el.name, "is missing!");
      }
      return acc;
    }, {} as elemType);
  }
}
