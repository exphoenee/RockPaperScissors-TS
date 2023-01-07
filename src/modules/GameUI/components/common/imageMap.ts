export type imageMapType = {
  className?: string;
  alt: string;
  fileName: string;
  id?: string;
};

const imageMap = ({ className, alt, id, fileName }: imageMapType) => {
  return {
    tag: "img",
    attrs: {
      class: [className, `loader-image`].join(" "),
      alt,
      id,
      src: "./media/loader.png",
      dataset: {
        filename: fileName,
      },
    },
  };
};

export default imageMap;
