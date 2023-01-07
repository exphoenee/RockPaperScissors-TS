import buttonMap from "../../../common/buttonMap";

const gameButtons = [
  {
    className: ["prev"],
    fileName: "media/arrow.png",
  },
  {
    className: ["start"],
    fileName: "media/check.png",
  },
  {
    className: ["next"],
    fileName: "media/arrow.png",
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
