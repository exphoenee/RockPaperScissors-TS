import buttonMap from "../../../common/buttonMap";

const gameButtons = [
  {
    className: ["prev"],
    fileName: "arrow.png",
  },
  {
    className: ["start"],
    fileName: "check.png",
  },
  {
    className: ["next"],
    fileName: "arrow.png",
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
