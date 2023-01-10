const playerContainerTitle = (user: string) => {
  return {
    tag: "h2",
    text: user,
    attrs: {
      id: `${user}-name`,
    },
  };
};

export default playerContainerTitle;
