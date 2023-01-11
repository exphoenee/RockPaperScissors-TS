import buttonImageMap from "./buttonImageMap";

export type buttonMapType = {
  className: string[];
  fileName: string | string[];
  imageClass?: string | string[];
  handleEvent?: { event: string; cb: () => void } | undefined;
  target?: string;
  dataset?: { [key: string]: string };
};

const buttonMap = ({
  className,
  fileName,
  imageClass = "",
  handleEvent,
  target,
  dataset,
}: buttonMapType) => {
  return {
    tag: "button",
    attrs: {
      class: className && `button ${className.join(" ")}`,
      dataset: target ? { target } : dataset,
    },
    handleEvent,
    children: Array.isArray(fileName)
      ? fileName.map((fn, i) => buttonImageMap(fn, className[0], imageClass[i]))
      : buttonImageMap(fileName, className[0], imageClass as string),
  };
};

export default buttonMap;
