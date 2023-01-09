import imageMap from "../../../common/imageMap";
import modalNames from "../../../../../../constants/modalNames";

const rulesModal = [
  {
    tag: "h2",
    text: "Rules",
    attrs: {
      id: modalNames.RULES,
    },
  },
  imageMap({
    className: "rules",
    alt: "rules",
    fileName: "media/rulesdesc.png",
  }),
];

export default rulesModal;
