import imageMap from "../../../common/imageMap";

const vsImageContainer = {
  tag: "div",
  attrs: {
    class: "vs-image-container",
  },
  children: imageMap({ fileName: "./media/vs1.png", alt: "versus image" }),
};

export default vsImageContainer;
