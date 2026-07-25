import mediaFolder from "../../../../../constants/mediaFolder";

const loaderImageMap = [
  {
    tag: "img",
    attrs: {
      id: "loader-image",
      src: `${mediaFolder}/loader.svg`,
      dataset: {
        filename: `${mediaFolder}/loader.svg`,
      },
      alt: "loader",
    },
  },
];

export default loaderImageMap;
