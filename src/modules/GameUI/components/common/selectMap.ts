type optionType = {
  value: string;
  text: string;
};

type selectMapType = {
  options: optionType[];
  label: string;
  name: string;
};

const selectMap = ({ options, label, name }: selectMapType) => [
  {
    tag: "div",
    children: [
      {
        tag: "label",
        attrs: {
          for: name,
        },
        text: label,
      },
      {
        tag: "select",
        attrs: {
          id: name,
        },
        children: options.map(({ value, text }) => {
          return {
            tag: "option",
            text: text,
            attrs: {
              value: value,
            },
          };
        }),
      },
    ],
  },
];

export default selectMap;
