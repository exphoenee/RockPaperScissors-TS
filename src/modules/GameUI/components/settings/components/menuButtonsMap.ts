import { buttonMapType } from "../../common/buttonMap";

const menuButtonsMap: buttonMapType[] = [
  {
    className: ["rules", "modal-button"],
    fileName: "rules.png",
    target: "rules",
  },
  {
    className: ["statistics", "modal-button"],
    fileName: "statistics.png",
    target: "statistics",
  },
  {
    className: ["language", "modal-button"],
    fileName: "lang.png",
    target: "language",
  },
  {
    className: ["licensing", "modal-button"],
    fileName: "licensing.png",
    target: "licensing",
  },
  {
    className: ["thema"],
    imageClass: ["sun on", "moon off"],
    fileName: ["sunny.png", "moon.png"],
  },
];

export default menuButtonsMap;
