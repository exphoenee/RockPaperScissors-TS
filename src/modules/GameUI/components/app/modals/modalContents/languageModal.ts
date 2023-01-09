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
    children: Object.keys(langImages).map((lang) => {
      const [langName, fileName] = lang;
      buttonMap({
        className: ["language-button"],
        fileName,
        handleEvent: {
          event: "click",
          cb: () => {
            console.log(langName);
          },
        },
      });
    }),
  };
};

export default languageModal;
