import modalHeaderMap from "./modalHeaderMap";
import modalBodyMap from "./modalBodyMap";

export type modalMapType = {
  name: string;
  title: string;
  content: object | object[];
  dictionary?: string;
};

const modalMap = ({ name, title, content, dictionary }: modalMapType) => {
  return {
    tag: "div",
    attrs: {
      class: ["modal", name].join(" "),
    },
    children: [
      modalHeaderMap({ title, dictionary }),
      modalBodyMap({ content }),
    ],
  };
};

export default modalMap;
