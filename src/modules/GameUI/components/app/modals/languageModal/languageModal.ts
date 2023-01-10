import { langImages } from "../../../../../../constants/dictionary";
import buttonMap from "../../../common/buttonMap";

const languageModal = {
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

export default languageModal;
