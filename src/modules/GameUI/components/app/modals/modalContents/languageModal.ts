import { langImages } from "../../../../../../constants/dictionary";
import buttonMap from "../../../common/buttonMap";

const languageModal = () => {
  return {
    tag: "div",
    attrs: {
      class: "languages-container",
    },
    children: Object.values(langImages).map((fileName) =>
      buttonMap({ className: ["language-button"], fileName })
    ),
  };
};

export default languageModal;
