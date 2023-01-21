import { buttonMapType } from "../../common/buttonMap";
import modalNames from "../../../constants/modalNames";
import flashlight from "../../app/flashlight/flashlight";
import { themas } from "../../../../../constants/themas";

const menuButtonsMap: buttonMapType[] = [
  {
    className: ["rules", "modal-button"],
    fileName: "rules.png",
    target: modalNames.RULES,
  },
  {
    className: ["statistics", "modal-button"],
    fileName: "statistics.png",
    target: modalNames.STAT,
  },
  {
    className: ["language", "modal-button"],
    fileName: "lang.png",
    target: modalNames.LANG,
  },
  {
    className: ["licensing", "modal-button"],
    fileName: "licensing.png",
    target: modalNames.LICENCE,
  },
  {
    className: ["thema"],
    id: "thema-button",
    imageClass: [
      `sun on ${themas.LIGHT}-img`,
      `moon off ${themas.DARK}-img`,
      `flashlight off ${themas.FLASHLIGHT}-img`,
    ],
    fileName: ["sunny.png", "moon.png", "flashlight.png"],
  },
  {
    className: ["gamemode"],
    id: "gamemode-button",
    imageClass: ["classic on", "bbt off"],
    fileName: ["classic.png", "bbt.png"],
  },
];

export default menuButtonsMap;
