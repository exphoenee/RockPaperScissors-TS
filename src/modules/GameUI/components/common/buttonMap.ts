import buttonImageMap from "./buttonImageMap";

export type buttonMapType = {
  className: string[];
  fileName: string | string[];
  imageClass?: string | string[];
  handleEvent?: { event: ""; cb: () => void } | undefined;
};

const buttonMap = ({
  className,
  fileName,
  imageClass = "",
  handleEvent,
}: buttonMapType) => {
  return {
    tag: "button",
    attrs: {
      class: className && `button ${className.join(" ")}`,
    },
    handleEvent,
    children: Array.isArray(fileName)
      ? fileName.map((fn, i) => buttonImageMap(fn, className[0], imageClass[i]))
      : buttonImageMap(fileName, className[0], imageClass as string),
  };
};

export default buttonMap;
