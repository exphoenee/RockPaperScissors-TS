const buttonImageMap = (
  fileName: string,
  className: string,
  imageClass: string
) => {
  return {
    tag: "img",
    attrs: {
      class: imageClass,
      src: "./media.loader.png",
      alt: `${className} button icon`,
      dataset: {
        fileName,
      },
    },
  };
};

export default buttonImageMap;
