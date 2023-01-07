export type modalBodyMapType = {
  content: object | object[];
};

const modalBodyMap = ({ content }: modalBodyMapType) => {
  return {
    tag: "div",
    attrs: {
      class: "modal-body",
    },
    children: content,
  };
};

export default modalBodyMap;
