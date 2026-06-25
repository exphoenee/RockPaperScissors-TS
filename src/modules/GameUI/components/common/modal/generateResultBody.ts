export type modalBodyMapType = {
  content: object | object[];
};

const modalBodyMap = ({ content }: modalBodyMapType) => {
  return {
    tag: "div",
    attrs: {
      class: "modal-body",
    },
    children: Array.isArray(content) ? content : [content],
  };
};

export default modalBodyMap;
