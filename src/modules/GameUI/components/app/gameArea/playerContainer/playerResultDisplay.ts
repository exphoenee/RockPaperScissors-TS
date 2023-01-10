import dictionary from "../../../../../../constants/dictionary";

const playerResultDisplay = (user: string) => {
  return {
    tag: "p",
    text: "0",
    attrs: {
      class: `${user}-wins`,
      dataset: { dictionary: `${user}Wins` },
    },
  };
};

export default playerResultDisplay;
