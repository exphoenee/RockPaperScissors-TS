type buttonMapProps = {
  className: string[];
  fileName: string | [];
  imageClass?: string;
};

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

const buttonMap = ({
  className,
  fileName,
  imageClass = "",
}: buttonMapProps) => {
  return {
    tag: "button",
    attrs: {
      class: className && `button ${className.join(" ")}`,
    },
    children: Array.isArray(fileName)
      ? fileName.map((fn, i) => buttonImageMap(fn, className[0], imageClass[i]))
      : buttonImageMap(fileName, className[0], imageClass),
  };
};

export default buttonMap;
