import rulesModal from "./rulesModal";
import languageModal from "./languageModal";

import modalNames from "../../../../../../constants/modalNames";

const modals = [
  {
    name: modalNames.RULES,
    title: "Rules",
    content: rulesModal,
  },
  {
    name: modalNames.RESULT,
    title: "Results",
    content: {
      tag: "p",
      text: "Results",
    },
  },
  {
    name: modalNames.LANG,
    title: "Language",
    content: languageModal(),
  },
  {
    name: modalNames.STAT,
    title: "statistics",
    content: {
      tag: "p",
      text: "statistics",
    },
  },
  {
    name: modalNames.LICENC,
    title: "licensing",
    content: {
      tag: "p",
      text: "licensing",
    },
  },
  {
    name: modalNames.GAMEMODE,
    title: "gamemode",
    content: {
      tag: "p",
      text: "gamemode",
    },
  },
];

export default modals;
