import buttonMap from "../buttonMap";

export type modalHeaderMapType = {
  title: string;
  dictionary?: string;
};

const modalHeaderMap = ({ title, dictionary }: modalHeaderMapType) => {
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
          dataset: { dictionary },
        },
      },
      buttonMap({ className: ["closeButton"], fileName: "close.png" }),
    ],
  };
};

export default modalHeaderMap;
