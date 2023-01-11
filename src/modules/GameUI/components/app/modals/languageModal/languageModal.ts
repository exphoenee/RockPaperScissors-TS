import { langImages } from "../../../../../../constants/dictionary";
import buttonMap from "../../../common/buttonMap";

const languageModal = {
  tag: "div",
  attrs: {
    class: "languages-container",
  },
  children: Object.entries(langImages).map((langData) => {
    const [lang, fileName] = langData;
    return buttonMap({
      className: ["language-button"],
      fileName,
      dataset: {
        lang,
      },
    });
  }),
};

export default languageModal;
