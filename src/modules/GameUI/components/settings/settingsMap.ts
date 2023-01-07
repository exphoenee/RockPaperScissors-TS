import buttonMap from "../common/buttonMap";

import settingButtonMap from "./components/settingButtonMap";
import menuButtonsMap from "./components/menuButtonsMap";

const settingMenuMap = {
  tag: "div",
  attrs: {
    id: "menu",
    class: "out",
  },
  children: menuButtonsMap.map((btn) => buttonMap(btn)),
};

const settingsMap = {
  tag: "div",
  attrs: {
    id: "settings",
    class: "out",
  },
  children: [buttonMap(settingButtonMap), settingMenuMap],
};

export default settingsMap;
