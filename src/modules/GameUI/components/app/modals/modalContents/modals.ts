import rulesModal from "./rulesModal";
import modalNames from "../../../../../../constants/modalNames";

const modals = [
  {
    name: modalNames.rules,
    title: "Rules",
    content: rulesModal,
  },
  {
    name: modalNames.result,
    title: "Results",
    content: {
      tag: "p",
      text: "Results",
    },
  },
  {
    name: modalNames.language,
    title: "language",
    content: {
      tag: "p",
      text: "language",
    },
  },
  {
    name: modalNames.statistics,
    title: "statistics",
    content: {
      tag: "p",
      text: "statistics",
    },
  },
  {
    name: modalNames.licensing,
    title: "licensing",
    content: {
      tag: "p",
      text: "licensing",
    },
  },
  {
    name: modalNames.gamemode,
    title: "gamemode",
    content: {
      tag: "p",
      text: "gamemode",
    },
  },
];

export default modals;
