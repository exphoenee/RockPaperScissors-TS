const playerResultDisplay = (user: string) => {
  return {
    tag: "p",
    text: "0",
    attrs: {
      id: `${user}-wins`,
    },
  };
};

export default playerResultDisplay;
