export type modalHeaderMapType = {
  name: string;
  title: string;
};

const modalHeaderMap = ({ name, title }: modalHeaderMapType) => {
  return {
    tag: "div",
    attrs: {
      class: "modal-header",
    },
    children: [
      {
        tag: "h2",
        text: title,
        attrs: {
          class: "modal-title",
        },
      },
      {
        tag: "button",
        attrs: {
          class: ["closeButton", name].join(" "),
        },
      },
    ],
  };
};

export default modalHeaderMap;
