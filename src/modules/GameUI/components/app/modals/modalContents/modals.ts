import rulesModal from "../rulesModal/rulesModal";
import languageModal from "../languageModal/languageModal";
import gameModeModal from "../gameModeModal/gameModeModal";
import licensingModal from "../licensingModal/licensingModal";
import resultModal from "../resultModal/resultModal";
import statisticsModal from "../statisticsModal/statisticsModal";

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
    content: resultModal,
  },
  {
    name: modalNames.LANG,
    title: "Language",
    content: languageModal,
  },
  {
    name: modalNames.STAT,
    title: "Statistics",
    content: statisticsModal,
  },
  {
    name: modalNames.LICENC,
    title: "licensing",
    content: licensingModal,
  },
  {
    name: modalNames.GAMEMODE,
    title: "Game mode",
    content: gameModeModal,
  },
];

export default modals;
