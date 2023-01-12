import buttonMap from "../../../common/buttonMap";

const gameButtons = [
  {
    className: ["prev"],
    fileName: "arrow.png",
    id: "prev-button",
  },
  {
    className: ["start"],
    fileName: "check.png",
    id: "start-button",
  },
  {
    className: ["next"],
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
