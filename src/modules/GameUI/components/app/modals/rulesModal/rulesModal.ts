import imageMap from "../../../common/imageMap";

const rulesModal = [
  {
    tag: "div",
    text: "...Loading...",
    attrs: {
      class: "rules-text",
    },
  },
  {
    tag: "div",
    attrs: {
      class: "rules-image",
    },
    children: imageMap({
      className: "rules",
      alt: "rules",
      fileName: "rulesdesc.png",
    }),
  },
];

export default rulesModal;
