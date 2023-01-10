import buttonMap from "../buttonMap";

export type modalHeaderMapType = {
  title: string;
};

const modalHeaderMap = ({ title }: modalHeaderMapType) => {
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
      buttonMap({ className: ["closeButton"], fileName: "close.png" }),
    ],
  };
};

export default modalHeaderMap;
