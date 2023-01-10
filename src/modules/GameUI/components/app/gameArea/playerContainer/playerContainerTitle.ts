const playerContainerTitle = (user: string) => {
  return {
    tag: "h2",
    text: user,
    attrs: {
      id: `${user}-name`,
      dataset: { dictionary: `${user}Name` },
    },
  };
};

export default playerContainerTitle;
