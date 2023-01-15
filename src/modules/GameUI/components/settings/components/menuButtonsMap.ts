import { buttonMapType } from "../../common/buttonMap";
import modalNames from "../../../constants/modalNames";

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
    imageClass: ["sun on", "moon off"],
    fileName: ["sunny.png", "moon.png"],
  },
  {
    className: ["gamemode"],
    id: "gamemode-button",
    imageClass: ["classic on", "bbt off"],
    fileName: ["classic.png", "bbt.png"],
  },
];

export default menuButtonsMap;
