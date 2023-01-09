import { langImages } from "../../../../../../constants/dictionary";
import buttonMap from "../../../common/buttonMap";
import appStates from "../../../../../../constants/appStates";
import { usedLangs } from "../../../../../../constants/dictionary";

const languageModal = () => {
  return {
    tag: "div",
    attrs: {
      class: "languages-container",
    },
    children: Object.entries(langImages).map((lang) => {
      const [, fileName] = lang;
      return buttonMap({
        className: ["language-button"],
        fileName,
      });
    }),
  };
};

export default languageModal;
