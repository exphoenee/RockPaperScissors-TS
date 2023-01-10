import selectMap from "../../../common/selectMap";

import { statModes } from "../../../../../../types/statistics.type";
import { gameModes, gameNames } from "../../../../../../types/game.type";

const statisticsModal = [
  {
    tag: "div",
    attrs: {
      id: "table-container",
    },
    children: {
      p: "tag",
      text: "...loaging",
    },
  },
  {
    tag: "div",
    attrs: {
      class: "statistics-controls",
    },
    children: [
      ...selectMap({
        options: Object.values(statModes).map((mode) => {
          return { text: mode, value: mode };
        }),
        label: "Statistics mode",
        name: "statistics-mode",
      }),
      ...selectMap({
        options: Object.values(gameNames).map((mode) => {
          return { text: mode, value: mode };
        }),
        label: "Game mode",
        name: "game-mode",
      }),
    ],
  },
];

export default statisticsModal;
