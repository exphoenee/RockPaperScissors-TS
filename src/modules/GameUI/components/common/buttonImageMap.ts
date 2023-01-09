import imageMap from "./imageMap";

const buttonImageMap = (
  fileName: string,
  className: string,
  imageClass: string
) => {
  return imageMap({
    fileName: fileName,
    className: imageClass,
    alt: `${className} button icon`,
  });
};

export default buttonImageMap;
