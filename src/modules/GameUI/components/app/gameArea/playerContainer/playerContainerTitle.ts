const playerContainerTitle = (user: string) => {
  return {
    tag: "h2",
    text: user,
    attrs: {
      class: `${user}-name`,
    },
  };
};

export default playerContainerTitle;
