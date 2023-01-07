import modalHeaderMap from "./modalHeaderMap";
import modalBodyMap from "./modalBodyMap";

export type modalMapType = {
  name: string;
  title: string;
  content: object | object[];
};

const modalMap = ({ name, title, content }: modalMapType) => {
  return {
    tag: "div",
    attrs: {
      class: ["modal", name].join(" "),
    },
    children: [modalHeaderMap({ title, name }), modalBodyMap({ content })],
  };
};

export default modalMap;
