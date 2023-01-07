import buttonMap from "../common/buttonMap";

const settingButtonMap = {
  className: ["settings"],
  fileName: "media/settings.png",
};

const menuButtonsMap = [
  {
    className: ["rules"],
    fileName: "media/rules.png",
  },
  {
    className: ["statistics"],
    fileName: "media/statistics.png",
  },
  {
    className: ["language"],
    fileName: "media/language.png",
  },
  {
    className: ["licensing"],
    fileName: "media/language.png",
  },
  {
    className: ["thema"],
    imageClass: ["sun on", "moon off"],
    fileName: ["media/sunny.png", "media/moon.png"],
  },
];

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
