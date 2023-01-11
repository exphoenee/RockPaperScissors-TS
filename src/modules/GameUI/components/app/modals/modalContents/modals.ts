import rulesModal from "../rulesModal/rulesModal";
import languageModal from "../languageModal/languageModal";
import gameModeModal from "../gameModeModal/gameModeModal";
import licensingModal from "../licensingModal/licensingModal";
import resultModal from "../resultModal/resultModal";
import statisticsModal from "../statisticsModal/statisticsModal";

import modalNames from "../../../../constants/modalNames";

export type modalType = {
  name: string;
  title: string;
  dictionary: string;
  content: any;
};

const modals: modalType[] = [
  {
    name: modalNames.RULES,
    title: "Rules",
    dictionary: "rulesTitle",
    content: rulesModal,
  },
  {
    name: modalNames.RESULT,
    title: "Results",
    dictionary: "resultTitle",
    content: resultModal,
  },
  {
    name: modalNames.LANG,
    title: "Language",
    dictionary: "languageTitle",
    content: languageModal,
  },
  {
    name: modalNames.STAT,
    title: "Statistics",
    dictionary: "statisticsTitle",
    content: statisticsModal,
  },
  {
    name: modalNames.LICENCE,
    title: "licensing",
    dictionary: "licensingTitle",
    content: licensingModal,
  },
  {
    name: modalNames.GAMEMODE,
    title: "Game mode",
    dictionary: "gameModeTitle",
    content: gameModeModal,
  },
];

export default modals;
