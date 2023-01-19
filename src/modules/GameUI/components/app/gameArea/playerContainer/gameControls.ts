import buttonMap from "../../../common/buttonMap";
import { directions } from "../../../../../../constants/directions";

const gameButtons = [
  {
    className: [directions.PREV],
    fileName: "arrow.png",
    id: "prev-button",
  },
  {
    className: ["start"],
    fileName: "check.png",
    id: "start-button",
  },
  {
    className: [directions.NEXT],
    fileName: "arrow.png",
    id: "next-button",
  },
];

const gameControls = {
  tag: "div",
  attrs: {
    class: "controls",
  },
  children: gameButtons.map((btn) => buttonMap(btn)),
};

export default gameControls;
