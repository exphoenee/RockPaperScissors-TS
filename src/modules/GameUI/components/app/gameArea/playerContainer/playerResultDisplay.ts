const playerResultDisplay = (user: string) => {
  return {
    tag: "p",
    text: "0",
    attrs: {
      class: `${user}-wins`,
    },
  };
};

export default playerResultDisplay;
