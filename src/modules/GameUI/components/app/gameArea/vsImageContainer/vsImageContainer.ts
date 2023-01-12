import imageMap from "../../../common/imageMap";

const vsImageContainer = {
  tag: "div",
  attrs: {
    class: "vs-image-container",
  },
  children: imageMap({
    fileName: "vs1.png",
    className: "vs",
    alt: "versus image",
  }),
};

export default vsImageContainer;
