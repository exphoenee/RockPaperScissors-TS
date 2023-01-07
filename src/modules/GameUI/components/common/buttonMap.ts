import buttonImageMap from "./buttonImageMap";

export type buttonMapType = {
  className: string[];
  fileName: string | [];
  imageClass?: string | [];
};

const buttonMap = ({ className, fileName, imageClass = "" }: buttonMapType) => {
  return {
    tag: "button",
    attrs: {
      class: className && `button ${className.join(" ")}`,
    },
    children: Array.isArray(fileName)
      ? fileName.map((fn, i) => buttonImageMap(fn, className[0], imageClass[i]))
      : buttonImageMap(fileName, className[0], imageClass as string),
  };
};

export default buttonMap;
